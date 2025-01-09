import { createFileRoute, redirect, useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { z } from 'zod'

export const Route = createFileRoute('/_auth/auth')({
  validateSearch: z.object({
    token: z.string(),
  }),
  beforeLoad(ctx) {
    if (!ctx.search.token) {
      throw redirect({ to: '/login' })
    }
  },
  component: AuthPage,
})

function AuthPage() {
  const [cookie, setCookie, removeCookie] = useCookies(['trlco-at'])
  const { token } = Route.useSearch()
  const navigate = useNavigate()

  useEffect(() => {
    if (cookie['trlco-at']) {
      removeCookie('trlco-at')
    }
    if (token) {
      setCookie('trlco-at', token, {
        secure: import.meta.env.PROD,
        sameSite: import.meta.env.PROD ? 'strict' : 'lax',
        maxAge: 24 * 60 * 60,
        path: '/',
      })
      navigate({ to: '/dashboard' })
    }
  }, [])

  return 'SSO callback'
}
