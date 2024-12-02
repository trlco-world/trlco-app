import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { DialogFooter, DialogHeader } from './ui/dialog'
import { Separator } from '@radix-ui/react-dropdown-menu'
import { formatEther } from 'viem'
import { useTRLContract } from '@/hooks/use-contract'
import { PropsWithChildren, useEffect, useState } from 'react'
import { toast } from 'sonner'

export default function ClaimModel({ children }: PropsWithChildren) {
  const [open, setOpen] = useState<boolean>()
  const { reward, isConfirming, isPending, claim, refetch, isSuccess } =
    useTRLContract()

  async function handleClaim() {
    try {
      await claim()
      setOpen(false)
    } catch (error) {
      console.error('Error during staking:', error)
      toast.error(`Error: ${'Failed to process your stake.'}`)
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
            Claim - Fixed Term
          </DialogTitle>
          <DialogDescription className='flex gap-4'></DialogDescription>
        </DialogHeader>
        <div className='space-y-8'>
          <Separator />

          <div className='space-y-4'>
            <div className='flex items-center justify-center'>
              <span className='grid font-light text-center text-gray-600'>
                Available to claim
                <span className='font-medium'>
                  {formatEther(reward ?? 0n)} TRLCO
                </span>
              </span>
            </div>
          </div>
        </div>
        <DialogFooter className='pt-6'>
          <button
            onClick={handleClaim} // Approve when allowance is insufficient
            className='bg-red-500 text-white mx-auto rounded-full p-2.5 px-10'
            disabled={isPending || isConfirming}
          >
            {isPending
              ? 'Claiming...'
              : isConfirming
                ? 'Confirming...'
                : `Claim`}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
