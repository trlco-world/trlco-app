import { PropertyDetailBadge } from '@/components/property/DetailBadge'
import { createFileRoute } from '@tanstack/react-router'
import { TbArrowsMaximize, TbBath, TbBed, TbDoor, TbKey } from 'react-icons/tb'
import { MdAttachMoney } from 'react-icons/md'
import { MdOutlineLocationOn } from 'react-icons/md'
import PropertyFinancialCards from '@/components/property/FinancialCard'
import PropertyTimeline from '@/components/property/Timeline'
import PropertyAmenities from '@/components/property/Amenities'
import PropertyDocument from '@/components/property/Documents'
import PropertyInvestCard from '@/components/property/InvestCard'

export const Route = createFileRoute('/_dashboard/property/$propertyId')({
  component: PropertyDetailPage,
})

function PropertyDetailPage() {
  return (
    <div className='p-10 space-y-8 bg-white rounded-3xl'>
      <div className='rounded-3xl overflow-hidden grid grid-cols-2 gap-3 min-h-[300px]'>
        <div className='relative'>
          <img
            className='object-cover'
            src='/images/property-detail-1.png'
            alt=''
          />
        </div>

        <div className='grid grid-cols-2 gap-3'>
          <div className='relative'>
            <img
              className='object-cover'
              src='/images/property-detail-1.png'
              alt=''
            />
          </div>
          <div className='relative'>
            <img
              className='object-cover'
              src='/images/property-detail-1.png'
              alt=''
            />
          </div>
          <div className='relative'>
            <img
              className='object-cover'
              src='/images/property-detail-1.png'
              alt=''
            />
          </div>
          <div className='relative'>
            <img
              className='object-cover'
              src='/images/property-detail-1.png'
              alt=''
            />
          </div>
        </div>
      </div>
      <div className='space-y-3'>
        <h4 className='text-2xl font-semibold'>Hartland Waves, MBR City</h4>
        <div className='flex gap-2'>
          <PropertyDetailBadge icon={<TbBed />} value='1' />
          <PropertyDetailBadge icon={<TbBath />} value='2' />
          <PropertyDetailBadge icon={<TbDoor />} value='308' />
          <PropertyDetailBadge
            icon={<TbArrowsMaximize />}
            value='1,334 sq. ft'
          />
          <PropertyDetailBadge icon={<TbKey />} value='Rented' />
        </div>
      </div>
      <div className='grid grid-cols-2 gap-12'>
        <div className='space-y-8'>
          <div className='space-y-3'>
            <h3 className='text-lg font-medium'>Property overview</h3>
            <p className='font-light text-gray-600'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Pellentesque eu bibendum justo, in bibendum ligula. Duis sed diam
              vel neque tincidunt auctor. Lorem ipsum dolor sit amet,
              consectetur adipiscing elit. Pellentesque eu bibendum justo, in
              bibendum ligula. Duis sed diam vel neque tincidunt auctor.
            </p>
            <p className='font-light text-gray-600'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Pellentesque eu bibendum justo, in bibendum ligula. Duis sed diam
              vel neque tincidunt auctor.
            </p>
          </div>
          <div className='space-y-6'>
            <div className='flex items-center gap-3'>
              <MdAttachMoney className='w-8 h-8 text-red-500' />
              <div className='flex flex-col'>
                <span className='text-emerald-900'>
                  Current rent is 8,723 USD per month
                </span>
                <span className='font-light text-gray-600'>
                  Lorem ipsum dolor sit amet consectetur. Ipsum pellentesque.
                </span>
              </div>
            </div>
            <div className='flex items-center gap-3'>
              <MdAttachMoney className='w-8 h-8 text-red-500' />
              <div className='flex flex-col'>
                <span className='text-emerald-900'>
                  7.15% annual gross yield
                </span>
                <span className='font-light text-gray-600'>
                  Lorem ipsum dolor sit amet consectetur. Ipsum pellentesque.
                </span>
              </div>
            </div>
          </div>
          <div className='space-y-3'>
            <iframe
              className='overflow-hidden rounded-3xl'
              src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d231281.00058936916!2d55.06268049454667!3d25.07593146086879!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f43496ad9c645%3A0xbde66e5084295162!2sDubai%20-%20United%20Arab%20Emirates!5e0!3m2!1sen!2smy!4v1723189787069!5m2!1sen!2smy'
              width='500'
              height='240'
              style={{ border: 0 }}
              loading='lazy'
              referrerPolicy='no-referrer-when-downgrade'
            ></iframe>
            <div className='flex items-center gap-2 font-light text-gray-600'>
              <MdOutlineLocationOn className='w-5 h-5' />
              Dubai, United Arab Emirates
            </div>
          </div>
          <PropertyFinancialCards />
          <PropertyTimeline />
          <PropertyAmenities />
          <PropertyDocument />
        </div>
        <PropertyInvestCard />
      </div>
    </div>
  )
}
