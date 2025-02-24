// import StakeCard from '@/components/StakeCard'
import { StakeSwitcher } from '@/components/blockchain/StakeSwitcher'
import { createFileRoute } from '@tanstack/react-router'
import { lazy, Suspense } from 'react'
import { z } from 'zod'

const StakingV1 = lazy(() => import('@/components/blockchain/v1'))
const StakingV2 = lazy(() => import('@/components/blockchain/v2'))

export const Route = createFileRoute('/_dashboard/stake/')({
  validateSearch: z.object({
    version: z.string().default('v3'),
  }),
  component: StakePage,
})

function StakePage() {
  const { version } = Route.useSearch()
  return (
    <div className='space-y-3'>
      <PageTitle version={version} />
      <Suspense fallback={<div>Loading...</div>}>
        {version === 'v1' && <StakingV1 />}
        {version === 'v2' && <StakingV2 />}
        {version === 'v3' && <div>V3 Component Coming Soon</div>}
      </Suspense>
    </div>
  )
}

function PageTitle({ version }: { version: string }) {
  return (
    <div className='flex justify-between items-center'>
      <div className='flex gap-3 items-center'>
        <img className='w-8 h-8' src='/trlco.svg' alt='TRLCO' />
        <div className='flex gap-2 items-center font-medium sm:text-xl text-nowrap'>
          <span>Membership Staking</span>
          <div className='py-0.5 px-2 rounded-lg text-white text-xs bg-destructive'>
            {version}
          </div>
        </div>
      </div>
      <StakeSwitcher />
    </div>
  )
}
