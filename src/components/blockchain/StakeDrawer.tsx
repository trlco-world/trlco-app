import { useTRLContract } from '@/hooks/use-contract'
import React from 'react'
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
import { toast } from 'sonner'

export default function StakeDrawer({ children }: React.PropsWithChildren) {
  const [amount, setAmount] = React.useState('')
  const [open, setOpen] = React.useState<boolean>()

  const ct = useTRLContract()

  const allowance = formatEther(ct.allowance ?? 0n)
  const balance = formatEther(ct.balance ?? 0n)

  const handleApprove = async () => {
    try {
      if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
        toast.warning('Please enter a valid amount to stake.')
        return
      }

      await ct.approve(amount)
    } catch (e) {
      toast.dismiss('loading')
      const error = e as WriteContractErrorType
      const errorMessage = error.message.split('\n')[0]
      return toast.error(errorMessage)
    }
  }

  async function handleStake() {
    if (!amount || isNaN(Number(amount))) {
      return toast.warning('Please enter a valid amount to stake.')
    }
    try {
      await ct.stake(amount).then(() => {
        setOpen(false)
        setAmount('')
      })
    } catch (e) {
      toast.dismiss('loading')
      const error = e as WriteContractErrorType
      const errorMessage = error.message.split('\n')[0]
      return toast.error(errorMessage)
    }
  }

  function handleMaxAmount() {
    if (ct.stakes.amount && ct.stakes.amount > 0) {
      setAmount(balance)
    } else {
      toast.error('Cannot stake 0 token')
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
            <DrawerTitle>Stake</DrawerTitle>
            <DrawerDescription>
              If you do not have sufficient stake limit, you will need to
              approve your limit before you stake.
            </DrawerDescription>
          </DrawerHeader>
          <div className='p-4 space-y-6'>
            <div className='flex justify-between'>
              <span>Approved Limit:</span>
              <span>{allowance}</span>
            </div>
            <div className='flex justify-between'>
              <span>Balance:</span>
              <span>
                {balance.length > 25 ? Number(balance).toFixed(4) : balance}
              </span>
            </div>
            <div className='flex items-center w-full gap-3'>
              <span>Stake:</span>
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
            {Number(allowance) >= Number(amount) ? (
              <Button
                onClick={handleStake}
                disabled={ct.isPending || ct.isConfirming}
              >
                {ct.isPending
                  ? 'Staking...'
                  : ct.isConfirming
                    ? 'Confirming...'
                    : `Stake`}
              </Button>
            ) : (
              <Button
                onClick={handleApprove}
                disabled={ct.isPending || ct.isConfirming}
              >
                {ct.isPending
                  ? 'Approving...'
                  : ct.isConfirming
                    ? 'Confirming...'
                    : `Approve`}
              </Button>
            )}
            <DrawerClose asChild>
              <Button variant='outline'>Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
