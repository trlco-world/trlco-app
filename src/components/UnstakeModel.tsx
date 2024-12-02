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
import { PropsWithChildren, useEffect, useState } from 'react'
import { toast } from 'sonner'
import { formatEther } from 'viem'

export default function UnstakeModel({ children }: PropsWithChildren) {
  const [open, setOpen] = useState<boolean>()
  const [amount, setAmount] = useState<string>('')
  const { refetch, unstake, isConfirming, isPending, stakes, isSuccess } =
    useTRLContract()

  async function handleUnstake() {
    if (!amount) {
      toast.warning('Cannot withdraw 0 token')
      return
    }
    try {
      await unstake(amount)
      setOpen(false)
    } catch (error) {
      console.error('Error during staking:', error)
      toast.error(`Error: ${'Failed to process your stake.'}`)
    }
  }

  function handleMaxAmount() {
    if (stakes.amount && stakes.amount > 0) {
      setAmount(formatEther(stakes.amount))
    } else {
      toast.error('Cannot withdraw 0 token')
    }
  }

  useEffect(() => {
    if (isPending || isConfirming) {
      toast.loading('Processing your transaction...', {
        id: 'loading',
        duration: Infinity,
      })
    }

    if (isSuccess) {
      toast.dismiss('loading')
      toast.success('Transaction successful!')
      refetch()
    }
  }, [isSuccess, isPending, isConfirming])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className='sm:max-w-[500px]'>
        <DialogHeader className='flex flex-col items-center gap-2'>
          <DialogTitle className='text-3xl font-semibold text-gray-700'>
            Withdraw - Fixed Term
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
                min={0}
                placeholder='0'
                className='flex-grow pl-2 text-gray-700 text-start focus:outline-none'
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <div className='w-px h-6 mx-3 bg-gray-300' />
              <button className='mr-2 text-black' onClick={handleMaxAmount}>
                MAX
              </button>
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
              ? 'Withdawing...'
              : isConfirming
                ? 'Confirming...'
                : `Withdraw`}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
