import { useState } from 'react'
import { AiOutlineBell, AiOutlineUser, AiOutlineWallet } from 'react-icons/ai'
import WalletConnect from '../WalletConnect'

export const MobileTopbar = () => {
  const [openProfile, setOpenProfile] = useState<boolean>()

  return (
    <div className='h-[72px] border-b flex items-center justify-between px-4'>
      <img src='./logo.svg' width={54} height={36} alt='TRL' />
      <div className='flex items-center gap-4'>
        <WalletConnect>
          <AiOutlineWallet className='w-6 h-6' />
        </WalletConnect>
        <AiOutlineBell className='w-6 h-6' />
        <AiOutlineUser className='w-6 h-6' />
      </div>
    </div>
  )
}
