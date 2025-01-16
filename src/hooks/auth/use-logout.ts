import { request } from '@/lib/api'
import { useMutation } from '@tanstack/react-query'

const logoutFn = async () => {
  return await request.post('/logout')
}

export const useLogout = () =>
  useMutation({
    mutationFn: logoutFn,
  })
