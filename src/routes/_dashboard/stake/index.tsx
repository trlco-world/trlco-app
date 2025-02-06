// import StakeCard from '@/components/StakeCard'
import { OtherMembership } from '@/components/MembershipCard'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'
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
import { formatter } from '@/lib/utils'
import { createFileRoute, Link } from '@tanstack/react-router'
import { LoaderCircle } from 'lucide-react'
import { useEffect, useState } from 'react'

import { toast } from 'sonner'
import { formatEther } from 'viem'
import { useAccount, useBalance } from 'wagmi'

export const Route = createFileRoute('/_dashboard/stake/')({
  component: StakePage,
})

function StakePage() {
  return (
    <div className='space-y-6'>
      <PageTitle />
      <ContractStats />
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
    <div className='grid gap-6 sm:grid-cols-2'>
      <StakingCard />
    </div>
  )
}

function ContractStats() {
  const { stats, totalStaked, totalSupply } = useStakingV2()

  const data = {
    totalStakedWallet: Number(stats.uniqueStakers),
    totalStaked: formatter(totalStaked ?? 0n),
    totalRewardDistribuetd: formatter(stats.totalRewardDistributed ?? 0n),
    totalStakedPerc: (totalStaked && totalSupply
      ? (+formatEther(totalStaked) / +formatEther(totalSupply)) * 100
      : 0
    ).toFixed(8),
  }

  return (
    <div className='grid sm:grid-cols-4 *:bg-neutral-200 *:rounded-xl *:py-3 *:px-4 *:grid *:place-items-center *:text-sm gap-6'>
      <div>
        <span className='text-neutral-500'>Total Staked Wallet</span>
        <span className='text-base font-medium'>{data.totalStakedWallet}</span>
      </div>
      <div>
        <span className='text-neutral-500'>Total Staked</span>
        <span className='text-base font-medium'>{data.totalStaked}</span>
      </div>
      <div>
        <span className='text-neutral-500'>Total Reward Distributed</span>
        <span className='text-base font-medium'>
          {data.totalRewardDistribuetd}
        </span>
      </div>
      <div>
        <span className='text-neutral-500'>Total Staked %</span>
        <span className='text-base font-medium'>{data.totalStakedPerc}</span>
      </div>
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
  const [stakeAmount, setStakeAmount] = useState<string>('')
  const [withdrawAmount, setWithdrawAmount] = useState<string>('')
  const {
    ethBalance,
    balance,
    allowance,
    walletStats,
    pendingRewards,
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

  const trlcoBalance = Intl.NumberFormat('en-US', {
    maximumFractionDigits: 8,
  }).format(+formatEther(balance ?? 0n))

  const stakedAmount = Intl.NumberFormat('en-US', {
    maximumFractionDigits: 8,
  }).format(+formatEther(walletStats?.stakedAmount ?? 0n))

  const unclaimedReward = Intl.NumberFormat('en-US', {
    maximumFractionDigits: 8,
  }).format(+formatEther(pendingRewards ?? 0n))

  const etherBalance = Intl.NumberFormat('en-US', {
    maximumFractionDigits: 8,
  }).format(+formatEther(ethBalance ?? 0n))

  const handleMaxStake = () => {
    setStakeAmount(formatEther(balance ?? 0n))
  }

  const handleMaxWithdraw = () => {
    setWithdrawAmount(formatEther(walletStats?.stakedAmount ?? 0n))
  }

  const handleStake = async () => {
    if (!stakeAmount || isNaN(Number(stakeAmount))) {
      return toast.warning('Please enter a valid amount to stake.')
    }

    if (stakeAmount && +stakeAmount <= 0) {
      return toast.warning('Must stake more than 0 $TRLCO')
    }

    if (+stakeAmount > +formatEther(balance ?? 0n)) {
      return toast.warning(
        'Insufficient token, you are staking more than your balance. Please use the MAX amount',
      )
    }

    try {
      await stake(stakeAmount)
    } catch (error: any) {
      toast.error(error.message.split('\n')[0])
    }
  }

  const handleWithdraw = async () => {
    if (!withdrawAmount || isNaN(Number(withdrawAmount))) {
      return toast.warning('Please enter a valid amount to stake.')
    }

    if (withdrawAmount && +withdrawAmount <= 0) {
      return toast.warning('Must stake more than 0 $TRLCO')
    }

    if (+withdrawAmount > +formatEther(walletStats?.stakedAmount ?? 0n)) {
      return toast.warning('You are withdrawing more than your staked amount.')
    }

    try {
      await withdrawStake(withdrawAmount)
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
      setStakeAmount('')
    }
  }, [isConfirming, isPending, isSuccess, isError, isFailed])

  return (
    <Card className='relative overflow-clip shadow-none'>
      {isLoading ||
        isPending ||
        (isConfirming && (
          <div className='grid absolute inset-0 place-items-center backdrop-blur'>
            <div className='flex gap-2'>
              <LoaderCircle className='duration-500 animate-spin' />
              <span className='font-medium'>Loading</span>
            </div>
          </div>
        ))}
      <CardHeader>
        <CardTitle>Staking</CardTitle>
        <CardDescription>Stake TRLCO, Get TRLCO</CardDescription>
      </CardHeader>
      <CardContent className='space-y-6'>
        <div className='p-4 space-y-3 rounded-xl bg-secondary'>
          <div className='flex justify-between items-center text-sm font-medium text-gray-600'>
            <span>$ETH Balance:</span>
            <span>{etherBalance}</span>
          </div>
          <div className='flex justify-between items-center text-sm font-medium text-gray-600'>
            <span>$TRLCO Balance:</span>
            <span>{trlcoBalance}</span>
          </div>
          <div className='flex justify-between items-center text-sm font-medium text-destructive'>
            <span>Staked Amount:</span>
            <span>{stakedAmount}</span>
          </div>
        </div>
        {isApproved ? (
          <Accordion type='multiple'>
            <AccordionItem value='stake'>
              <AccordionTrigger>Stake</AccordionTrigger>
              <AccordionContent>
                <div className='py-2.5 px-0.5 space-y-3'>
                  <Badge>Balance: {trlcoBalance}</Badge>
                  <div className='flex items-center space-x-2'>
                    <Input
                      placeholder='0'
                      value={stakeAmount}
                      onChange={(e) => setStakeAmount(e.target.value)}
                    />
                    <Button variant='outline' onClick={handleMaxStake}>
                      max
                    </Button>
                    <Button
                      variant='destructive'
                      onClick={handleStake}
                      disabled={isLoading || isPending}
                    >
                      stake
                    </Button>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value='withdraw'>
              <AccordionTrigger>Withdraw</AccordionTrigger>
              <AccordionContent>
                <div className='py-2.5 px-0.5 space-y-3'>
                  <Badge>Staked: {stakedAmount}</Badge>
                  <div className='flex items-center space-x-2'>
                    <Input
                      placeholder='0'
                      value={withdrawAmount}
                      onChange={(e) => setWithdrawAmount(e.target.value)}
                      disabled={isLoading || isPending}
                    />
                    <Button
                      variant='outline'
                      onClick={handleMaxWithdraw}
                      disabled={isLoading || isPending}
                    >
                      max
                    </Button>
                    <Button
                      variant='destructive'
                      onClick={handleWithdraw}
                      disabled={isLoading || isPending}
                    >
                      Withdraw
                    </Button>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value='claim'>
              <AccordionTrigger>Claim</AccordionTrigger>
              <AccordionContent>
                <div className='py-2.5 px-0.5 space-y-3'>
                  <div className='flex justify-between items-center space-x-2'>
                    <Badge>Unclaimed Reward: {unclaimedReward}</Badge>
                    <Button variant='destructive' onClick={handleWithdraw}>
                      Claim
                    </Button>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ) : (
          <Button variant='destructive' onClick={handleApprove}>
            Approve Contract
          </Button>
        )}
      </CardContent>
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
