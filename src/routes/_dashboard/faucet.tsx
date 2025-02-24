import BackButton from '@/components/BackButton'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { checkFaucet, claimFaucet } from '@/lib/api'
import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { toast } from 'sonner'
import { useAccount } from 'wagmi'

export const Route = createFileRoute('/_dashboard/faucet')({
  component: FaucetPage,
})

function FaucetPage() {
  const [loading, setLoading] = useState(false)
  const { isConnected, address } = useAccount()
  const {
    data: faucet,
    isLoading: faucetIsLoading,
    refetch: faucetRefetch,
  } = useQuery({
    queryKey: ['faucet'],
    queryFn: async () => await checkFaucet(address!),
    enabled: !!address,
  })

  async function handleClaim(token: 'TRLCO' | 'ETH') {
    if (!address) {
      return toast.error('No wallet detected')
    }

    setLoading(true)
    toast.loading(`Transferring ${token} to your wallet`, { id: 'loading' })

    try {
      const data = await claimFaucet(address, token)
      if (data.hash) {
        toast.success('Successfully transferred to your wallet', {
          id: 'loading',
        })
      } else {
        toast.info(data.message, {
          id: 'loading',
        })
      }
    } catch (error) {
      if (error instanceof Error) toast.error(error.message, { id: 'loading' })
    } finally {
      setLoading(false)
      faucetRefetch()
    }
  }

  if (faucetIsLoading) {
    return 'Loading...'
  }
  return (
    <div className='space-y-6 max-w-sm'>
      <BackButton />
      <Card>
        <CardHeader>
          <CardTitle>Redeem TRLCO</CardTitle>
          <CardDescription>Refresh everyday at UTC 00:00</CardDescription>
        </CardHeader>
        <CardContent className='flex flex-col'>
          <span className='text-2xl font-medium'>
            {faucet?.currentLimit ?? '0'}
          </span>
          <span className='text-sm text-blue-700'>
            Cooldown:{' '}
            {`${faucet?.claims.TRLCO.timeLeft?.hours ?? '0'} Hours 
            ${faucet?.claims.TRLCO.timeLeft?.minutes ?? '0'} Minute`}
          </span>
        </CardContent>
        <CardFooter className='grid'>
          {isConnected ? (
            <Button
              onClick={() => handleClaim('TRLCO')}
              disabled={loading || faucet?.claims.TRLCO.claimed}
            >
              Redeem TRLCO
            </Button>
          ) : (
            <Button disabled>Please connect wallet</Button>
          )}
          {/* <Button variant='link'>
            <a
              target='_blank'
              href={`${import.meta.env.VITE_EXPLORER_LINK}/tx/${faucet?.claims.TRLCO.hash}`}
            >
              Check last claimed transaction
            </a>
          </Button> */}
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Redeem Base ETH</CardTitle>
          <CardDescription>Refresh every Saturday at UTC 00:00</CardDescription>
        </CardHeader>
        <CardContent className='grid'>
          <span className='text-2xl font-medium'>0.0005</span>
          <span className='text-sm text-blue-700'>
            Cooldown:{' '}
            {`${faucet?.claims.ETH.timeLeft?.hours ?? '0'} Hours 
            ${faucet?.claims.ETH.timeLeft?.minutes ?? '0'} Minute`}
          </span>
        </CardContent>
        <CardFooter className='grid'>
          {isConnected ? (
            <Button
              onClick={() => handleClaim('ETH')}
              disabled={loading || faucet?.claims.ETH.claimed}
            >
              Redeem ETH
            </Button>
          ) : (
            <Button disabled>Please connect wallet</Button>
          )}
          {/* <Button variant='link'>
            <a
              target='_blank'
              href={`${import.meta.env.VITE_EXPLORER_LINK}/tx/${faucet?.claims.ETH.hash}`}
            >
              Check last claimed transaction
            </a>
          </Button> */}
        </CardFooter>
      </Card>
    </div>
  )
}
