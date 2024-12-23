import { Separator } from '@/components/ui/separator'
import { useForm } from 'react-hook-form'

export default function PreferenceForm() {
  const { register, handleSubmit } = useForm()

  const onSubmit = (e: any) => {
    console.log(e)
  }

  return (
    <div className='p-10'>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col max-w-sm gap-6'
      >
        <label htmlFor='language' className='flex flex-col gap-3'>
          Language
          <input
            className='border border-gray-400 focus:outline-none focus:ring-red-500 focus:ring-1 focus:border-red-500 rounded-full py-2.5 px-6'
            placeholder='Enter your first name'
            {...register('language')}
          />
        </label>
        <label htmlFor='lastName' className='flex flex-col gap-3'>
          Last name
          <input
            className='border border-gray-400 focus:outline-none focus:ring-red-500 focus:ring-1 focus:border-red-500 rounded-full py-2.5 px-6'
            placeholder='Enter your first name'
            {...register('lastName')}
          />
        </label>
        <label htmlFor='phone' className='flex flex-col gap-3'>
          Phone number
          <input
            className='border border-gray-400 focus:outline-none focus:ring-red-500 focus:ring-1 focus:border-red-500 rounded-full py-2.5 px-6'
            placeholder='Enter your first name'
            {...register('phone')}
          />
        </label>
        <Separator className='col-span-2' />
        <label htmlFor='document' className='flex flex-col gap-3'>
          <span className='after:content-["(Optional)"] after:text-gray-500 after:ml-1'>
            Submit KYC and accreditation
          </span>
          <div className='relative'>
            <input
              className='w-full border border-gray-400 focus:outline-none rounded-full py-2.5 px-6'
              placeholder='Enter your first name'
              {...register('document')}
            />
            <div className='absolute inset-y-0 left-0 flex items-center pr-6 text-4xl font-light'>
              +
            </div>
          </div>
        </label>
        <div className='flex items-end justify-end col-span-2'>
          <input
            type='submit'
            value='Save'
            className='bg-red-500 rounded-full py-2.5 px-8 text-white'
          />
        </div>
      </form>
    </div>
  )
}
