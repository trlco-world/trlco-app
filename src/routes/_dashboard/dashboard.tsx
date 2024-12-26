import FaucetBanner from '@/components/FaucetBanner'
import MembershipCard from '@/components/MembershipCard'
import UserChecklist from '@/components/UserChecklist'
import { useTRLContract } from '@/hooks/use-contract'
import { createFileRoute, Link } from '@tanstack/react-router'
import { GoDotFill } from 'react-icons/go'
import { formatEther } from 'viem'
import { useAccount } from 'wagmi'

export const Route = createFileRoute('/_dashboard/dashboard')({
  component: RouteComponent,
})

function RouteComponent() {
  const bc = useTRLContract()
  const { isConnected } = useAccount()

  return (
    <div className='space-y-6'>
      <FaucetBanner />

      {/* steps card */}
      <UserChecklist />

      {isConnected ? (
        <MembershipCard
          stakedAmount={+formatEther(bc.stakes.amount ?? 0n)}
          isMobile
        />
      ) : null}

      {/* Carousel */}
      <div className='space-y-3'>
        <h3 className='text-2xl font-semibold text-neutral-900'>For You</h3>
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
        <div className='grid gap-6 sm:grid-cols-2'>
          <div className='flex flex-col overflow-hidden border sm:flex-row rounded-3xl'>
            <div className='relative min-w-[200px] h-[200px]'>
              <img
                src='/images/learn-placeholder.png'
                className='object-cover w-full h-full'
                alt='image'
              />
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
          <div className='flex flex-col overflow-hidden border sm:flex-row rounded-3xl'>
            <div className='relative min-w-[200px] h-[200px]'>
              <img
                src='/images/learn-placeholder.png'
                className='object-cover w-full h-full'
                alt='image'
              />
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
