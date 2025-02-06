// import StakeCard from '@/components/StakeCard'
import { MembershipCard, OtherMembership } from '@/components/MembershipCard'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useStakingV2 } from '@/hooks/blockchain/stakingV2'
import { createFileRoute, Link } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

import { toast } from 'sonner'
import { formatEther } from 'viem'

export const Route = createFileRoute('/_dashboard/stake/')({
  component: StakePage,
})

function StakePage() {
  return (
    <div className='space-y-6'>
      <PageTitle />
      <Staking />
      <MembershipOverview />
    </div>
  )
}

function PageTitle() {
  return (
    <div className='flex justify-between items-center'>
      <div className='flex gap-3 items-center'>
        <img className='w-8 h-8' src='/trlco.svg' alt='TRLCO' />
        <div className='flex gap-2 items-center font-medium sm:text-xl text-nowrap'>
          <span>Membership Staking</span>
          <div className='py-0.5 px-2 rounded-lg text-white text-xs bg-destructive'>
            V2
          </div>
        </div>
      </div>
      <Link to='/stake/v1'>
        <Button>V1 Staking</Button>
      </Link>
    </div>
  )
}

function Staking() {
  return (
    <div className='grid gap-6 sm:grid-cols-3'>
      <StakingCard />
      <RewardCard />
      <SummaryCard />
    </div>
  )
}

function MembershipOverview() {
  const { walletStats } = useStakingV2()
  return (
    <Card>
      <CardHeader>
        <CardTitle>Membership Progress</CardTitle>
        <CardDescription>
          Unlock more benefits by upgrading your membership
        </CardDescription>
      </CardHeader>
      <CardContent>
        <OtherMembership
          membershipName={walletStats?.membership.name ?? 'None'}
        />
      </CardContent>
    </Card>
  )
}

function StakingCard() {
  const [amount, setAmount] = useState<string>('')
  const {
    balance,
    allowance,
    walletStats,
    approve,
    stake,
    withdrawStake,
    isConfirming,
    isPending,
    isSuccess,
    isError,
    isFailed,
    isLoading,
    refetch,
  } = useStakingV2()

  const isApproved = allowance ? allowance > 0n : false

  const TRLCOBalance = Intl.NumberFormat('en-US', {
    maximumFractionDigits: 8,
  }).format(Number(formatEther(balance ?? 0n)))

  const StakedAmount = Intl.NumberFormat('en-US', {
    maximumFractionDigits: 8,
  }).format(Number(formatEther(walletStats?.stakedAmount ?? 0n)))

  const handleMax = () => {
    setAmount(formatEther(balance ?? 0n))
  }

  const handleStake = async () => {
    if (!amount || isNaN(Number(amount))) {
      return toast.warning('Please enter a valid amount to stake.')
    }

    if (amount && +amount <= 0) {
      return toast.warning('Must stake more than 0 $TRLCO')
    }

    if (+amount > +formatEther(balance ?? 0n)) {
      return toast.warning(
        'Insufficient token, you are staking more than your balance. Please use the MAX amount',
      )
    }

    try {
      await stake(amount)
    } catch (error: any) {
      toast.error(error.message.split('\n')[0])
    }
  }

  const handleWithdraw = async () => {
    if (!amount || isNaN(Number(amount))) {
      return toast.warning('Please enter a valid amount to stake.')
    }

    if (amount && +amount <= 0) {
      return toast.warning('Must stake more than 0 $TRLCO')
    }

    if (+amount > +formatEther(walletStats?.stakedAmount ?? 0n)) {
      return toast.warning(
        'Insufficient token, you are staking more than your balance. Please use the MAX amount',
      )
    }

    try {
      await withdrawStake(amount)
    } catch (error: any) {
      toast.error(error.message.split('\n')[0])
    }
  }

  const handleApprove = async () => {
    try {
      await approve()
    } catch (error: any) {
      toast.error(error.message.split('\n')[0])
    }
  }

  useEffect(() => {
    if (isError || isFailed) {
      toast.dismiss('transaction')
    }

    if (isPending || isConfirming) {
      toast.loading('Processing your transaction...', {
        id: 'transaction',
        duration: Infinity,
      })
    }

    if (isFailed) {
      toast.error('Transaction Failed')
    }

    if (isSuccess) {
      toast.dismiss('transaction')
      toast.success('Transaction successful!')
      refetch()
      setAmount('')
    }
  }, [isConfirming, isPending, isSuccess, isError, isFailed, refetch])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Staking</CardTitle>
        <CardDescription>Stake TRLCO, Get TRLCO</CardDescription>
      </CardHeader>
      <CardContent className='space-y-6'>
        <div className='p-4 space-y-3 rounded-xl bg-secondary'>
          <div className='flex justify-between items-center text-sm font-medium text-gray-600'>
            <span>$TRLCO Balance:</span>
            <span>{TRLCOBalance}</span>
          </div>
          <div className='flex justify-between items-center text-sm font-medium text-destructive'>
            <span>Staked Amount:</span>
            <span>{StakedAmount}</span>
          </div>
        </div>
        <div className='flex items-center space-x-3 w-full max-w-sm'>
          <Input
            type='number'
            min={0}
            step={100}
            value={amount}
            placeholder='0'
            onChange={(e) => setAmount(e.target.value)}
          />
          <Button variant='outline' onClick={handleMax}>
            max
          </Button>
        </div>
      </CardContent>
      <CardFooter className='flex gap-3'>
        {isApproved ? (
          <>
            <Button
              variant='destructive'
              className='w-full'
              onClick={handleStake}
              disabled={isLoading || isPending}
            >
              Stake
            </Button>
            <Button
              className='w-full'
              onClick={handleWithdraw}
              disabled={isLoading || isPending}
            >
              Withdraw
            </Button>
          </>
        ) : (
          <Button
            variant='destructive'
            className='w-full'
            onClick={handleApprove}
            disabled={isLoading || isPending}
          >
            Approve
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}

function SummaryCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Membership</CardTitle>
        <CardDescription>Get higher membership and earn more</CardDescription>
      </CardHeader>
      <CardContent></CardContent>
    </Card>
  )
}

function RewardCard() {
  const {
    walletStats,
    pendingRewards,
    isLoading,
    isPending,
    claimRewards,
    isConfirming,
    isFailed,
    isSuccess,
    isError,
    refetch,
  } = useStakingV2()

  const handleClaim = async () => {
    try {
      await claimRewards()
    } catch (error: any) {
      toast.error(error.message.split('\n')[0])
    }
  }

  const rewards = {
    baseRate: '10%',
    membership: walletStats?.membership.name,
    multiplier: Number(walletStats?.membership.multiplier) / 100,
    monthlyReward: '',
    totalUnclaimed: Intl.NumberFormat('en-US', {
      maximumFractionDigits: 8,
    }).format(+formatEther(pendingRewards ?? 0n)),
  }

  useEffect(() => {
    if (isError || isFailed) {
      toast.dismiss('transaction')
    }

    if (isPending || isConfirming) {
      toast.loading('Processing your transaction...', {
        id: 'transaction',
        duration: Infinity,
      })
    }

    if (isFailed) {
      toast.error('Transaction Failed')
    }

    if (isSuccess) {
      toast.dismiss('transaction')
      toast.success('Transaction successful!')
      refetch()
    }
  }, [isConfirming, isPending, isSuccess, isError, isFailed, refetch])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Reward</CardTitle>
        <CardDescription>Rewards generated from staking</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='p-4 space-y-3 text-sm font-medium text-gray-600 rounded-xl bg-secondary'>
          <div className='flex justify-between items-center'>
            <span>Base APR:</span>
            <span>{rewards.baseRate}</span>
          </div>
          <div className='flex justify-between items-center'>
            <span>Membership:</span>
            <span>{rewards.membership}</span>
          </div>
          <div className='flex justify-between items-center'>
            <span>Multiplier:</span>
            <span>{rewards.multiplier}x</span>
          </div>
          <div className='flex justify-between items-center'>
            <span>Unclaimed:</span>
            <span>{rewards.totalUnclaimed}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          className='w-full'
          onClick={handleClaim}
          disabled={isLoading || isPending}
        >
          Claim
        </Button>
      </CardFooter>
    </Card>
  )
}
