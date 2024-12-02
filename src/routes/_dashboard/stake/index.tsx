import Banner from '@/components/Banner'
import StakeCard from '@/components/StakeCard'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_dashboard/stake/')({
  component: StakePage,
})

function StakePage() {
  return (
    <div className='h-full overflow-hidden bg-white rounded-3xl'>
      <Banner>
        <h2 className='text-2xl font-semibold text-white'>
          Start staking to enjoy high earnings
        </h2>
        <p className='text-neutral-200'>
          Enjoy yield by staking $TRLCO and $TRLX through a flexible or
          <br /> a locked pool.
        </p>
      </Banner>
      <div className='grid p-10 space-y-6 sm:grid-cols-2'>
        <StakeCard />
      </div>
    </div>
  )
}
