import { useTRLContract } from '@/hooks/use-contract'
import type { WriteContractErrorType } from '@wagmi/core'
import { useState } from 'react'
import { toast } from 'sonner'

const data = {
  valuation: '3,000,000 USD',
  roi: '15%',
  tokenPrice: '50 USD',
  tokenAvailable: '60000',
  tokenUnavailable: '40000',
  userInvested: '25',
}

export default function InvestCard() {
  const [amount, setAmount] = useState<string>('')
  const { invest, isPending, isConfirming } = useTRLContract()

  async function handleInvest() {
    if (!amount || +amount <= 0)
      return toast.warning(`You can't invest 0 token`)

    toast.promise(invest(amount), {
      loading: 'Processing Investment',
      description: `Investing ${amount} of tokens into porfolio`,
      success: (data) => {
        setAmount('')
        return (
          <a
            href={`${import.meta.env.VITE_EXPLORER_LINK}/tx/${data}`}
            target='_blank'
            className='flex flex-col gap-2'
          >
            <h6>Investment Successful</h6>
            <span className='underline'>{data}</span>
          </a>
        )
      },

      error: (e: WriteContractErrorType) => {
        const errorMessage = e.message.split('\n')[0]
        return errorMessage
      },
    })
  }

  return (
    <div className='rounded-3xl overflow-clip bg-[radial-gradient(309.36%_167.4%_at_173.5%_96.42%,_#F36C24_0%,_#E96E2A_1.85%,_#D67536_4.93%,_#B67C4A_8.85%,_#868463_13.47%,_#288B7F_18.63%,_#088B82_19.12%,_#088AB5_28.13%,_#3189AF_30.43%,_#5D879F_34.24%,_#898384_39.11%,_#B97C60_44.84%,_#EF6D28_51.23%,_#F36C24_51.51%,_#EF3F36_76.99%,_#088B82_99.44%)] bg-clip-border border h-[500px] border-transparent'>
      <div className='p-6 bg-[radial-gradient(309.36%_167.4%_at_173.5%_96.42%,_#F36C24_0%,_#E96E2A_1.85%,_#D67536_4.93%,_#B67C4A_8.85%,_#868463_13.47%,_#288B7F_18.63%,_#088B82_19.12%,_#088AB5_28.13%,_#3189AF_30.43%,_#5D879F_34.24%,_#898384_39.11%,_#B97C60_44.84%,_#EF6D28_51.23%,_#F36C24_51.51%,_#EF3F36_76.99%,_#088B82_99.44%)]'>
        <div className='flex flex-col text-white'>
          <span className='text-sm font-light'>Current Valuation</span>
          <span className='text-2xl font-medium'>{data.valuation}</span>
        </div>
      </div>
      <div className='w-full h-full p-6 space-y-6 bg-white'>
        {/* Progress Card */}
        <div className='bg-[#FFF1E9] p-3 rounded-xl space-y-3'>
          <div className='flex items-center justify-between'>
            <h6 className='text-[#565656] text-sm'>
              Price per token{' '}
              <span className='font-medium text-black'>50 USD</span>
            </h6>
            <h6 className='text-[#565656] text-sm'>
              Collected: <span className='font-medium'>27.32 %</span>
            </h6>
          </div>
          {/* progress bar */}
          <div className='h-1.5 overflow-hidden bg-white rounded-full'>
            <div
              className='h-full duration-500 ease-in-out'
              style={{
                width: `27%`,
                background: `#FF4A3F`,
              }}
            ></div>
          </div>
        </div>
        <div className='space-y-3'>
          <div className='flex items-center justify-between'>
            <h6>Buy amount</h6>
            <span>
              Available: <span>2,000 USD</span>
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
            <button
              className='mr-2 text-black'
              onClick={() => setAmount('2000')}
            >
              MAX
            </button>
          </div>
          <button
            className='px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-full'
            onClick={handleInvest}
            disabled={isPending || isConfirming}
          >
            {isPending
              ? 'Processig...'
              : isConfirming
                ? 'Comfirming...'
                : 'Invest'}
          </button>
        </div>
      </div>
    </div>
  )
}
