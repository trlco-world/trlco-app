import { Separator } from "@/components/ui/separator";

const PropertyFinancialCards = () => (
  <div className='space-y-6'>
    <h4 className='text-lg font-medium'>Financials</h4>
    <div className='grid grid-cols-2 gap-3'>
      <div className='rounded-3xl border space-y-6 p-6'>
        <div className='font-medium'>Property Cost</div>
        <div className='flex justify-between text-sm'>
          <span className='text-gray-600 font-light'>Property price</span>
          <span className='font-medium'>1,760,000 USD</span>
        </div>
        <div className='flex justify-between text-sm'>
          <span className='text-gray-600 font-light'>Transaction costs</span>
          <span className='font-medium'>220,563 USD</span>
        </div>
        <div className='flex justify-between text-sm'>
          <span className='text-gray-600 font-light'>TRLX fee</span>
          <span className='font-medium'>1.5%</span>
        </div>
        <Separator />
        <div className='flex justify-between text-sm'>
          <span className='text-gray-600'>Investment cost</span>
          <span className='text-green-500 font-medium'>1,980,563 USD</span>
        </div>
      </div>
      <div className='rounded-3xl border space-y-6 p-6'>
        <div className='font-medium'>Rental income (Year 1)</div>
        <div className='flex justify-between text-sm'>
          <span className='text-gray-600 font-light'>Property price</span>
          <span className='font-medium'>1,760,000 USD</span>
        </div>
        <div className='flex justify-between text-sm'>
          <span className='text-gray-600 font-light'>Transaction costs</span>
          <span className='font-medium'>220,563 USD</span>
        </div>
        <div className='flex justify-between text-sm'>
          <span className='text-gray-600 font-light'>TRLX fee</span>
          <span className='font-medium'>1.5%</span>
        </div>
        <Separator />
        <div className='flex justify-between text-sm'>
          <span className='text-gray-600'>Investment cost</span>
          <span className='text-green-500 font-medium'>1,980,563 USD</span>
        </div>
      </div>
    </div>
  </div>
);

export default PropertyFinancialCards;
