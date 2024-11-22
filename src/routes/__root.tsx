import { createRootRoute, Outlet } from '@tanstack/react-router'

import React, { Suspense } from 'react'

const TanStackRouterDevTools = import.meta.env.DEV
  ? React.lazy(() =>
      import('@tanstack/router-devtools').then((res) => ({
        default: res.TanStackRouterDevtools,
      })),
    )
  : () => null

export const Route = createRootRoute({
  component: () => (
    <>
      <Outlet />
      <Suspense>
        <TanStackRouterDevTools />
      </Suspense>
    </>
  ),
})
