import { tokenSvg } from '@/assets/membership'
import { cn } from '@/lib/utils'
import { useMemo } from 'react'
import { FaCrown, FaLock } from 'react-icons/fa6'
import { FaRegCheckCircle } from 'react-icons/fa'
import { useTRLContract } from '@/hooks/use-contract'
import { formatEther } from 'viem'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card'
import { Button } from './ui/button'
import { useNavigate } from '@tanstack/react-router'

export type Membership = 'Basic' | 'Bronze' | 'Silver' | 'Gold' | 'Platinum'

interface MembershipCardProps {
  membership?: Membership
  isActive?: boolean
  isMobile?: boolean
}

type Styles = Record<
  Membership,
  {
    primary: `#${string}`
    secondary: `#${string}`
    iconSmall: string
    iconBig: string
  }
>

export type MembershipDetails = Record<
  Membership,
  {
    min: number
    max: number
    multiplier: number
    revenueShare: number
    isMarketplace: boolean
  }
>

const styles: Styles = {
  Basic: {
    primary: '#F36C24',
    secondary: '#FFF1E9',
    iconSmall: tokenSvg.basic,
    iconBig: tokenSvg.basicFull,
  },
  Bronze: {
    primary: '#C97112',
    secondary: '#FAEBDD',
    iconSmall: tokenSvg.bronze,
    iconBig: tokenSvg.bronzeFull,
  },
  Silver: {
    primary: '#737373',
    secondary: '#EDEEEC',
    iconSmall: tokenSvg.silver,
    iconBig: tokenSvg.silverFull,
  },
  Gold: {
    primary: '#9F7500',
    secondary: '#FCEFC3',
    iconSmall: tokenSvg.gold,
    iconBig: tokenSvg.goldFull,
  },
  Platinum: {
    primary: '#143854',
    secondary: '#E7F7FE',
    iconSmall: tokenSvg.platinum,
    iconBig: tokenSvg.platinumFull,
  },
}

export const membershipDetails: MembershipDetails = {
  Basic: {
    min: 1,
    max: 999,
    multiplier: 1,
    revenueShare: 0,
    isMarketplace: false,
  },
  Bronze: {
    min: 1000,
    max: 1999,
    multiplier: 1.1,
    revenueShare: 0,
    isMarketplace: false,
  },
  Silver: {
    min: 2000,
    max: 4999,
    multiplier: 1.15,
    revenueShare: 5,
    isMarketplace: false,
  },
  Gold: {
    min: 5000,
    max: 9999,
    multiplier: 1.2,
    revenueShare: 10,
    isMarketplace: false,
  },
  Platinum: {
    min: 10000,
    max: Infinity,
    multiplier: 1.25,
    revenueShare: 15,
    isMarketplace: true,
  },
}

export const MembershipCard: React.FC<MembershipCardProps> = ({
  isActive,
  isMobile = false,
}) => {
  const bc = useTRLContract()
  const navigate = useNavigate()
  const stakedAmount = +formatEther(bc.stakes.amount ?? 0n)

  const membership: Membership = useMemo(() => {
    return (
      (Object.entries(membershipDetails).find(
        ([, value]) =>
          stakedAmount >= value.min &&
          (value.max === Infinity || stakedAmount < value.max),
      )?.[0] as Membership) || 'Basic'
    )
  }, [stakedAmount])

  const membershipDetail = membershipDetails[membership]
  const membershipStyle = styles[membership]

  const progress = useMemo(() => {
    const range = membershipDetail.max - membershipDetail.min
    if (membership === 'Platinum') return '100'
    return Math.min(
      100,
      Math.max(0, ((stakedAmount - membershipDetail.min) / range) * 100),
    ).toString()
  }, [membershipDetail, stakedAmount])

  if (isMobile) {
    return (
      <div className='grid gap-6 sm:grid-cols-2'>
        <div
          className='flex rounded-xl overflow-clip'
          style={{ backgroundColor: membershipStyle.secondary }}
        >
          <div className='flex flex-col flex-1 p-6'>
            <span
              className='text-sm'
              style={{ color: membershipStyle.primary }}
            >
              Membership
            </span>
            <span
              className='flex items-center gap-2 text-2xl font-medium'
              style={{ color: membershipStyle.primary }}
            >
              {membership}
              <FaCrown className='w-4 h-4' />
            </span>
            {/* Progress Bar */}
            <div className='h-1.5 mb-4 overflow-hidden bg-gray-300 rounded-full mt-auto'>
              <div
                className='h-full duration-500 ease-in-out'
                style={{
                  width: `${progress}%`,
                  background: membershipStyle.primary,
                }}
              ></div>
            </div>
            {/* Stats */}
            <div className='flex items-center justify-between text-xs'>
              <span className='text-gray-600'># of TRLCO staked</span>
              <span
                className='font-semibold'
                style={{ color: membershipStyle.primary }}
              >
                {new Intl.NumberFormat('en-US').format(stakedAmount)}
              </span>
            </div>
          </div>
          <img src={membershipStyle.iconBig} />
        </div>
        {/* Benefits card */}
        <Card className='shadow-none'>
          <CardHeader>
            <div className='flex justify-between'>
              <div>
                <CardTitle>Membership Benefits</CardTitle>
                <CardDescription>Get higher multiplier bonus</CardDescription>
              </div>
              <Button
                size='sm'
                variant='secondary'
                onClick={() => navigate({ to: '/stake' })}
              >
                View More
              </Button>
            </div>
          </CardHeader>
          <CardContent className='*:flex *:justify-between'>
            <div>
              <span className='text-neutral-600'>Multiplier</span>
              <span>{membershipDetail.multiplier}x</span>
            </div>
            <div>
              <span className='text-neutral-600'>Revenue sharing</span>
              <span>{membershipDetail.revenueShare}%</span>
            </div>
            <div>
              <span className='text-neutral-600'>Asset marketplace</span>
              <span>
                {membershipDetail.isMarketplace ? (
                  <FaRegCheckCircle className='text-green-500' />
                ) : (
                  <span className='flex items-center gap-2'>
                    <FaLock />
                    Locked
                  </span>
                )}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div
      className={cn(
        isActive ? 'border-red-500' : 'border-[#E0E0E0]',
        'border rounded-xl overflow-clip bg-white',
      )}
    >
      <div
        className='flex gap-6 p-5'
        style={{ backgroundColor: membershipStyle.secondary }}
      >
        <div className='flex-grow'>
          {/* Title */}
          <div className='flex items-center gap-3 mb-4'>
            <h5 className='text-xl font-semibold'>{membership}</h5>
            <FaCrown style={{ color: membershipStyle.primary }} />
          </div>
          {/* Progress Bar */}
          <div className='h-1.5 mb-4 overflow-hidden bg-gray-300 rounded-full'>
            <div
              className='h-full duration-500 ease-in-out'
              style={{
                width: `${progress}%`,
                background: membershipStyle.primary,
              }}
            ></div>
          </div>
          {/* Stats */}
          <div className='flex items-center justify-between text-xs'>
            <span className='text-gray-600'># of TRLCO staked</span>
            <span
              className='font-semibold'
              style={{ color: membershipStyle.primary }}
            >
              {stakedAmount}
            </span>
          </div>
        </div>
        <div className='flex items-center justify-center'>
          <img
            src={membershipStyle.iconSmall}
            alt={`${membership} icon`}
            className='object-contain w-auto h-full'
          />
        </div>
      </div>
      <div className='flex flex-col gap-3 p-5 text-sm font-medium *:flex *:justify-between'>
        <div>
          <span># of TRLCO staked</span>
          <span>
            {membershipDetail.min} - {membershipDetail.max}
          </span>
        </div>
        <div>
          <span>Staking multiplier</span>
          <span>{membershipDetail.multiplier}x</span>
        </div>
        <div>
          <span>Revenue sharing</span>
          <span>{membershipDetail.revenueShare}%</span>
        </div>
        <div>
          <span>Asset marketplace</span>
          <span></span>
        </div>
      </div>
    </div>
  )
}

export const OtherMembership = () => {
  const bc = useTRLContract()
  const currentMembership = bc.membership.name

  return (
    <div className='grid gap-6 sm:grid-cols-2 xl:grid-cols-5'>
      {Object.entries(membershipDetails).map((m) => {
        const style = styles[m[0] as Membership]

        return (
          <div
            key={m[0]}
            className={`relative flex items-center justify-between p-4 rounded-xl ${m[0] === currentMembership ? 'border border-red-400' : ''}`}
            style={{ backgroundColor: style.secondary }}
          >
            {m[0] === currentMembership ? (
              <div className='absolute inset-x-0 text-center h-6 -top-[12px] flex justify-center items-center'>
                <span className='px-4 text-xs font-medium text-white bg-red-500 rounded-full py-0.5'>
                  Active
                </span>
              </div>
            ) : null}
            <div>
              <div className='flex items-center gap-2'>
                <h5 className='font-medium' style={{ color: style.primary }}>
                  {m[0]}
                </h5>
                <FaCrown style={{ color: style.primary }} />
              </div>
              <span className='text-sm font-semibold text-neutral-700'>
                {m[1].min} - {m[1].max}
              </span>
            </div>
            <div className='flex flex-col items-end justify-end'>
              <span className='text-xl font-bold'>{m[1].multiplier}x</span>
              <span className='text-xs'>Bonus</span>
            </div>
          </div>
        )
      })}
    </div>
  )
}
