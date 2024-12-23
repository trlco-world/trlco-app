import Banner from '@/components/Banner'
import StakeCard from '@/components/StakeCard'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_dashboard/stake/')({
  component: StakePage,
})

function StakePage() {
  return (
    <div className='h-full overflow-y-scroll bg-white rounded-3xl'>
      <Banner>
        <h2 className='text-lg font-semibold text-white sm:text-2xl'>
          Start staking to enjoy high earnings
        </h2>
        <p className='text-sm text-neutral-200 sm:text-base'>
          Enjoy yield by staking $TRLCO and $TRLX through a flexible or
          <br /> a locked pool.
        </p>
      </Banner>
      <div className='grid p-6 space-y-6 sm:p-10 sm:grid-cols-2'>
        <StakeCard />
      </div>
    </div>
  )
}
