import Banner from '@/components/Banner'
import StakeCard from '@/components/StakeCard'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_dashboard/stake/')({
  component: StakePage,
})

function StakePage() {
  return (
    <div className='space-y-6'>
      <Banner>
        <h2 className='font-semibold text-white sm:text-lg'>
          Start staking to enjoy high earnings
        </h2>
        <p className='text-sm text-neutral-200'>
          Enjoy yield by staking $TRLCO and $TRLX through a flexible or
          <br /> a locked pool.
        </p>
      </Banner>
      <div className='grid space-y-6 sm:grid-cols-2'>
        <StakeCard />
      </div>
    </div>
  )
}
