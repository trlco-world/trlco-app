import { Link } from '@tanstack/react-router'
import { AspectRatio } from '../ui/aspect-ratio'
import { IoLockClosed } from 'react-icons/io5'

export interface MarketplaceProps {
  id: string
  name: string
  imgUrl: string
  symbol: string
  properties: string
  tokenPrice: string
  roi: string
  valuation: string
  tokenAvailable: string
  tokenUnavailable: string
  isLocked: boolean
}

export default function MarketplaceCard(props: MarketplaceProps) {
  const Info = ({ props }: { props: { label: string; value: string } }) => (
    <div className='flex items-end justify-between'>
      <span className='text-sm text-[#565656]'>{props.label}</span>
      <span className='font-semibold text-[#17271F]'>{props.value}</span>
    </div>
  )

  const ProgressCard = () => (
    <div className='bg-[#FFF1E9] rounded-xl overflow-clip text-[#565656]'>
      <div className='p-3 space-y-2'>
        <div className='flex items-center justify-between'>
          <span>Collected</span>
          <span>27.39%</span>
        </div>
        <div className='h-1.5 overflow-clip rounded-full bg-white'>
          <div className='h-full bg-red-500' style={{ width: '40%' }} />
        </div>
      </div>
      <div className='flex items-center justify-between p-3 bg-[#FDDDCB]'>
        <span>Token available</span>
        <span>
          {props.tokenUnavailable}/{props.tokenAvailable}
        </span>
      </div>
    </div>
  )

  return (
    <Link
      to='/marketplace/$marketplaceId'
      params={{ marketplaceId: props.id }}
      className='flex flex-col text-sm shadow rounded-3xl overflow-clip'
    >
      <AspectRatio ratio={16 / 9} className='overflow-clip'>
        <img
          className='object-cover w-full h-auto'
          src={props.imgUrl}
          alt={props.name}
        />
      </AspectRatio>
      <div className='p-6 space-y-6'>
        <div className='flex items-center gap-3 text-lg font-semibold'>
          <h5>{props.name}</h5>
          <span className='px-2 py-0.5 text-xs text-[#FF4A3F] border border-[#FF4A3F] rounded'>
            {props.symbol}
          </span>
        </div>
        <div className='relative'>
          <div className='absolute inset-0 grid place-items-center'>
            <span className='flex items-center gap-2 text-lg'>
              <IoLockClosed />
              Coming Soon
            </span>
          </div>
          <div className={`space-y-3 ${props.isLocked ? 'blur' : ''}`}>
            <Info
              props={{ label: 'No. of Properties', value: props.properties }}
            />
            <Info
              props={{ label: 'Price per token', value: props.tokenPrice }}
            />
            <Info
              props={{ label: 'Yearly investment return', value: props.roi }}
            />
            <Info
              props={{ label: 'Current valuation', value: props.valuation }}
            />
            <ProgressCard />
          </div>
        </div>
      </div>
    </Link>
  )
}
