import { MobileNav } from '@/components/mobile/MobileNav'
import MobileProfileMenu from '@/components/mobile/MobileProfileMenu'
import { MobileTopbar } from '@/components/mobile/MobileTopbar'
import Topbar from '@/components/Topbar'
import { useIsMobile } from '@/hooks/use-mobile'
import { MobileMenuProvider, useMobileMenu } from '@/hooks/use-mobile-menu'
import { getUserFn } from '@/lib/api'
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import Sidebar from '../components/Sidebar'
import { useCookies } from 'react-cookie'

const isAuthenticated = async () => {
  const token = document.cookie.split('=')[1]
  if (!token) return false
  const user = await getUserFn(token)
  return Boolean(user)
}

export const Route = createFileRoute('/_dashboard')({
  beforeLoad: async ({ location }) => {
    if (!(await isAuthenticated())) {
      const [_, __, removeCookies] = useCookies(['trlco-at'])
      removeCookies('trlco-at')
      throw redirect({
        to: '/login',
        search: {
          redirectTo: location.href,
        },
        replace: true,
      })
    }
  },
  component: RouteComponent,
})

function RouteComponent() {
  const isMobile = useIsMobile()

  if (isMobile) {
    return (
      <MobileMenuProvider>
        <div className='grid grid-rows-[auto_1fr_auto] h-dvh'>
          <MobileTopbar />
          <MobileOutlet />
          <MobileNav />
        </div>
      </MobileMenuProvider>
    )
  }

  return (
    <div className='flex h-dvh'>
      <Sidebar />
      <div className='flex-1 grid grid-rows-[auto_1fr] px-12 bg-[#f6f6f2]'>
        <Topbar />
        <div className='overflow-y-scroll'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

// This component intercept the state to display nav menu while in mobile viewport
function MobileOutlet() {
  const { isProfileOpen } = useMobileMenu()

  if (isProfileOpen) return <MobileProfileMenu />

  return (
    <div className='h-full p-6 overflow-y-scroll bg-[#F6F6F2]'>
      <Outlet />
    </div>
  )
}
