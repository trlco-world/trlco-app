// import StakeCard from '@/components/StakeCard'
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

export const Route = createFileRoute('/_dashboard/stake/')({
  component: StakePage,
})

function StakePage() {
  return (
    <div className='space-y-6'>
      <div className='flex items-center flex-1 gap-3'>
        <img className='w-10 h-10' src='./trlco.svg' alt='TRLCO' />
        <div className='flex flex-col'>
          <span className='text-lg font-semibold sm:text-xl'>$TRLCO</span>
          <span className='text-sm font-medium uppercase text-neutral-500'>
            Membership Staking
          </span>
        </div>
      </div>
      <StakingDataCard />
      <div className='grid gap-6 sm:grid-cols-2 md:grid-cols-3'>
        <MembershipCard />
        <StakeCard />
        <RewardCard />
      </div>
    </div>
  )
}

function StakingDataCard() {
  const bc = useTRLContract()

  const totalStaked = formatEther(bc.totalStaked ?? 0n)
  const apy = 'Up to 25%'
  const minStake = '100'
  const multiplier = '1.0x ~ 1.25x'
  const totalRewardDistributed = '11000,00'
  return (
    <div className='p-6 bg-white border rounded-xl'>
      <div className='flex flex-col justify-around gap-6 sm:gap-16 sm:items-center sm:flex-row'>
        <div className='flex items-center justify-between sm:flex-col'>
          <span className='text-sm font-medium text-neutral-500'>
            Total Staked
          </span>
          <span className='font-medium'>{totalStaked}</span>
        </div>
        <div className='flex items-center justify-between sm:flex-col'>
          <span className='text-sm font-medium text-neutral-500'>
            Total Reward Distributed
          </span>
          <span className='font-medium'>{totalRewardDistributed}</span>
        </div>
        <div className='flex items-center justify-between sm:flex-col'>
          <span className='text-sm font-medium text-neutral-500'>
            Minimum Stake
          </span>
          <span className='font-medium'>{minStake}</span>
        </div>
        <div className='flex items-center justify-between sm:flex-col'>
          <span className='text-sm font-medium text-neutral-500'>
            Multiplier
          </span>
          <span className='font-medium'>{multiplier}</span>
        </div>
        <div className='flex items-center justify-between sm:flex-col'>
          <span className='text-sm font-medium text-neutral-500'>APY</span>
          <span className='font-medium'>{apy}</span>
        </div>
      </div>
    </div>
  )
}

function StakeCard() {
  const bc = useTRLContract()
  return (
    <Card className='flex flex-col shadow-none'>
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
  )
}

function RewardCard() {
  const bc = useTRLContract()

  const multiplier = Number(bc.membership.multiplier) / 100

  const rewardPerMonth = (
    +formatEther(bc.stakes.amount ?? 0n) *
    (Number(bc.baseRate) / 100 / 12)
  ).toFixed(8)

  return (
    <Card className='flex flex-col shadow-none'>
      <CardHeader>
        <CardTitle>Rewards</CardTitle>
        <CardDescription>Rewards generated from staking</CardDescription>
      </CardHeader>
      <Separator className='mb-3' />
      <CardContent className='flex-1 space-y-2 text-sm font-medium'>
        <div className='flex items-center justify-between'>
          <span>Base APY</span>
          <span>{bc.baseRate?.toString()}%</span>
        </div>
        <div className='flex items-center justify-between'>
          <span>Yield / Month</span>
          <span>{rewardPerMonth}</span>
        </div>
        <div className='flex items-center justify-between'>
          <span>Membership</span>
          <span>{bc.membership.name}</span>
        </div>
        <div className='flex items-center justify-between'>
          <span>Multiplier</span>
          <span>{multiplier}</span>
        </div>
        <div className='flex items-center justify-between'>
          <span>Total Unclaimed</span>
          <span>{Number(formatEther(bc.reward ?? 0n)).toFixed(8)}</span>
        </div>
      </CardContent>
      <CardFooter className='grid'>
        <ClaimDrawer>
          <Button>Claim</Button>
        </ClaimDrawer>
      </CardFooter>
    </Card>
  )
}
