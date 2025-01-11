import BackButton from '@/components/BackButton'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { claimFaucet } from '@/lib/api'
import { createFileRoute } from '@tanstack/react-router'
import axios from 'axios'
import { useState } from 'react'
import { toast } from 'sonner'
import { useAccount } from 'wagmi'

export const Route = createFileRoute('/_dashboard/faucet')({
  component: FaucetPage,
})

function FaucetPage() {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<{
    message: string
    hash: string
  }>()
  const [status, setStatus] = useState<'limit' | 'error' | 'success'>()
  const { isConnected, address } = useAccount()

  async function handleClaim(token: 'TRLCO' | 'ETH') {
    if (!address) {
      return toast.error('No wallet detected')
    }

    setLoading(true)
    toast.loading(`Transferring ${token} to your wallet`, { id: 'loading' })

    try {
      const data = await claimFaucet(address, token)
      if (data.hash) {
        setData(data)
        setStatus('success')
        toast.success('Successfully transferred to your wallet', {
          id: 'loading',
        })
      } else {
        setData(data)
        setStatus('limit')
        toast.info(data.message, {
          id: 'loading',
        })
      }
    } catch (error) {
      if (error instanceof Error) toast.error(error.message, { id: 'loading' })
    } finally {
      setLoading(false)
    }
  }

  async function onClickTest() {
    const response = await axios.get(
      'https://trlco-functions.vercel.app/api/faucet',
    )
    console.log(response)
  }

  return (
    <div className='max-w-sm space-y-6'>
      <BackButton />
      <Button onClick={onClickTest}>test</Button>
      {status === 'success' && data ? (
        <div className='p-5 space-y-2 text-sm border border-green-200 bg-green-50 rounded-xl'>
          <h6 className='font-medium text-green-600'>Claim Successful</h6>
          <a
            href={`${import.meta.env.VITE_EXPLORER_LINK}/tx/${data.hash}`}
            target='_blank'
            className='underline'
          >
            Check your transaction at explorer
          </a>
        </div>
      ) : null}
      {status === 'limit' && data ? (
        <div className='p-5 space-y-1 text-sm border border-yellow-200 bg-yellow-50 rounded-xl'>
          <h6 className='font-medium'>Limit Reached</h6>
          <p className='text-neutral-500'>{data.message}</p>
        </div>
      ) : null}
      <Card>
        <CardHeader>
          <CardTitle>Redeem your test token</CardTitle>
          <CardDescription>
            Due to limited supply. You can only redeem once every 24 hours.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='space-y-6'>
            <div className='flex flex-col gap-2'>
              <span className='font-medium text-gray-500'>Redeem TRLCO</span>
              <span className='text-xl'>2,000</span>
              {isConnected ? (
                <Button onClick={() => handleClaim('TRLCO')} disabled={loading}>
                  {loading ? 'Processing...' : 'Redeem TRLCO'}
                </Button>
              ) : (
                <Button disabled>Please connect wallet</Button>
              )}
            </div>
            <div className='flex flex-col gap-2'>
              <span className='font-medium text-gray-500'>Redeem Base ETH</span>
              <span className='text-xl'>0.0001</span>
              {isConnected ? (
                <Button onClick={() => handleClaim('ETH')} disabled={loading}>
                  {loading ? 'Processing...' : 'Redeem ETH'}
                </Button>
              ) : (
                <Button disabled>Please connect wallet</Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
