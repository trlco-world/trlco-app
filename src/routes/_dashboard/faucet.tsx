import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { createFileRoute } from '@tanstack/react-router'
import { useAccount } from 'wagmi'

export const Route = createFileRoute('/_dashboard/faucet')({
  component: FaucetPage,
})

function FaucetPage() {
  const { isConnected } = useAccount()
  return (
    <div>
      <Card className='max-w-sm'>
        <CardHeader>
          <CardTitle className='text-lg'>Redeem your test token</CardTitle>
          <CardDescription>
            Due to limited supply. You can only redeem once every 24 hours.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='space-y-6'>
            <div className='flex flex-col gap-2'>
              <span className='font-medium text-gray-500'>Redeem TRLCO</span>
              <span className='text-xl'>100,000</span>
              {isConnected ? (
                <Button>Redeem TRLCO</Button>
              ) : (
                <Button disabled>Please connect wallet</Button>
              )}
            </div>
            <div className='flex flex-col gap-2'>
              <span className='font-medium text-gray-500'>Redeem Base ETH</span>
              <span className='text-xl'>0.0001</span>
              {isConnected ? (
                <Button>Redeem Base ETH</Button>
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
