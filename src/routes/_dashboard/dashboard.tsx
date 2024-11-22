import { getUserFn } from '@/lib/api'
import { useQuery } from '@tanstack/react-query'
import { createFileRoute, Link } from '@tanstack/react-router'
import { useCookies } from 'react-cookie'
import { GoDotFill } from 'react-icons/go'

export const Route = createFileRoute('/_dashboard/dashboard')({
  component: RouteComponent,
})

function RouteComponent() {
  const [cookies] = useCookies(['trlco-at'])
  const token = cookies['trlco-at']

  const { data } = useQuery({
    queryKey: ['user'],
    queryFn: async () => getUserFn(token),
  })

  return (
    <div className='flex flex-col gap-6 p-10 bg-white rounded-3xl'>
      <div className='flex'>
        <div className='flex-1'>
          <h2 className='text-2xl font-semibold text-neutral-800'>
            Welcome to TRL, {data?.email}
          </h2>
          <p className='text-neutral-500'>
            Start investing in your first pool by completing the action items
            below.
          </p>
        </div>
        <div className='flex items-end'>
          <span className='text-green-500'>2/3 completed</span>
        </div>
      </div>

      {/* steps card */}

      <div className='grid grid-cols-3 gap-6'>
        {/* active state */}
        <div className='flex flex-col p-6 bg-red-50 rounded-3xl'>
          <div className='flex-1'>
            <h3 className='text-2xl font-bold text-red-400'>1 -</h3>
            <h4 className='text-lg font-semibold text-black/50'>
              Basic information
            </h4>
            <p className='mb-3 text-black/40'>
              Provide essential details to tailor your experience
            </p>
          </div>
          <div>
            <button
              className='px-4 py-2 text-sm font-medium bg-white rounded-full text-green-400/50'
              disabled
            >
              Completed
            </button>
          </div>
        </div>
        {/* deactive state */}
        <div className='flex flex-col p-6 bg-red-50 rounded-3xl'>
          <div className='flex-1'>
            <h3 className='text-2xl font-bold text-red-400'>2 -</h3>
            <h4 className='text-lg font-semibold text-black/50'>Add wallet</h4>
            <p className='mb-3 text-black/40'>
              An eligible wallet is required to lend to pools.
            </p>
          </div>
          <div>
            <button
              className='px-4 py-2 text-sm font-medium bg-white rounded-full text-green-400/50'
              disabled
            >
              Connected
            </button>
          </div>
        </div>
        {/* active state */}
        <div className='p-6 bg-red-100 rounded-3xl'>
          <h3 className='text-2xl font-bold text-red-500'>3 -</h3>
          <h4 className='text-lg font-semibold text-neutral-900'>
            e-KYC requirements
          </h4>
          <p className='mb-3 text-neutral-500'>
            Complete our onboarding tasks required to start lending.
          </p>
          <button
            className='px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-full'
            disabled
          >
            Upload documents
          </button>
        </div>
      </div>

      {/* Carousel */}
      <div className='space-y-3'>
        <div className='flex overflow-hidden border rounded-3xl'>
          <div className='relative min-w-[400px] min-h-[300px]'>
            <img
              className='object-cover'
              src='/images/carousel-placeholder.png'
              alt=''
            />
          </div>
          <div className='grid p-10 place-content-center'>
            <h3 className='text-2xl font-semibold'>
              Breaking Barriers: How The Real Lifestyle Empowers Equality and
              Access
            </h3>
            <p className='text-neutral-500'>
              In an era where socio-economic imbalances deepen by the day,
              renting and real estate ownership stand as...
            </p>
          </div>
        </div>
        <div className='flex justify-center gap-1'>
          <GoDotFill className='text-red-100' />
          <GoDotFill className='text-red-100' />
          <GoDotFill className='text-red-400' />
          <GoDotFill className='text-red-100' />
        </div>
      </div>

      {/* Learn with Trl */}
      <div className='flex flex-col gap-6'>
        <div className='flex items-end justify-between'>
          <h3 className='text-2xl font-semibold text-neutral-900'>
            Learn with TRL
          </h3>
          <Link href='#' className='font-medium text-red-500'>
            View more
          </Link>
        </div>
        <div className='grid grid-cols-2 gap-6'>
          <div className='flex overflow-hidden border rounded-3xl'>
            <div className='relative min-w-[200px]'>
              <img src='/images/learn-placeholder.png' alt='image' />
            </div>
            <div className='p-6 space-y-3'>
              <div className='text-sm text-neutral-500 text-normal'>
                3 Jul 2024
              </div>
              <h5 className='font-medium'>
                Unlocking the game of real estate: How TRL makes investing fun
                and accessible
              </h5>
              <div>
                <Link href='#' className='font-semibold text-red-500'>
                  Read More
                </Link>
              </div>
            </div>
          </div>
          <div className='flex overflow-hidden border rounded-3xl'>
            <div className='relative min-w-[200px]'>
              <img src='/images/learn-placeholder.png' alt='image' />
            </div>
            <div className='p-6 space-y-3'>
              <div className='text-sm text-neutral-500 text-normal'>
                1 Jul 2024
              </div>
              <h5 className='font-medium'>
                A guide to understanding real world assets in real estate
              </h5>
              <div>
                <Link href='#' className='font-semibold text-red-500'>
                  Read More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
