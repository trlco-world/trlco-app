import { Separator } from '@/components/ui/separator'
import { RadialChart } from './RadialChart'
import { lazy } from 'react'
import { useTRLContract } from '@/hooks/use-contract'
import { formatEther } from 'viem'

const UnstakeModel = lazy(() =>
  import('./UnstakeModel').then((module) => ({ default: module.default })),
)

const StakeModel = lazy(() =>
  import('./StakeModel').then((module) => ({ default: module.default })),
)

const ClaimModel = lazy(() =>
  import('./ClaimModel').then((module) => ({ default: module.default })),
)

export default function StakeCard() {
  const { stakes, reward, allowance } = useTRLContract()
  return (
    <div className='flex gap-6 p-6 border rounded-3xl'>
      <div className='flex-1 space-y-6'>
        <div className='flex items-center gap-3'>
          <div className='w-8 h-8 rounded-full bg-neutral-300'></div>
          <span className='font-medium'>$TRLCO Pool</span>
          <span className='px-2 py-1 text-xs text-white rounded bg-cyan-600'>
            Fixed Term
          </span>
        </div>
        <div className='flex flex-auto gap-6'>
          <div className='flex flex-col gap-1 grow'>
            <span>6.00%</span>
            <span className='text-xs text-neutral-500'>APR</span>
          </div>
          <div className='flex flex-col gap-1 grow'>
            <span>139,294,024 USD</span>
            <span className='text-xs text-neutral-500'>Total staked</span>
          </div>
          <div className='flex flex-col gap-1 grow'>
            <span>60 Days</span>
            <span className='text-xs text-neutral-500'>Staked period</span>
          </div>
        </div>
      </div>
      <div>
        <FixedTermProgress />
      </div>
      <div>
        <Separator orientation='vertical' />
      </div>
      <div className='grid'>
        <div className='flex items-center gap-3'>
          <StakeModel>
            <button className='py-2 text-sm font-medium text-center text-white bg-red-500 rounded-full min-w-24'>
              Stake
            </button>
          </StakeModel>
          <div className='flex flex-col text-xs font-light text-neutral-500'>
            <span>Available to stake:</span>
            <span>$TRLCO {formatEther(allowance ?? 0n)}</span>
          </div>
        </div>
        <div className='flex items-center gap-3'>
          <UnstakeModel>
            <button className='py-2 text-sm font-medium text-center text-red-500 border border-red-500 rounded-full min-w-24'>
              Un-Stake
            </button>
          </UnstakeModel>
          <div className='flex flex-col text-xs font-light text-neutral-500'>
            <span>Your staked:</span>
            <span>$TRLCO {formatEther(stakes.amount ?? 0n)}</span>
          </div>
        </div>
        <div className='flex items-center gap-3'>
          <ClaimModel>
            <button className='py-2 text-sm font-medium text-center text-red-500 border border-red-500 rounded-full min-w-24'>
              Claim
            </button>
          </ClaimModel>
          <div className='flex flex-col text-xs font-light text-neutral-500'>
            <span>Available to claim:</span>
            <span>$TRLCO {formatEther(reward ?? 0n)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

const FixedTermProgress = () => {
  return (
    <div className='rounded-3xl bg-[#FFF1E9] overflow-clip'>
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
