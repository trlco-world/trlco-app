import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { useTRLContract } from '@/hooks/use-contract'
import { createFileRoute, Link } from '@tanstack/react-router'
import { GoInfo } from 'react-icons/go'
import { formatEther } from 'viem'

export const Route = createFileRoute('/_dashboard/wallet')({
  component: WalletPage,
})

const tokenPrice = 0

function WalletPage() {
  const { balance, stakes, isLoading, reward } = useTRLContract()

  const TRLCOBalance = () => {
    if (isLoading)
      return (
        <div className='grid gap-1'>
          <Skeleton className='w-48 h-8' />
          <Skeleton className='w-48 h-4' />
        </div>
      )

    const FormattedBalance = +formatEther(balance ?? 0n)
    const balancePrice = FormattedBalance * tokenPrice

    return (
      <div className='grid'>
        <div className='flex items-end gap-2'>
          <span className='font-medium'>$TRLCO</span>
          <span className='text-2xl'>
            {new Intl.NumberFormat().format(FormattedBalance)}
          </span>
        </div>
        <span className='text-sm text-neutral-500'>
          ~ {new Intl.NumberFormat().format(balancePrice)} USD
        </span>
      </div>
    )
  }

  const TRLCOStakes = () => {
    if (isLoading)
      return (
        <div className='grid gap-1'>
          <Skeleton className='w-48 h-8' />
          <Skeleton className='w-48 h-4' />
        </div>
      )

    const FormattedStakes = +formatEther(stakes.amount ?? 0n)
    const totalPrice = FormattedStakes * tokenPrice

    return (
      <div className='grid'>
        <div className='flex items-end gap-2'>
          <span className='font-medium'>$TRLCO</span>
          <span className='text-2xl'>
            {new Intl.NumberFormat().format(FormattedStakes)}
          </span>
        </div>
        <span className='text-sm text-neutral-500'>
          ~ {new Intl.NumberFormat().format(totalPrice)} USD
        </span>
      </div>
    )
  }

  const UnclaimedReward = () => {
    if (isLoading)
      return (
        <div className='grid gap-1'>
          <Skeleton className='w-48 h-8' />
          <Skeleton className='w-48 h-4' />
        </div>
      )

    const FormattedUnclaimedReward = +formatEther(reward ?? 0n)
    const totalPrice = FormattedUnclaimedReward * tokenPrice

    return (
      <div className='grid'>
        <div className='flex items-end gap-2'>
          <span className='font-medium'>$TRLCO</span>
          <span className='text-2xl'>
            {new Intl.NumberFormat().format(FormattedUnclaimedReward)}
          </span>
        </div>
        <span className='text-sm text-neutral-500'>
          ~ {new Intl.NumberFormat().format(totalPrice)} USD
        </span>
      </div>
    )
  }

  return (
    <div className='space-y-6'>
      <h4 className='text-xl font-semibold sm:text-2xl'>My Wallet</h4>
      <div className='flex flex-col gap-6 p-6 text-black bg-white sm:p-10 rounded-3xl'>
        <div className='flex items-center justify-between'>
          <h5 className='text-2xl font-semibold'>$TRLCO</h5>
          <div className='space-x-2'>
            <Button size='sm'>
              <Link to='/stake/$stakeId' params={{ stakeId: 'fixed-staking' }}>
                Stake
              </Link>
            </Button>
            <Button size='sm'>
              <Link to='/swap'>Swap</Link>
            </Button>
            <Button size='sm' disabled>
              <Link to='.'>Buy</Link>
            </Button>
          </div>
        </div>
        <div className='grid gap-6 sm:grid-cols-3'>
          <div className='p-4 space-y-6 border rounded-3xl'>
            <div className='flex items-center justify-between'>
              <span className='flex items-center gap-2 text-sm text-neutral-600'>
                Balance <GoInfo />
              </span>
            </div>
            <div>
              <TRLCOBalance />
            </div>
          </div>
          <div className='p-4 space-y-6 border rounded-3xl'>
            <div className='flex items-center justify-between'>
              <span className='flex items-center gap-2 text-sm text-neutral-600'>
                Total staked tokens <GoInfo />
              </span>
            </div>
            <div>
              <TRLCOStakes />
            </div>
          </div>
          <div className='p-4 space-y-6 border rounded-3xl'>
            <div className='flex items-center justify-between'>
              <span className='flex items-center gap-2 text-sm text-neutral-600'>
                Total Unclaimed Reward <GoInfo />
              </span>
            </div>
            <div>
              <UnclaimedReward />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
