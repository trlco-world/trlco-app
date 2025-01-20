// import StakeCard from '@/components/StakeCard'
import ClaimDrawer from '@/components/blockchain/ClaimDrawer'
import StakeDrawer from '@/components/blockchain/StakeDrawer'
import WithdrawDrawer from '@/components/blockchain/WithdrawDrawer'
import {
  MembershipCard,
  Membership,
  membershipDetails,
  OtherMembership,
} from '@/components/MembershipCard'
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
      <div className='col-span-3 p-6 space-y-6 bg-white border rounded-xl'>
        <h5 className='font-medium text-neutral-900'>Membership Progress</h5>
        <span className='text-sm text-neutral-500'>
          Unlock more benefits by upgrading your membership
        </span>
        <OtherMembership />
      </div>
    </div>
  )
}

function StakingDataCard() {
  const bc = useTRLContract()

  const totalStaked = formatEther(bc.totalStaked ?? 0n)

  const totalRewardDistributed = new Intl.NumberFormat().format(12763.8126)
  const totalSupplyStaked =
    bc.totalStaked && bc.totalSupply
      ? (+formatEther(bc.totalStaked) / +formatEther(bc.totalSupply)) * 100
      : 0

  return (
    <div className='grid gap-6 sm:grid-cols-2 md:grid-cols-4'>
      <StatsCard
        title='Total Staked'
        value={new Intl.NumberFormat().format(+totalStaked)}
      />
      <StatsCard
        title='Total Reward Distributed'
        value={totalRewardDistributed}
      />
      <StatsCard
        title='Total Staked %'
        value={`${Number(totalSupplyStaked).toFixed(8)} %`}
      />

      <StatsCard title='Total Value Locked (TVL)' value={`N/A`} />
    </div>
  )
}

function StatsCard(props: { title: string; value: string }) {
  return (
    <div className='flex flex-col items-center w-full py-2 border sm:py-4 border-neutral-200 bg-neutral-200 rounded-xl overflow-clip'>
      <span className='text-sm font-light text-black'>{props.title}</span>
      <span className='text-lg font-medium text-black'>{props.value}</span>
    </div>
  )
}

function StakeCard() {
  const bc = useTRLContract()
  const nextTier = membershipDetails[bc.membership.name as Membership]
  const nextTierRemaining = nextTier
    ? nextTier.max + 1 - +formatEther(bc.stakes.amount ?? 0n)
    : 0

  return (
    <Card className='flex flex-col shadow-none'>
      <CardHeader>
        <CardTitle>Staking</CardTitle>
        <CardDescription>Stake TRLCO, Get TRLCO</CardDescription>
      </CardHeader>
      <Separator className='mb-3' />
      <CardContent className='flex-1 space-y-2 text-sm font-medium'>
        <div className='flex items-center justify-between'>
          <span>Stake limit</span>
          <span>{formatEther(bc.allowance ?? 0n)}</span>
        </div>
        <div className='flex items-center justify-between'>
          <span>Total staked</span>
          <span>{formatEther(bc.stakes.amount ?? 0n)}</span>
        </div>
        <div className='flex items-center justify-between'>
          <span>Minimum stake</span>
          <span>100</span>
        </div>
        <div className='flex items-center justify-between'>
          <span>Stake to next tier</span>
          <span>{nextTierRemaining}</span>
        </div>
      </CardContent>
      <CardFooter className='grid grid-cols-2 gap-2'>
        <StakeDrawer>
          <Button variant={'destructive'}>Stake</Button>
        </StakeDrawer>
        <WithdrawDrawer>
          <Button>Withdraw</Button>
        </WithdrawDrawer>
      </CardFooter>
    </Card>
  )
}

function RewardCard() {
  const bc = useTRLContract()
  const membership = membershipDetails[bc.membership.name as Membership]
  const multiplier = Number(bc.membership.multiplier) / 100
  const multiplierBonus =
    Number(formatEther(bc.reward ?? 0n)) * (membership?.multiplier - 1)

  const rewardPerMonth = (
    +formatEther(bc.stakes.amount ?? 0n) *
    (Number(bc.baseRate) / 100 / 12) *
    membership?.multiplier
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
          <span>Base APR</span>
          <span>{bc.baseRate?.toString()}%</span>
        </div>
        <div className='flex items-center justify-between'>
          <span>Membership</span>
          <span>{bc.membership.name}</span>
        </div>
        <div className='flex items-center justify-between'>
          <span>Multiplier</span>
          <span>{multiplier}x</span>
        </div>
        <div className='flex items-center justify-between'>
          <span>Monthly reward</span>
          <span>{rewardPerMonth}</span>
        </div>
        <div className='flex items-center justify-between'>
          <span>Multiplier bonus</span>
          <span>{multiplierBonus.toFixed(8)}</span>
        </div>
        <div className='flex items-center justify-between'>
          <span>Total unclaimed</span>
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
