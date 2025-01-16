import { useMobileMenu } from '@/hooks/use-mobile-menu'
import { CircleUserRound, Wallet } from 'lucide-react'
import WalletConnect from '../WalletConnect'
import { Link } from '@tanstack/react-router'

export const MobileTopbar = () => {
  const { toggleProfile } = useMobileMenu()

  return (
    <div className='h-[60px] border-b flex items-center justify-between px-4'>
      <Link to='/dashboard'>
        <img src='./logo.svg' className='w-12 h-auto' alt='TRL' />
      </Link>
      <div className='flex items-center gap-3'>
        <WalletConnect>
          <button>
            <Wallet className='w-6 h-6' />
          </button>
        </WalletConnect>
        <button onClick={toggleProfile}>
          <CircleUserRound className='w-6 h-6' />
        </button>
      </div>
    </div>
  )
}
