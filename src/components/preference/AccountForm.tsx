import { Separator } from '@/components/ui/separator'
import { useAuth } from '@/hooks/user-auth'
import { updateUserFn } from '@/lib/api'
import { useCookies } from 'react-cookie'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

export default function AccountForm() {
  const { user } = useAuth()
  const { register, handleSubmit } = useForm()
  const [cookies] = useCookies(['trlco-at'])
  const authorization = cookies['trlco-at']

  const onSubmit = async (e: any) => {
    if (!e.firstName || !e.lastName) {
      return toast.info('Nothing to update')
    }

    toast.promise(updateUserFn(authorization, e.firstName, e.lastName), {
      loading: 'Updating Your Profile',
      success: 'Your profile is updated',
      error: 'Unable to Update',
    })
  }

  return (
    <div className='p-10'>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='grid gap-10 sm:grid-cols-4'
      >
        <label htmlFor='firstName' className='flex flex-col gap-3'>
          <span className='before:content-["*"] before:text-red-500'>
            First name
          </span>
          <input
            className='border border-gray-400 focus:outline-none focus:ring-red-500 focus:ring-1 focus:border-red-500 rounded-full py-2.5 px-6'
            placeholder={user?.first_name ?? 'Enter your first name'}
            {...register('firstName')}
          />
        </label>
        <label htmlFor='lastName' className='flex flex-col gap-3'>
          <span className='before:content-["*"] before:text-red-500'>
            Last name
          </span>
          <input
            className='border border-gray-400 focus:outline-none focus:ring-red-500 focus:ring-1 focus:border-red-500 rounded-full py-2.5 px-6'
            placeholder={user?.last_name ?? 'Enter your first name'}
            {...register('lastName')}
          />
        </label>
        {/* <label htmlFor='phone' className='flex flex-col gap-3'>
          <span className='before:content-["*"] before:text-red-500'>
            Phone number
          </span>
          <input
            className='border border-gray-400 focus:outline-none focus:ring-red-500 focus:ring-1 focus:border-red-500 rounded-full py-2.5 px-6'
            placeholder={'Enter your first name'}
            {...register('phone')}
          />
        </label> */}
        <Separator className='col-span-4' />
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
            <div className='absolute inset-y-0 right-0 flex items-center pr-6 text-4xl font-light'>
              +
            </div>
          </div>
        </label>
        <div className='flex items-end justify-between col-span-4'>
          <span className='before:content-["*"] text-red-400 text-sm'>
            Mandatory fields
          </span>
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
