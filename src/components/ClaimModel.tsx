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
import { PropsWithChildren, useState } from 'react'

export default function ClaimModel({ children }: PropsWithChildren) {
  const [open, setOpen] = useState<boolean>()
  const { reward, isConfirming, isPending, claim, refetch } = useTRLContract()

  async function handleClaim() {
    await claim()
    refetch()
    setOpen(false)
  }

  return (
    <Dialog open={open}>
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
            <div className='flex items-center justify-center text-sm'>
              <span className='font-light text-gray-600'>
                Available Limit:{' '}
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
