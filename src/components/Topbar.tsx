import UserButton from './UserButton'
import WalletConnect from './WalletConnect'

export default function Topbar() {
  return (
    <div className='flex items-center justify-end h-16'>
      <div className='flex gap-3'>
        <WalletConnect />
        <UserButton />
      </div>
    </div>
  )
}
