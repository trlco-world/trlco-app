import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useTRLContract } from '@/hooks/use-contract'
import { createFileRoute, Link } from '@tanstack/react-router'
import { formatEther } from 'viem'

export const Route = createFileRoute('/_dashboard/wallet')({
  component: WalletPage,
})

const tokenPrice = 0

function WalletPage() {
  const ct = useTRLContract()

  const balance = +formatEther(ct.balance ?? 0n)
  const balancePrice = balance * tokenPrice
  const stakes = +formatEther(ct.stakes.amount ?? 0n)
  const stakesPrice = stakes * tokenPrice
  const unclaimedReward = +formatEther(ct.reward ?? 0n)
  const unclaimedRewardPrice = unclaimedReward * tokenPrice

  return (
    <div className='space-y-6'>
      <h4 className='text-lg font-semibold sm:text-2xl'>My Wallet</h4>
      <Card className='shadow-none'>
        <CardHeader>
          <div className='flex flex-col justify-between gap-6 sm:items-center sm:flex-row'>
            <div className='flex items-center gap-3'>
              <img width={30} height={30} src='./trlco.svg' alt='TRLCO' />
              <div>
                <CardTitle>$TRLCO</CardTitle>
                <CardDescription>
                  The Real Lifestyle Utility Token
                </CardDescription>
              </div>
            </div>
            <div className='flex gap-3'>
              <Link to='/stake/$stakeId' params={{ stakeId: 'fixed-staking' }}>
                <Button>Stake</Button>
              </Link>
              <Link to='/swap'>
                <Button>Swap</Button>
              </Link>
              <Link to='.'>
                <Button disabled>Buy</Button>
              </Link>
            </div>
          </div>
        </CardHeader>
        <CardContent className='grid gap-6 sm:grid-cols-3'>
          <div className='flex flex-col p-4 rounded-lg bg-muted'>
            <span className='text-sm font-medium text-gray-500'>Balance</span>
            <span className='text-lg sm:text-xl'>
              {new Intl.NumberFormat().format(balance)}
            </span>
            <span className='text-sm text-gray-500'>
              ~ ${new Intl.NumberFormat().format(balancePrice)}
            </span>
          </div>
          <div className='flex flex-col p-4 rounded-lg bg-muted'>
            <span className='text-sm font-medium text-gray-500'>
              Total Staked
            </span>
            <span className='text-lg sm:text-xl'>
              {new Intl.NumberFormat().format(stakes)}
            </span>
            <span className='text-sm text-gray-500'>
              ~ ${new Intl.NumberFormat().format(stakesPrice)}
            </span>
          </div>
          <div className='flex flex-col p-4 rounded-lg bg-muted'>
            <span className='text-sm font-medium text-gray-500'>
              Total Unclaimed Reward
            </span>
            <span className='text-lg sm:text-xl'>
              {new Intl.NumberFormat().format(unclaimedReward)}
            </span>
            <span className='text-sm text-gray-500'>
              ~ ${new Intl.NumberFormat().format(unclaimedRewardPrice)}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
