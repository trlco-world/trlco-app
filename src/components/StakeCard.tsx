import { useTRLContract } from '@/hooks/use-contract'
import { Link } from '@tanstack/react-router'
import { RadialChart } from './RadialChart'
import { Skeleton } from './ui/skeleton'
import { formatEther } from 'viem'

export default function StakeCard() {
  const { baseRate, totalStaked, isLoading } = useTRLContract()

  const BaseRate = () =>
    isLoading ? (
      <>
        <Skeleton className='h-6' />
        <Skeleton className='h-3' />
      </>
    ) : (
      <>
        <span>{baseRate?.toString() ?? 'N/A'}%</span>
        <span className='text-sm text-neutral-500'>APR</span>
      </>
    )

  const TotalStake = () =>
    isLoading ? (
      <>
        <Skeleton className='h-6' />
        <Skeleton className='h-3' />
      </>
    ) : (
      <>
        <span>
          {new Intl.NumberFormat('en-US').format(
            +formatEther(totalStaked ?? 0n),
          )}{' '}
          $TRLCO
        </span>
        <span className='text-sm text-neutral-500'>Total staked</span>
      </>
    )

  return (
    <Link
      to='/stake/$stakeId'
      params={{ stakeId: 'fixed-staking' }}
      className='flex flex-col items-center gap-6 p-6 bg-white border sm:flex-row rounded-3xl'
    >
      <div className='w-full space-y-6 sm:w-8/12'>
        <div className='flex items-center gap-3'>
          <div className='w-8 h-8 rounded-full bg-neutral-300'>
            <img src='./trlco.svg' className='w-full h-full' />
          </div>
          <span className='font-medium'>$TRLCO Pool</span>
          <span className='px-2 py-1 text-xs text-white rounded bg-gradient-to-br from-[#088B82] to-[#143854]'>
            Fixed Term
          </span>
        </div>
        <div className='flex flex-col flex-auto gap-6 sm:flex-row'>
          <div className='flex flex-col gap-1 grow'>
            <BaseRate />
          </div>
          <div className='flex flex-col gap-1 grow'>
            <TotalStake />
          </div>
          <div className='flex flex-col gap-1 grow'>
            <span>60 Days</span>
            <span className='text-sm text-neutral-500'>Staked period</span>
          </div>
        </div>
      </div>
      <div className='w-full sm:w-auto'>
        <FixedTermProgress />
      </div>
    </Link>
  )
}

const FixedTermProgress = () => {
  return (
    <div className='rounded-3xl bg-[#FFF1E9] overflow-clip w-full'>
      <div className='flex justify-between px-4 py-3'>
        <div className='flex flex-col gap-1'>
          <span className='text-sm text-neutral-500'>Remaining</span>
          <span className='font-medium'>10,000,000</span>
        </div>
        <div>
          <RadialChart value={75} />
        </div>
      </div>
      <div className='bg-[#F36C24]/15 flex gap-3 justify-between py-3 px-4 text-neutral-500 text-sm'>
        <span>Total pool cap</span>
        <span>139,294,024</span>
      </div>
    </div>
  )
}
