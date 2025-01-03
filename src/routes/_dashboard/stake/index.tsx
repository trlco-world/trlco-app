// import StakeCard from '@/components/StakeCard'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { useTRLContract } from '@/hooks/use-contract'
import { createFileRoute, Link } from '@tanstack/react-router'
import { formatEther } from 'viem'

export const Route = createFileRoute('/_dashboard/stake/')({
  component: StakePage,
})

function StakePage() {
  return (
    <div className='space-y-6'>
      <h4 className='text-lg font-semibold sm:text-2xl'>Stake</h4>
      <div className='grid space-y-6'>
        {/* <StakeCard /> */}
        <Link to='/stake/membership'>
          <StakingCard />
        </Link>
      </div>
    </div>
  )
}

function StakingCard() {
  const bc = useTRLContract()

  const totalStaked = formatEther(bc.totalStaked ?? 0n)
  const apy = 'Up to 25%'
  const minStake = '100'
  const multiplier = '1.0x ~ 1.25x'
  const totalRewardDistributed = '11000,00'
  return (
    <Card className='shadow-none'>
      <CardHeader>
        <div className='flex flex-col gap-6 sm:gap-16 sm:items-center sm:flex-row'>
          <div className='flex items-center flex-1 gap-3'>
            <img className='w-8 h-8' src='./trlco.svg' alt='TRLCO' />
            <div>
              <CardTitle>$TRLCO</CardTitle>
              <CardDescription>Membership Staking</CardDescription>
            </div>
          </div>
          <div className='flex items-center justify-between sm:block'>
            <CardDescription>Total Staked</CardDescription>
            <CardTitle>{totalStaked}</CardTitle>
          </div>
          <div className='flex items-center justify-between sm:block'>
            <CardDescription>Total Reward Distributed</CardDescription>
            <CardTitle>{totalRewardDistributed}</CardTitle>
          </div>
          <div className='flex items-center justify-between sm:block'>
            <CardDescription>Minimum Stake</CardDescription>
            <CardTitle>{minStake}</CardTitle>
          </div>
          <div className='flex items-center justify-between sm:block'>
            <CardDescription>Multiplier</CardDescription>
            <CardTitle>{multiplier}</CardTitle>
          </div>
          <div className='flex items-center justify-between sm:block'>
            <CardDescription>APY</CardDescription>
            <CardTitle>{apy}</CardTitle>
          </div>
        </div>
      </CardHeader>
    </Card>
  )
}
