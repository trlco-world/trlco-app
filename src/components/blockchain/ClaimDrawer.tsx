import React from 'react'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '../ui/drawer'
import { useTRLContract } from '@/hooks/use-contract'
import { toast } from 'sonner'
import { formatEther } from 'viem'
import { Button } from '../ui/button'

export default function ClaimDrawer({ children }: React.PropsWithChildren) {
  const [open, setOpen] = React.useState<boolean>()
  const ct = useTRLContract()

  const unclaimedReward = formatEther(ct.reward ?? 0n)

  async function handleClaim() {
    try {
      await ct.claim()
      setOpen(false)
    } catch (error) {
      console.error('Error during staking:', error)
      toast.error(`Error: ${'Failed to process your stake.'}`)
    }
  }

  React.useEffect(() => {
    if (ct.isPending || ct.isConfirming) {
      toast.loading('Processing your transaction...', {
        id: 'loading',
        duration: Infinity,
      })
    }

    if (ct.isSuccess) {
      toast.dismiss('loading')
      toast.success('Transaction successful!')
      ct.refetch()
    }
  }, [ct.isSuccess, ct.isPending, ct.isConfirming])

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent>
        <div className='w-full max-w-sm mx-auto'>
          <DrawerHeader>
            <DrawerTitle>Claim</DrawerTitle>
            <DrawerDescription>
              Rewards are calculated every seconds. Each claim will cost you gas
              fee.
            </DrawerDescription>
          </DrawerHeader>
          <div className='p-4 space-y-6'>
            <div className='flex justify-between'>
              <span> Unclaimed Reward:</span>
              <span>
                {unclaimedReward.length > 25
                  ? Number(unclaimedReward).toFixed(8)
                  : unclaimedReward}
              </span>
            </div>
          </div>
          <DrawerFooter>
            <Button
              onClick={handleClaim}
              disabled={ct.isPending || ct.isConfirming}
            >
              {ct.isPending
                ? 'Claiming...'
                : ct.isConfirming
                  ? 'Confirming...'
                  : `Claim`}
            </Button>
            <DrawerClose asChild>
              <Button variant='outline'>Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
