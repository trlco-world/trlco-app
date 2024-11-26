import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { useTRLContract } from '@/hooks/use-contract'
import { PropsWithChildren, useState } from 'react'
import { formatEther } from 'viem'

export default function UnstakeModel({ children }: PropsWithChildren) {
  const [open, setOpen] = useState<boolean>()
  const [amount, setAmount] = useState<string>('')
  const { refetch, unstake, isConfirming, isPending, stakes } = useTRLContract()

  async function handleUnstake() {
    await unstake(amount).then(() => refetch())
    setOpen(false)
  }

  return (
    <Dialog open={open}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className='sm:max-w-[500px]'>
        <DialogHeader className='flex flex-col items-center gap-2'>
          <DialogTitle className='text-3xl font-semibold text-gray-700'>
            Un-stake - Fixed Term
          </DialogTitle>
          <DialogDescription className='flex gap-4'></DialogDescription>
        </DialogHeader>
        <div className='space-y-8'>
          <Separator />

          <div className='space-y-4'>
            <div className='flex items-center justify-between text-sm'>
              <span className='font-medium text-gray-600'>Amount</span>
              <span className='font-light text-gray-600'>
                Staked Token:{' '}
                <span className='font-medium'>
                  {formatEther(stakes.amount ?? 0n)} TRLCO
                </span>
              </span>
            </div>
            <div className='flex items-center border border-gray-300 rounded-full p-2.5'>
              <span className='mr-auto text-gray-800'>TRLCO</span>
              <input
                type='number'
                placeholder='0'
                className='flex-grow pl-2 text-gray-700 text-start focus:outline-none'
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <div className='w-px h-6 mx-3 bg-gray-300' />
              <span className='mr-2 text-gray-500'>0.00 USD</span>
            </div>
          </div>
        </div>
        <DialogFooter className='pt-6'>
          <button
            onClick={handleUnstake} // Stake when allowance is sufficient
            className='bg-red-500 text-white mx-auto rounded-full p-2.5 px-10'
            disabled={isPending || isConfirming}
          >
            {isPending
              ? 'Un-staking...'
              : isConfirming
                ? 'Confirming...'
                : `Un-stake`}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
