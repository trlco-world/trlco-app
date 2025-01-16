import { request } from '@/lib/api'
import { useMutation } from '@tanstack/react-query'

const updateProfileFn = async (first_name: string, last_name: string) => {
  return await request.post('/users/me/update', {
    first_name,
    last_name,
  })
}

export const useUpdateProfile = () =>
  useMutation({
    mutationFn: (variables: { first_name: string; last_name: string }) =>
      updateProfileFn(variables.first_name, variables.last_name),
  })
