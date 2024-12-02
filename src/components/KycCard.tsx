import { accountVerify } from '@/assets/svg'
import { IoChevronForward } from 'react-icons/io5'
import KYCConnect from './KYCConnect'

export default function KycCard() {
  return (
    <KYCConnect>
      <div className='flex items-center gap-3 bg-[#E3F8FF] border border-[#91AFC6] p-3 rounded-2xl cursor-pointer'>
        <img src={accountVerify} alt='KYC' />
        <div className='flex flex-col flex-1 text-sm'>
          <span className='font-medium text-[#17271F]'>
            Your eKYC not verified yet
          </span>
          <span className='font-light text-[#565656]'>
            Complete eKYC process to start invest.
          </span>
        </div>
        <IoChevronForward />
      </div>
    </KYCConnect>
  )
}
