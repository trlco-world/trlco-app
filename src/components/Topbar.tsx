import { useAccount } from 'wagmi'
// import ToggleChain from './SwitchChainButton'
import UserButton from './UserButton'
import WalletConnect from './WalletConnect'
import { Wallet } from 'lucide-react'

export default function Topbar() {
  const { isConnected, address } = useAccount()
  return (
    <div className='flex items-center justify-end h-16'>
      <div className='flex gap-3'>
        {/* <ToggleChain /> */}
        <WalletConnect>
          {isConnected ? (
            <button className='py-1.5 px-4 rounded-xl border border-red-500 flex items-center bg-white'>
              <Wallet className='w-4 h-4 mr-2' />
              <span className='text-sm font-medium text-red-500'>{`0x...${address?.slice(-4)}`}</span>
            </button>
          ) : (
            <button className='py-1.5 px-4 rounded-xl bg-red-500 text-white'>
              Connect Wallet
            </button>
          )}
        </WalletConnect>
        <UserButton />
      </div>
    </div>
  )
}
