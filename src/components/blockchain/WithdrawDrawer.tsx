import { useTRLContract } from '@/hooks/use-contract'
import React from 'react'
import { toast } from 'sonner'
import { formatEther, WriteContractErrorType } from 'viem'
import { Button } from '../ui/button'
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

export default function WithdrawDrawer({ children }: React.PropsWithChildren) {
  const [open, setOpen] = React.useState<boolean>()
  const [amount, setAmount] = React.useState<string>('')

  const ct = useTRLContract()
  const maxAmount = formatEther(ct.stakes.amount ?? 0n)

  async function handleWithdraw() {
    if (!amount) {
      return toast.warning('Cannot withdraw 0 token')
    }

    if (+amount > +maxAmount) {
      return toast.warning(`Cannot withdraw more than ${maxAmount}`)
    }

    try {
      await ct.unstake(amount)
      setOpen(false)
    } catch (e) {
      toast.dismiss('loading')
      const error = e as WriteContractErrorType
      const errorMessage = error.message.split('\n')[0]
      return toast.error(errorMessage)
    }
  }
  function handleMaxAmount() {
    if (ct.stakes.amount && ct.stakes.amount > 0) {
      setAmount(maxAmount)
    } else {
      toast.error('Cannot withdraw 0 token')
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
            <DrawerTitle>Withdraw</DrawerTitle>
            <DrawerDescription>
              Withdrawing with affect your membership tier, and you will
              received rewards from your current multiplier.
            </DrawerDescription>
          </DrawerHeader>
          <div className='p-4 space-y-6'>
            <div className='flex justify-between'>
              <span>Staked Amount:</span>
              <span>{maxAmount}</span>
            </div>
            <div className='flex items-center w-full gap-3'>
              <span>Withdraw:</span>
              <input
                min={0}
                placeholder='0'
                className='flex-1 font-medium rounded text-end focus:outline-none'
                value={amount}
                onChange={(e) => {
                  const value = e.target.value
                  setAmount(value)
                }}
              />
              <Button size='sm' variant='outline' onClick={handleMaxAmount}>
                Max
              </Button>
            </div>
          </div>
          <DrawerFooter>
            <Button
              onClick={handleWithdraw}
              disabled={ct.isPending || ct.isConfirming}
            >
              {ct.isPending
                ? 'Withdawing...'
                : ct.isConfirming
                  ? 'Confirming...'
                  : `Withdraw`}
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
