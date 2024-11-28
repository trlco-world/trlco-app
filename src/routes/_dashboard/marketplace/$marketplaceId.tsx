import BackButton from '@/components/BackButton'
import { createFileRoute } from '@tanstack/react-router'
import { BiBuildings, BiHome } from 'react-icons/bi'
import { RiContractLine } from 'react-icons/ri'
import * as svg from '@/assets/svg'
import KycCard from '@/components/KycCard'
import InvestCard from '@/components/InvestCard'

export const Route = createFileRoute('/_dashboard/marketplace/$marketplaceId')({
  component: PropertyDetailPage,
})

const data = {
  id: '123',
  name: 'Dubai',
  symbol: '$TRLX1',
  properties: 10,
  type: 'Residential',
  lease: 'Freehold',
  overview:
    'Property investments in Dubai are on the rise, with impressive statistics to prove it. In the year through June 2023, average property prices surged by 16.9%, and residential rents rose by 22.8%. These robust figures signify Dubai’s status as a promising destination for property investment',
  portfolio:
    'Investment opportunities in Dubai’s prime communities, including Downtown Dubai, Dubai Marina, Dubai Hills Estate, Dubai Creek Harbour, and Arabian Ranches III, among others.',
  portfolioDetails: [
    {
      title: 'Total investment',
      value: '3,000,000 USD',
      svg: svg.funding,
    },
    {
      title: 'Property value',
      value: '3,000,000 USD',
      svg: svg.rental,
    },
    {
      title: 'Vesting cliff',
      value: '10,000 USD',
      svg: svg.clock,
    },
    {
      title: 'Token issued',
      value: '60,000',
      svg: svg.coin,
    },
    {
      title: 'Gross annual rental yield',
      value: '5.47%',
      svg: svg.rentIncrease,
    },
    {
      title: 'Yearly asset appreciation',
      value: '5.5%',
      svg: svg.coinIncrease,
    },
    {
      title: 'Total projected gross',
      value: '15.89%',
      svg: svg.chart,
    },
    {
      title: 'Total tokens purchased',
      value: '60,000',
      svg: svg.coinHand,
    },
    {
      title: 'Total claimed token',
      value: '0',
      svg: svg.coin,
    },
  ],
}

function PropertyDetails() {
  return (
    <div className='p-12 space-y-12 bg-white rounded-3xl overflow-clip'>
      <BackButton />
      {/* Head */}
      <div className='space-y-3'>
        <div className='flex items-center gap-3'>
          <h5 className='text-2xl font-semibold'>{data.name}</h5>
          <span className='border border-[#FF4A3F] text-[#FF4A3F] px-2.5 py-0.5 rounded-lg'>
            {data.symbol}
          </span>
        </div>
        <div className='flex gap-3'>
          <span className='flex items-center gap-1.5 bg-[#F6F6F2] rounded-full px-3 py-0.5 text-[#565656]'>
            <BiHome />
            {data.properties} properties
          </span>
          <span className='flex items-center gap-1.5 bg-[#F6F6F2] rounded-full px-3 py-0.5 text-[#565656]'>
            <BiBuildings />
            {data.type}
          </span>
          <span className='flex items-center gap-1.5 bg-[#F6F6F2] rounded-full px-3 py-0.5 text-[#565656]'>
            <RiContractLine />
            {data.lease}
          </span>
        </div>
      </div>
      {/* Photo & Video */}
      <div
        style={{
          paddingBottom: '56.25%',
          maxWidth: '100%',
          position: 'relative',
        }}
      >
        <iframe
          src='https://player.vimeo.com/video/840137618?title=0&portrait=0&byline=0'
          width='800px'
          height='450px'
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
          }}
        ></iframe>
      </div>
      {/*  */}
      <div className='space-y-1'>
        <h5 className='text-lg font-medium'>Overview</h5>
        <p className='text-[#565656] font-light'>{data.overview}</p>
      </div>
      <div className='space-y-1'>
        <h5 className='text-lg font-medium'>Portfolio details</h5>
        <p className='text-[#565656] font-light'>{data.portfolio}</p>
      </div>
      <div className='grid gap-6 sm:grid-cols-2'>
        {data.portfolioDetails.map((u, i) => (
          <div key={i} className='flex items-center border-l'>
            <img className='p-6' src={u.svg} alt={u.title} />
            <div className='flex flex-col'>
              <span className='font-light text-[#8A8A8A]'>{u.title}</span>
              <span className='font-medium text-[#17271F]'>{u.value}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function PropertyDetailPage() {
  return (
    <div className='relative h-full w-full grid grid-cols-[1fr_auto] gap-6'>
      <div className='overflow-y-scroll'>
        <PropertyDetails />
      </div>
      <div className='w-[400px] space-y-3'>
        <KycCard />
        <InvestCard />
      </div>
    </div>
  )
}
