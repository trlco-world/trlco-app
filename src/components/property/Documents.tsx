import { FaRegFileLines } from "react-icons/fa6";
const PropertyDocument = () => {
  return (
    <div className='space-y-6'>
      <h4 className='text-lg font-medium'>Documents</h4>
      <div className='grid grid-cols-3 gap-5'>
        <div className='rounded-3xl border p-5 flex flex-col gap-3'>
          <FaRegFileLines className='h-10 w-10 text-red-400' />
          <span className='text-red-500'>Investor memo</span>
        </div>
        <div className='rounded-3xl border p-5 flex flex-col gap-3'>
          <FaRegFileLines className='h-10 w-10 text-red-400' />
          <span className='text-red-500'>Valuation report</span>
        </div>
        <div className='rounded-3xl border p-5 flex flex-col gap-3'>
          <FaRegFileLines className='h-10 w-10 text-red-400' />
          <span className='text-red-500'>Projections</span>
        </div>
      </div>
    </div>
  );
};

export default PropertyDocument;
