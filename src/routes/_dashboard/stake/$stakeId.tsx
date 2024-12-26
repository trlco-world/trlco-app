import Banner from '@/components/Banner'
import ClaimDrawer from '@/components/blockchain/ClaimDrawer'
import StakeDrawer from '@/components/blockchain/StakeDrawer'
import WithdrawDrawer from '@/components/blockchain/WithdrawDrawer'
import MembershipCard from '@/components/MembershipCard'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { useTRLContract } from '@/hooks/use-contract'
import { createFileRoute } from '@tanstack/react-router'
import { formatEther } from 'viem'

export const Route = createFileRoute('/_dashboard/stake/$stakeId')({
  component: StakeDetailsPage,
})

function StakeDetailsPage() {
  const { stakeId } = Route.useParams()
  const bc = useTRLContract()

  const stakedAmount = Number(formatEther(bc.stakes.amount ?? 0n))

  const rewardPerMonth = (
    +formatEther(bc.stakes.amount ?? 0n) *
    (Number(bc.baseRate) / 100 / 12)
  ).toFixed(8)

  return (
    <div className='space-y-6'>
      <Banner>
        <h2 className='font-semibold text-white sm:text-lg'>
          {stakeId.toUpperCase()}
        </h2>
        <p className='text-sm text-neutral-200'>
          Enjoy yield by staking ${stakeId} through a flexible or a locked pool.
        </p>
      </Banner>

      <div className='grid gap-6 sm:grid-cols-4'>
        <MembershipCard stakedAmount={stakedAmount} />
        <Card className='flex flex-col shadow-none rounded-3xl'>
          <CardHeader>
            <CardTitle>Staking</CardTitle>
            <CardDescription>Stake TRLCO, Get TRLCO</CardDescription>
          </CardHeader>
          <Separator className='mb-3' />
          <CardContent className='flex-1 space-y-2 text-sm font-medium'>
            <div className='flex items-center justify-between'>
              <span>Stake Limit</span>
              <span>{formatEther(bc.allowance ?? 0n)}</span>
            </div>
            <div className='flex items-center justify-between'>
              <span>Total Staked</span>
              <span>{formatEther(bc.stakes.amount ?? 0n)}</span>
            </div>
          </CardContent>
          <CardFooter className='grid grid-cols-2 gap-2'>
            <StakeDrawer>
              <Button>Stake</Button>
            </StakeDrawer>
            <WithdrawDrawer>
              <Button variant='destructive'>Withdraw</Button>
            </WithdrawDrawer>
          </CardFooter>
        </Card>
        <Card className='flex flex-col shadow-none rounded-3xl'>
          <CardHeader>
            <CardTitle>Rewards</CardTitle>
            <CardDescription>Rewards generated from staking</CardDescription>
          </CardHeader>
          <Separator className='mb-3' />
          <CardContent className='flex-1 space-y-2 text-sm font-medium'>
            <div className='flex items-center justify-between'>
              <span>Stake Base APY</span>
              <span>{bc.baseRate?.toString()}%</span>
            </div>
            <div className='flex items-center justify-between'>
              <span>Reward per month</span>
              <span>{rewardPerMonth}</span>
            </div>
            <div className='flex items-center justify-between'>
              <span>Membership multiplier</span>
              <span>0</span>
            </div>
            <div className='flex items-center justify-between'>
              <span>Total Rewards</span>
              <span>{Number(formatEther(bc.reward ?? 0n)).toFixed(8)}</span>
            </div>
          </CardContent>
          <CardFooter className='grid'>
            <ClaimDrawer>
              <Button>Claim</Button>
            </ClaimDrawer>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
