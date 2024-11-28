import { IoMdStopwatch } from "react-icons/io";
import { Separator } from "@/components/ui/separator";

const PropertyInvestCard = () => (
  <div className='flex flex-col h-96 rounded-3xl bg-gradient-to-br from-orange-500 to-cyan-300 p-0.5 overflow-hidden'>
    <div className='text-white text-sm py-2 flex items-center justify-center gap-2'>
      <IoMdStopwatch /> 45 days left to invest in $TRLX1 Dubai
    </div>
    <div className='flex-1 bg-white rounded-b-[22px] p-6 space-y-3'>
      <div className='text-center space-y-2'>
        <span className='text-gray-600'>Property Price</span>
        <div className='flex items-end gap-2 justify-center'>
          <span className='text-green-500 text-2xl font-medium'>1,300,000</span>
          <span className='text-green-500 font-medium'>USD</span>
        </div>
      </div>
      <Separator className='my-5' />
      <div className='space-y-3'>
        <div className='flex justify-between'>
          <span className='text-gray-600 font-light'>
            Est. valuation in 2025
          </span>
          <span className='text-gray-600 font-semibold'>1,750,000 USD</span>
        </div>
        <div className='flex justify-between'>
          <span className='text-gray-600 font-light'>Current valuation</span>
          <span className='text-gray-600 font-semibold'>1,500,000 USD</span>
        </div>
        <div className='flex justify-between'>
          <span className='text-gray-600 font-light'>
            Est. capital appreciation p.a
          </span>
          <span className='text-gray-600 font-semibold'>16.7%</span>
        </div>
        <div className='flex justify-between'>
          <span className='text-gray-600 font-light'>
            Yearly investment return
          </span>
          <span className='text-gray-600 font-semibold'>9.32%</span>
        </div>
      </div>
      <div className='flex justify-center'>
        <button className='text-white bg-red-500 rounded-full py-3 px-8'>
          Invest in $TRLX1
        </button>
      </div>
    </div>
  </div>
);

export default PropertyInvestCard;
