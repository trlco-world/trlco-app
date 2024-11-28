import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import Sidebar from '../components/Sidebar'
import { getUserFn } from '@/lib/api'
import Topbar from '@/components/Topbar'

const isAuthenticated = async () => {
  const token = document.cookie.split('=')[1]
  if (!token) return false
  const user = await getUserFn(token)
  return Boolean(user)
}

export const Route = createFileRoute('/_dashboard')({
  beforeLoad: async ({ location }) => {
    if (!(await isAuthenticated())) {
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
