import { AiOutlineBell, AiOutlineUser, AiOutlineWallet } from 'react-icons/ai'

export const MobileTopbar = () => {
  return (
    <div className='h-[72px] border-b flex items-center justify-between px-4'>
      <img src='./logo.svg' width={54} height={36} alt='TRL' />
      <div className='flex gap-4'>
        <AiOutlineWallet className='w-6 h-6' />
        <AiOutlineBell className='w-6 h-6' />
        <AiOutlineUser className='w-6 h-6' />
      </div>
    </div>
  )
}
