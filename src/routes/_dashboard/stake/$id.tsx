import BackButton from '@/components/BackButton'
import Banner from '@/components/Banner'
import MembershipCard from '@/components/MembershipCard'
import StakeCard from '@/components/StakeCard'
import { useTRLContract } from '@/hooks/use-contract'
import { createFileRoute } from '@tanstack/react-router'
import { formatEther } from 'viem'

export const Route = createFileRoute('/_dashboard/stake/$id')({
  component: StakeDetailsPage,
})

function StakeDetailsPage() {
  const { id } = Route.useParams()
  const { stakes } = useTRLContract()

  const stakedAmount = Number(formatEther(stakes.amount ?? 0n)).toFixed(2)

  return (
    <div className='overflow-hidden bg-white rounded-3xl'>
      <Banner>
        <BackButton />
        <h2 className='text-2xl font-semibold text-white'>${id}</h2>
        <p className='text-neutral-200'>
          Enjoy yield by staking ${id} through a flexible or a locked pool.
        </p>
      </Banner>
      <div className='p-10'>
        <StakeCard />
      </div>
      <div>
        <MembershipCard stakedAmount={+stakedAmount} />
      </div>
    </div>
  )
}
