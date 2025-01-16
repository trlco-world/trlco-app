import { request } from '@/lib/api'
import { useQuery } from '@tanstack/react-query'

export const userKYCFn = async (): Promise<string> => {
  const response = await request.get('/users/me/get-kyc-record')
  return response.data.refId
}

export const useKYC = () =>
  useQuery({
    queryKey: ['kyc'],
    queryFn: userKYCFn,
    staleTime: 1000 * 60 * 5,
  })
