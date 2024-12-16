import { AiOutlineBell, AiOutlineUser, AiOutlineWallet } from 'react-icons/ai'
import WalletConnect from '../WalletConnect'
import { useMobileMenu } from '@/hooks/use-mobile-menu'

export const MobileTopbar = () => {
  const { toggleProfile } = useMobileMenu()

  return (
    <div className='h-[72px] border-b flex items-center justify-between px-4'>
      <img src='./logo.svg' width={54} height={36} alt='TRL' />
      <div className='flex items-center gap-4'>
        <WalletConnect>
          <button>
            <AiOutlineWallet className='w-6 h-6' />
          </button>
        </WalletConnect>
        <AiOutlineBell className='w-6 h-6' />
        <button onClick={toggleProfile}>
          <AiOutlineUser className='w-6 h-6' />
        </button>
      </div>
    </div>
  )
}
