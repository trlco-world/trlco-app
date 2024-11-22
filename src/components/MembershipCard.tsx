import { tokenSvg } from '@/assets/membership'
import { cn } from '@/lib/utils'
import { FaCrown } from 'react-icons/fa6'

type Membership = 'Basic' | 'Bronze' | 'Silver' | 'Gold' | 'Platinum'

interface MembershipCardProps {
  membership?: Membership
  stakedAmount: number
  isActive?: boolean
}

const membershipDetails = {
  Basic: {
    textColor: '#F36C24',
    bgColor: '#FFF1E9',
    iconColor: '#F36C24',
    icon: tokenSvg.basic,
    min: 1,
    max: 999,
    trlcoRate: 0,
    trlxRate: 0,
    revenueSharing: 0,
    assetMarketplace: false,
  },
  Bronze: {
    textColor: '#C97112',
    bgColor: '#FAEBDD',
    iconColor: '#C97112',
    icon: tokenSvg.bronze,
    min: 1000,
    max: 1999,
    trlcoRate: 1.1,
    trlxRate: 1.1,
    revenueSharing: 0,
    assetMarketplace: false,
  },
  Silver: {
    textColor: '#737373',
    bgColor: '#EDEEEC',
    iconColor: '#737373',
    icon: tokenSvg.silver,
    min: 5000,
    max: 9999,
    trlcoRate: 1.15,
    trlxRate: 1.15,
    revenueSharing: 5,
    assetMarketplace: false,
  },
  Gold: {
    textColor: '#9F7500',
    bgColor: '#FCEFC3',
    iconColor: '#9F7500',
    icon: tokenSvg.gold,
    min: 10000,
    max: 3999,
    trlcoRate: 1.2,
    trlxRate: 1.2,
    revenueSharing: 10,
    assetMarketplace: false,
  },
  Platinum: {
    textColor: '#143854',
    bgColor: '#E7F7FE',
    iconColor: '#088AB5',
    icon: tokenSvg.platinum,
    min: 4000,
    max: 4999,
    trlcoRate: 1.2,
    trlxRate: 1.2,
    revenueSharing: 15,
    assetMarketplace: true,
  },
}

const MembershipCard: React.FC<MembershipCardProps> = ({
  stakedAmount,
  isActive,
}) => {
  const membership = Object.keys(membershipDetails).find((key) => {
    const details = membershipDetails[key as Membership]
    return stakedAmount >= details.min && stakedAmount <= details.max
  }) as Membership

  const details = membershipDetails[membership ?? 'Basic']

  const progress = Math.min(
    100,
    Math.max(
      0,
      ((stakedAmount - details.min) / (details.max - details.min)) * 100,
    ),
  )

  return (
    <div
      className={cn(
        isActive ? 'border-red-500' : 'border-[#E0E0E0]',
        'border-2 rounded-3xl overflow-clip w-[300px]',
      )}
    >
      <div
        className='flex gap-6 p-5'
        style={{ backgroundColor: details.bgColor }}
      >
        <div className='flex-grow'>
          {/* Title */}
          <div className='flex items-center gap-3 mb-4'>
            <h5 className='text-xl font-semibold'>{membership}</h5>
            <FaCrown style={{ color: details.iconColor }} />
          </div>
          {/* Progress Bar */}
          <div className='h-1.5 mb-4 overflow-hidden bg-gray-300 rounded-full'>
            <div
              className='h-full duration-500 ease-in-out bg-red-500'
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          {/* Stats */}
          <div className='flex items-center justify-between text-xs'>
            <span className='text-gray-600'># of TRLCO staked</span>
            <span
              className='font-semibold'
              style={{ color: details.textColor }}
            >
              {stakedAmount}
            </span>
          </div>
        </div>
        <div className='flex items-center justify-center flex-auto'>
          <img
            src={details.icon}
            alt={`${membership} icon`}
            className='object-contain w-auto h-full'
          />
        </div>
      </div>
      <div className='flex flex-col gap-3 p-5 text-sm font-medium *:flex *:justify-between'>
        <div>
          <span># of TRLCO staked</span>
          <span>
            {details.min} - {details.max}
          </span>
        </div>
        <div>
          <span>Staking multiplier</span>
        </div>
        <div>
          <span
            style={{
              backgroundColor: details.bgColor,
              color: details.textColor,
              fontSize: 12,
              padding: '0 5px',
              borderRadius: 4,
            }}
          >
            $TRLCO
          </span>
          <span>{details.trlcoRate}x</span>
        </div>
        <div>
          <span
            style={{
              backgroundColor: details.bgColor,
              color: details.textColor,
              fontSize: 12,
              padding: '0 5px',
              borderRadius: 4,
            }}
          >
            $TRLX
          </span>
          <span>{details.trlxRate}x</span>
        </div>
        <div>
          <span>Revenue sharing</span>
          <span>{details.revenueSharing}%</span>
        </div>
        <div>
          <span>Asset Marketplace</span>
          <span></span>
        </div>
      </div>
    </div>
  )
}

export default MembershipCard
