// import StakeCard from '@/components/StakeCard'
import ClaimDrawer from '@/components/blockchain/ClaimDrawer'
import StakeDrawer from '@/components/blockchain/StakeDrawer'
import WithdrawDrawer from '@/components/blockchain/WithdrawDrawer'
import {
  Membership,
  MembershipCard,
  membershipDetails,
  OtherMembership,
} from '@/components/MembershipCard'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
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
import { formatEther } from 'viem'

export default function StakePage() {
  const bc = useTRLContract()
  return (
    <div className='space-y-6'>
      <StakingDataCard />

      <ClaimReward />
      <div className='grid gap-6 sm:grid-cols-2 md:grid-cols-3'>
        <MembershipCard />
        <StakeCard />
        <RewardCard />
      </div>
      <div className='col-span-3 p-6 space-y-6 bg-white rounded-xl border'>
        <h5 className='font-medium text-neutral-900'>Membership Progress</h5>
        <span className='text-sm text-neutral-500'>
          Unlock more benefits by upgrading your membership
        </span>
        <OtherMembership membershipName={bc.membership.name ?? 'None'} />
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
    <div className='flex flex-col items-center py-2 w-full overflow-clip rounded-xl border sm:py-4 border-neutral-200 bg-neutral-200'>
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
        <div className='flex justify-between items-center'>
          <span>Wallet balance</span>
          <span>{Number(formatEther(bc.balance ?? 0n)).toFixed(8)}</span>
        </div>
        <div className='flex justify-between items-center'>
          <span>Total staked</span>
          <span>{formatEther(bc.stakes.amount ?? 0n)}</span>
        </div>
        <div className='flex justify-between items-center'>
          <span>Minimum stake</span>
          <span>100</span>
        </div>
        <div className='flex justify-between items-center'>
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
        <div className='flex justify-between items-center'>
          <span>Base APR</span>
          <span>{bc.baseRate?.toString()}%</span>
        </div>
        <div className='flex justify-between items-center'>
          <span>Membership</span>
          <span>{bc.membership.name}</span>
        </div>
        <div className='flex justify-between items-center'>
          <span>Multiplier</span>
          <span>{multiplier}x</span>
        </div>
        <div className='flex justify-between items-center'>
          <span>Monthly reward</span>
          <span>{rewardPerMonth}</span>
        </div>
        <div className='flex justify-between items-center'>
          <span>Multiplier bonus</span>
          <span>{multiplierBonus.toFixed(8)}</span>
        </div>
        <div className='flex justify-between items-center'>
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

function ClaimReward() {
  return (
    <Alert variant='destructive' className='bg-white'>
      <AlertTitle>Caution</AlertTitle>
      <AlertDescription className='text-gray-600'>
        Please claim your rewards before staking or re-staking your TRLCO to
        avoid any loss of earned rewards.
      </AlertDescription>
    </Alert>
  )
}
