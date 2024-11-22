import BackButton from '@/components/BackButton'
import Banner from '@/components/Banner'
import MembershipCard from '@/components/MembershipCard'
import StakeCard from '@/components/StakeCard'
import { createFileRoute } from '@tanstack/react-router'
import { formatEther } from 'viem'
import { useAccount, useReadContract } from 'wagmi'

export const Route = createFileRoute('/_dashboard/stake/$id')({
  component: StakeDetailsPage,
})

function StakeDetailsPage() {
  const { id } = Route.useParams()
  const { address } = useAccount()
  const { data: stakes } = useReadContract({
    address: import.meta.env.VITE_FIXED_STAKING_SC_ADDRESS,
    abi: [
      {
        inputs: [
          {
            internalType: 'address',
            name: '',
            type: 'address',
          },
        ],
        name: 'stakes',
        outputs: [
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'rewardDebt',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'lastClaimed',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
    ],
    functionName: 'stakes',
    args: [address!],
  })

  const stakedAmount = Number(formatEther(stakes?.[0]! ?? 0)).toFixed(2)
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
        <StakeCard stakes={stakedAmount} />
      </div>
      <div>
        <MembershipCard stakedAmount={+stakedAmount} />
      </div>
    </div>
  )
}
