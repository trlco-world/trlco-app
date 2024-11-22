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
import { useState } from 'react'
import { erc20Abi, parseEther } from 'viem'
import {
  useAccount,
  useReadContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from 'wagmi'
import { Slider } from './Slider'

const stakingContractAddress = import.meta.env.VITE_FIXED_STAKING_SC_ADDRESS
const stakingTokenAddress = import.meta.env.VITE_TRLCO_SC_ADDRESS

export default function StakeModal({ children }: React.PropsWithChildren) {
  const [month, setMonth] = useState(1) // Single duration value
  const [amount, setAmount] = useState('') // Input amount

  const { data: hash, isPending, writeContractAsync } = useWriteContract()

  const { address } = useAccount()

  const { data: allowance } = useReadContract({
    address: stakingTokenAddress,
    abi: erc20Abi,
    functionName: 'allowance',
    args: [address!, stakingContractAddress],
  })

  const handleApprovalAndStake = async () => {
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      alert('Please enter a valid amount to stake.')
      return
    }

    const adjustedAmount = parseEther(amount)

    try {
      // Check if allowance is sufficient before approval
      if (allowance! < adjustedAmount) {
        await writeContractAsync({
          address: stakingTokenAddress,
          abi: erc20Abi,
          functionName: 'approve',
          args: [stakingContractAddress, adjustedAmount],
        })
      }

      // Proceed with staking
      await writeContractAsync({
        address: stakingContractAddress,
        abi: [
          {
            inputs: [
              { internalType: 'uint256', name: '_amount', type: 'uint256' },
            ],
            name: 'stake',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
          },
        ],
        functionName: 'stake',
        args: [adjustedAmount],
      })

      alert('Stake successful!')
    } catch (error) {
      console.error('Error during staking:', error)
      alert(`Error: ${error || 'Failed to process your stake.'}`)
    }
  }

  const { isLoading: isConfirming } = useWaitForTransactionReceipt({
    hash,
  })

  const handleChangeMonth = (value: number[]) => {
    if (value.length > 0) setMonth(value[0]) // Ensure single value
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className='sm:max-w-[500px]'>
        <DialogHeader className='flex flex-col items-center gap-2'>
          <DialogTitle className='text-3xl font-semibold text-gray-700'>
            Stake - Fixed Term
          </DialogTitle>
          <DialogDescription className='flex gap-4'>
            <div className='flex items-center gap-2'>
              <div className='w-6 h-6 rounded-full bg-neutral-200'></div>
              <span className='font-medium text-neutral-900'>$TRLCO Pool</span>
            </div>
            <div className='flex items-center gap-2 font-light text-gray-600'>
              30-day APY{' '}
              <span className='font-medium text-neutral-900'>30%</span>
            </div>
          </DialogDescription>
        </DialogHeader>
        <div className='space-y-8'>
          <Separator />
          <div className='space-y-4'>
            <div className='flex items-center justify-between text-sm'>
              <span className='font-medium text-gray-600'>Amount</span>
              <span className='font-light text-gray-600'>
                Available: <span className='font-medium'>1200 TRLCO</span>
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
          <div className='space-y-4'>
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
          </div>
        </div>
        <DialogFooter className='pt-6'>
          <button
            onClick={handleApprovalAndStake}
            className='bg-red-500 text-white mx-auto rounded-full p-2.5 px-10'
            disabled={isPending || isConfirming}
          >
            {isPending
              ? 'Staking...'
              : isConfirming
                ? 'Confirming...'
                : 'Stake'}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
