import { Skeleton } from '@/components/ui/skeleton'
import { transactionHistory } from '@/data'
import { useTRLContract } from '@/hooks/use-contract'
import { cn } from '@/lib/utils'
import { createFileRoute } from '@tanstack/react-router'
import { GoInfo } from 'react-icons/go'
import { formatEther } from 'viem'

export const Route = createFileRoute('/_dashboard/wallet')({
  component: WalletPage,
})

interface TableHistoryProps {
  type: string
  status: 'Pending' | 'Completed' | 'Declined'
  amount: string
  wallet: string
  date: string
  txid: string
}

function WalletPage() {
  const { balance, stakes, isLoading } = useTRLContract()

  const TRLCOBalance = () => {
    if (isLoading)
      return (
        <div className='grid gap-1'>
          <Skeleton className='w-48 h-8' />
          <Skeleton className='w-48 h-4' />
        </div>
      )

    const FormattedBalance = +formatEther(balance ?? 0n)
    const balancePrice = FormattedBalance * 0.0198263

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
    const totalPrice = FormattedStakes * 0.0198263

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

  return (
    <div className='flex flex-col gap-3 p-6 text-black bg-white sm:p-10 rounded-3xl'>
      <h4 className='text-2xl font-semibold'>Account overview</h4>
      <div className='grid gap-6 sm:grid-cols-3'>
        <div className='p-4 space-y-6 border rounded-3xl'>
          <div className='flex items-center justify-between'>
            <span className='flex items-center gap-2 text-sm text-neutral-600'>
              $TRLCO Balance <GoInfo />
            </span>
            <button className='px-5 py-0.5 border border-red-500 text-red-500 rounded-full text-sm'>
              Buy $TRLCO
            </button>
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
              Total interest earned from staking
              <GoInfo />
            </span>
          </div>
          <div>
            <div className='font-medium'>
              $TRLCO <span className='text-2xl'>10,000</span>
            </div>
            <span className='text-sm text-neutral-500'>~ 50.00 USD</span>
          </div>
        </div>
      </div>
      <h4 className='text-lg font-semibold'>Transaction history</h4>
      <div className='grid grid-cols-[repeat(6,_minmax(0,_1fr)),50px] py-2 text-neutral-400'>
        <p className='flex justify-center'>Type</p>
        <p className='flex justify-center'>Status</p>
        <p className='flex justify-center'>Amount ($TRLCO)</p>
        <p className='flex justify-center'>Wallet</p>
        <p className='flex justify-center'>Date</p>
        <p className='flex justify-center'>Transaction ID</p>
        <p></p>
      </div>
      {transactionHistory.map((item, id) => (
        <TableHistory
          key={id}
          type={item.type}
          status={item.status}
          amount={item.amount}
          wallet={item.wallet}
          date={item.date}
          txid={item.txid}
        />
      ))}
    </div>
  )
}

const TableHistory = ({
  type,
  status,
  amount,
  wallet,
  date,
  txid,
}: TableHistoryProps) => (
  <div className='grid grid-cols-[repeat(6,_minmax(0,_1fr)),50px] py-4 rounded-xl border-2 border-gray-200'>
    <p className='flex justify-center'>{type}</p>
    <div className='flex justify-center'>
      <span
        className={cn(
          'px-2 rounded-sm',
          status === 'Pending'
            ? 'bg-yellow-100 text-yellow-600'
            : status === 'Completed'
              ? 'bg-emerald-100 text-emerald-600'
              : 'bg-red-100 text-red-600',
        )}
      >
        {status}
      </span>
    </div>
    <p className='flex justify-center'>{amount}</p>
    <p className='flex justify-center'>{wallet}</p>
    <p className='flex justify-center'>{date}</p>
    <p className='flex justify-center'>{txid}</p>
    <span className='flex justify-start'>
      <img src='/tx.svg' alt='tx' />
    </span>
  </div>
)
