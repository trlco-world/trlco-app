import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import Sidebar from '../components/Sidebar'
import { getUserFn } from '@/lib/api'
import Topbar from '@/components/Topbar'

const isAuthenticated = async () => {
  try {
    const token = document.cookie.split('=')[1]
    const user = await getUserFn(token)
    return user ? true : false
  } catch (error) {
    return false
  }
}

export const Route = createFileRoute('/_dashboard')({
  beforeLoad: async ({ location }) => {
    if (!(await isAuthenticated())) {
      throw redirect({
        to: '/login',
        search: {
          redirectTo: location.href,
        },
      })
    }
  },
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className='flex h-dvh'>
      <Sidebar />
      <div className='flex-1 px-6 overflow-y-scroll'>
        <Topbar />
        <Outlet />
      </div>
    </div>
  )
}
