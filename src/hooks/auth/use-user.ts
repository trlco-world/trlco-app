import { request } from '@/lib/api'
import { useQuery } from '@tanstack/react-query'

type User = {
  id: string
  name: string | null
  first_name: string | null
  last_name: string | null
  email: string
  is_active: boolean
  email_verified_at: string
  is_profile_filled: boolean
  created_at: string
}

const getUserFn = async (): Promise<User | null> => {
  const response = await request.get('/users/me')
  return response.data.data
}

export const useUser = () =>
  useQuery({
    queryKey: ['user'],
    queryFn: getUserFn,
    staleTime: Infinity,
  })
