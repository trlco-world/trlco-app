import ToggleChain from './SwitchChainButton'
import UserButton from './UserButton'
import WalletConnect from './WalletConnect'

export default function Topbar() {
  return (
    <div className='flex items-center justify-end h-16'>
      <div className='flex gap-3'>
        <ToggleChain />
        <WalletConnect>
          <button className='py-1.5 px-4 rounded-full bg-red-500 text-white'>
            Connect Wallet
          </button>
        </WalletConnect>
        <UserButton />
      </div>
    </div>
  )
}
