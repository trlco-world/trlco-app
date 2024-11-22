import { Skeleton } from '@/components/ui/skeleton'
import { transactionHistory } from '@/data'
import { cn } from '@/lib/utils'
import { createFileRoute } from '@tanstack/react-router'
import { GoInfo } from 'react-icons/go'
import { formatEther } from 'viem'
import { useAccount, useBalance } from 'wagmi'

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
  const account = useAccount()

  const TRLCOBalance = () => {
    const { data, isLoading } = useBalance({
      address: account.address,
      token: import.meta.env.VITE_TRLCO_SC_ADDRESS,
    })

    console.log(data)

    if (isLoading || !data)
      return (
        <div className='grid gap-1'>
          <Skeleton className='w-48 h-8' />
          <Skeleton className='w-48 h-4' />
        </div>
      )

    if (data && data.value) {
      const balance = +formatEther(data.value)
      const balancePrice = balance * 0.0198263

      return (
        <div className='grid'>
          <div className='flex items-end gap-2'>
            <span className='font-medium'>$TRLCO</span>
            <span className='text-2xl'>
              {new Intl.NumberFormat().format(balance)}
            </span>
          </div>
          <span className='text-sm text-neutral-500'>
            ~ {new Intl.NumberFormat().format(balancePrice)} USD
          </span>
        </div>
      )
    }
  }

  return (
    <div className='flex flex-col gap-3 p-10 text-black bg-white rounded-3xl'>
      <h4 className='text-2xl font-semibold'>Account overview</h4>
      <div className='grid grid-cols-3 gap-6'>
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
        <div className='p-4 space-y-6 border rounded-3xl'>
          <div className='flex items-center justify-between'>
            <span className='flex items-center gap-2 text-sm text-neutral-600'>
              Total staked tokens <GoInfo />
            </span>
          </div>
          <div>
            <div className='font-medium'>
              $TRLCO <span className='text-2xl'>200,000</span>
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
