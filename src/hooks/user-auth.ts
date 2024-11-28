import { getUserFn, logoutFn } from '@/lib/api'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useLocation, useNavigate } from '@tanstack/react-router'
import { useCookies } from 'react-cookie'

export function useAuth() {
  const navigate = useNavigate()
  const location = useLocation()
  const [cookies, _, removeCookie] = useCookies(['trlco-at'])
  const authorization = cookies['trlco-at']

  const { data: user } = useQuery({
    queryKey: ['user'],
    queryFn: async () => await getUserFn(authorization),
  })

  const { mutateAsync: logout } = useMutation({
    mutationFn: async () => await logoutFn(authorization),
    onSuccess: (data) => {
      if (data.status === 200) {
        removeCookie(authorization)
        navigate({ to: '/login', search: { redirectTo: location.href } })
      }
    },
  })

  return {
    user,
    logout,
  }
}
