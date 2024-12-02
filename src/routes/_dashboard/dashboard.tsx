import { CompleteProfileModal } from '@/components/CompleteProfileModal'
import MembershipCard from '@/components/MembershipCard'
import WalletConnect from '@/components/WalletConnect'
import { useTRLContract } from '@/hooks/use-contract'
import { useAuth } from '@/hooks/user-auth'
import { createFileRoute, Link } from '@tanstack/react-router'
import { GoDotFill } from 'react-icons/go'
import { formatEther } from 'viem'
import { useAccount } from 'wagmi'

export const Route = createFileRoute('/_dashboard/dashboard')({
  component: RouteComponent,
})

function RouteComponent() {
  const { user } = useAuth()
  const bc = useTRLContract()
  const { isConnected } = useAccount()

  return (
    <div className='flex flex-col gap-6 p-10 bg-white rounded-3xl'>
      <div className='flex'>
        <div className='flex-1'>
          <h2 className='text-2xl font-semibold text-neutral-800'>
            Welcome to TRL, {user?.name}
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
        <div
          className={`flex flex-col p-6  rounded-3xl ${user?.is_profile_filled ? 'bg-red-50' : 'bg-red-100'}`}
        >
          <div className='flex-1'>
            <h3
              className={`text-2xl font-bold ${user?.is_profile_filled ? 'text-red-400' : 'text-red-500'}`}
            >
              1 -
            </h3>
            <h4
              className={`text-lg font-semibold ${user?.is_profile_filled ? 'text-black/50' : 'text-black'}`}
            >
              Basic information
            </h4>
            <p
              className={`mb-3 ${user?.is_profile_filled ? 'text-black/40' : 'text-black'}`}
            >
              Provide essential details to tailor your experience
            </p>
          </div>
          <div>
            {user?.is_profile_filled ? (
              <button
                className='px-4 py-2 text-sm font-medium bg-white rounded-full text-green-400/50'
                disabled
              >
                Completed
              </button>
            ) : (
              <CompleteProfileModal>
                <button className='px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-full'>
                  Setup Profile
                </button>
              </CompleteProfileModal>
            )}
          </div>
        </div>
        {/* active state */}
        <div className='p-6 bg-red-100 rounded-3xl'>
          <h3 className='text-2xl font-bold text-red-500'>2 -</h3>
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
        {/* deactive state */}
        <div
          className={`flex flex-col p-6  rounded-3xl ${isConnected ? 'bg-red-50' : 'bg-red-100'}`}
        >
          <div className='flex-1'>
            <h3
              className={`text-2xl font-bold ${isConnected ? 'text-red-400' : 'text-red-500'}`}
            >
              3 -
            </h3>
            <h4
              className={`text-lg font-semibold ${isConnected ? 'text-black/50' : 'text-black'}`}
            >
              Add wallet
            </h4>
            <p
              className={`mb-3 ${isConnected ? 'text-black/40' : 'text-black'}`}
            >
              An eligible wallet is required to lend to pools.
            </p>
          </div>
          <div>
            {isConnected ? (
              <button
                className='px-4 py-2 text-sm font-medium bg-white rounded-full text-green-400/50'
                disabled
              >
                Connected
              </button>
            ) : (
              <WalletConnect />
            )}
          </div>
        </div>
      </div>

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
