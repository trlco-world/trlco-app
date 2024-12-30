import { Toaster } from '@/components/ui/sonner'
import { useIsMobile } from '@/hooks/use-mobile'
import { createRootRoute, Outlet, redirect } from '@tanstack/react-router'
// import React, { Suspense } from 'react'

// const TanStackRouterDevTools = import.meta.env.DEV
//   ? React.lazy(() =>
//       import('@tanstack/router-devtools').then((res) => ({
//         default: res.TanStackRouterDevtools,
//       })),
//     )
//   : () => null

export const Route = createRootRoute({
  beforeLoad: ({ location }) => {
    if (location.href === '/') {
      throw redirect({ to: '/dashboard' })
    }
  },
  component: RootLayout,
})

function RootLayout() {
  const isMobile = useIsMobile()
  return (
    <>
      <Outlet />
      {/* <Suspense>
        <TanStackRouterDevTools />
      </Suspense> */}
      <Toaster richColors position={isMobile ? 'top-center' : 'bottom-right'} />
    </>
  )
}
