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
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { useStakingV2 } from '@/hooks/blockchain/stakingV2'
import { useTRLContract } from '@/hooks/use-contract'
import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
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
    <div className='flex flex-1 gap-3 items-center'>
      <img className='w-8 h-8' src='/trlco.svg' alt='TRLCO' />
      <span className='font-medium sm:text-xl'>Membership Staking V2</span>
    </div>
  )
}

function Staking() {
  return (
    <div className='grid grid-cols-3 gap-6'>
      <StakingCard />
    </div>
  )
}

function MembershipOverview() {
  return (
    <div className='col-span-3 p-6 space-y-6 bg-white rounded-xl border'>
      <h5 className='font-medium text-neutral-900'>Membership Progress</h5>
      <span className='text-sm text-neutral-500'>
        Unlock more benefits by upgrading your membership
      </span>
      <OtherMembership />
    </div>
  )
}

function StakingCard() {
  const [stakeAmount, setStakeAmount] = useState<string>('0')
  const { balance } = useStakingV2()

  const handleMax = () => {
    setStakeAmount(formatEther(balance ?? 0n))
  }

  return (
    <Card className='shadow-none'>
      <CardHeader>
        <CardTitle>Staking</CardTitle>
        <CardDescription>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Expedita
          veritatis
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className='grid w-full max-w-sm items-center gap-1.5'>
          <Label htmlFor='email'>Stake Amount</Label>
          <div className='flex items-center space-x-2 w-full max-w-sm'>
            <Input
              type='number'
              id='email'
              min={0}
              step={100}
              value={stakeAmount}
              onChange={(e) => setStakeAmount(e.target.value)}
            />
            <Button onClick={handleMax}>MAX</Button>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant='destructive' className='w-full'>
          Stake
        </Button>
      </CardFooter>
    </Card>
  )
}
