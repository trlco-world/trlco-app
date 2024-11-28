import { BiSwim } from "react-icons/bi";
import { GiMeditation } from "react-icons/gi";
import { LuDumbbell } from "react-icons/lu";
import { MdHotTub, MdOutlineTrain, MdWheelchairPickup } from "react-icons/md";

const PropertyAmenities = () => {
  return (
    <div className='space-y-6'>
      <h4 className='text-lg font-medium'>Amenities</h4>
      <div className='grid grid-cols-3 gap-3'>
        <div className='flex gap-2 items-center'>
          <MdWheelchairPickup className='h-5 w-5 text-red-500' />
          <span className='text-gray-600'>Wheelchair friendly</span>
        </div>
        <div className='flex gap-2 items-center'>
          <LuDumbbell className='h-5 w-5 text-red-500' />
          <span className='text-gray-600'>Gym</span>
        </div>
        <div className='flex gap-2 items-center'>
          <GiMeditation className='h-5 w-5 text-red-500' />
          <span className='text-gray-600'>Yoga deck</span>
        </div>
        <div className='flex gap-2 items-center'>
          <MdOutlineTrain className='h-5 w-5 text-red-500' />
          <span className='text-gray-600'>Public transportations</span>
        </div>
        <div className='flex gap-2 items-center'>
          <BiSwim className='h-5 w-5 text-red-500' />
          <span className='text-gray-600'>Pool</span>
        </div>
        <div className='flex gap-2 items-center'>
          <MdHotTub className='h-5 w-5 text-red-500' />
          <span className='text-gray-600'>Jacuzzi</span>
        </div>
      </div>
    </div>
  );
};

export default PropertyAmenities;
