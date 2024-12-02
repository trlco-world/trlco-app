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
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { formatEther } from 'viem'
import type { WriteContractErrorType } from '@wagmi/core'

export default function StakeModal({ children }: React.PropsWithChildren) {
  // const [month, setMonth] = useState(1) // Single duration value
  const [amount, setAmount] = useState('') // Input amount
  const [open, setOpen] = useState<boolean>()

  const {
    stake,
    balance,
    approve,
    refetch,
    isConfirming,
    isPending,
    allowance,
    isSuccess,
  } = useTRLContract()

  const handleApprove = async () => {
    try {
      if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
        toast.warning('Please enter a valid amount to stake.')
        return
      }
      // Proceed with Approving amount
      await approve(amount)
    } catch (e) {
      toast.dismiss('loading')
      const error = e as WriteContractErrorType
      const errorMessage = error.message.split('\n')[0]
      return toast.error(errorMessage)
    }
  }

  async function handleStake() {
    try {
      if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
        toast.warning('Please enter a valid amount to stake.')
        return
      }
      // Proceed with staking
      await stake(amount).then(() => setOpen(false))
    } catch (e) {
      toast.dismiss('loading')
      const error = e as WriteContractErrorType
      const errorMessage = error.message.split('\n')[0]
      return toast.error(errorMessage)
    }
  }

  function handleMaxAmount() {
    if (balance && balance > 0) {
      setAmount(formatEther(balance))
    } else {
      toast.error('Cannot stake 0 token')
    }
  }

  // effect for all transaction
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
            Stake - Fixed Term
          </DialogTitle>
          <DialogDescription className='flex gap-4'></DialogDescription>
        </DialogHeader>
        <div className='space-y-8'>
          <Separator />

          <div className='space-y-4'>
            <div className='flex items-center justify-between text-sm'>
              <span className='font-medium text-gray-600'>Amount</span>
              <span className='font-light text-gray-600'>
                Available Limit:{' '}
                <span className='font-medium'>
                  {formatEther(allowance! ?? 0)} TRLCO
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

          {/* <div className='space-y-4'>
            <div>
              <div className='flex items-center justify-between text-sm'>
                <div className='font-medium text-gray-600'>Duration</div>
                <span className='font-light text-gray-600'>
                  Period: <span className='font-medium'>{month} month(s)</span>
                </span>
              </div>
            </div>
            <Slider
              defaultValue={[month]}
              max={12}
              step={1}
              className='w-full'
              onValueChange={handleChangeMonth}
            />
            <div className='grid w-full grid-cols-5 text-sm font-medium place-items-center'>
              {['1 month', '3 month', '6 month', '9 month', '12 month'].map(
                (label, index) => (
                  <div key={index}>{label}</div>
                ),
              )}
            </div>
          </div> */}
        </div>
        <DialogFooter className='pt-6'>
          {allowance && Number(formatEther(allowance)) >= Number(amount) ? (
            // Show Stake Button
            <button
              onClick={handleStake} // Stake when allowance is sufficient
              className='bg-red-500 text-white mx-auto rounded-full p-2.5 px-10'
              disabled={isPending || isConfirming}
            >
              {isPending
                ? 'Staking...'
                : isConfirming
                  ? 'Confirming...'
                  : `Stake`}
            </button>
          ) : (
            // Show Approve Button
            <button
              onClick={handleApprove} // Approve when allowance is insufficient
              className='bg-red-500 text-white mx-auto rounded-full p-2.5 px-10'
              disabled={isPending || isConfirming}
            >
              {isPending
                ? 'Approving...'
                : isConfirming
                  ? 'Confirming...'
                  : `Approve`}
            </button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
