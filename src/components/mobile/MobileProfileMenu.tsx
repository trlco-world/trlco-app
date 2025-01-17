import { useLogout } from '@/hooks/auth/use-logout'
import { useUser } from '@/hooks/auth/use-user'
import { useMobileMenu } from '@/hooks/use-mobile-menu'
import { useNavigate } from '@tanstack/react-router'
import { useCookies } from 'react-cookie'
import { IoChevronForward } from 'react-icons/io5'
import SocialMedia from '../social-media'

const MobileProfileMenu = () => {
  const { mutateAsync: logout } = useLogout()
  const { data: user } = useUser()
  const { toggleProfile } = useMobileMenu()
  const navigate = useNavigate()
  const [_, __, removeCookie] = useCookies(['trlco-at'])

  function onClickNagivate(to: string) {
    navigate({ to }).then(() => toggleProfile())
  }

  function onClickLogout() {
    logout().then(() => {
      removeCookie('trlco-at')
      navigate({ to: '/login' })
    })
  }

  return (
    <div className='flex flex-col flex-1 h-full p-4 space-y-3 bg-white'>
      <span className='text-sm font-light text-gray-500'>My Profile</span>
      {/* <div>
        <button onClick={() => onClickNagivate('/portfolio')}>Portfolio</button>
      </div> */}
      <div>
        <button onClick={() => onClickNagivate('/setting')}>Settings</button>
      </div>
      <hr />
      <div className='flex flex-col flex-1 gap-2'>
        <span className='text-sm font-light text-gray-500'>
          log in as: {user?.email}
        </span>
        <button
          className='flex items-center justify-between font-medium'
          onClick={onClickLogout}
        >
          Logout
          <IoChevronForward />
        </button>
      </div>
      <div>
        <SocialMedia />
      </div>
    </div>
  )
}

export default MobileProfileMenu
