import { useMobileMenu } from '@/hooks/use-mobile-menu'
import { useAuth } from '@/hooks/user-auth'
import { useNavigate } from '@tanstack/react-router'
import { IoChevronForward } from 'react-icons/io5'

const MobileProfileMenu = () => {
  const { user, logout } = useAuth()
  const { toggleProfile } = useMobileMenu()
  const nagivate = useNavigate()

  function onClickNagivate(to: string) {
    nagivate({ to }).then(() => toggleProfile())
  }

  return (
    <div className='flex-1 h-full p-4 space-y-3 bg-white'>
      <span className='text-sm font-light text-gray-500'>My Profile</span>
      {/* <div>
        <button onClick={() => onClickNagivate('/portfolio')}>Portfolio</button>
      </div> */}
      <div>
        <button onClick={() => onClickNagivate('/preference')}>Settings</button>
      </div>
      <hr />
      <div className='flex flex-col gap-2'>
        <span className='text-sm font-light text-gray-500'>
          log in as: {user?.email}
        </span>
        <button
          className='flex items-center justify-between font-medium'
          onClick={() => logout()}
        >
          Logout
          <IoChevronForward />
        </button>
      </div>
    </div>
  )
}

export default MobileProfileMenu
