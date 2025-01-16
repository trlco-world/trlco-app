import { useUser } from '@/hooks/auth/use-user'
import { useKYC } from '@/hooks/auth/user-kyc'
import { PropsWithChildren } from 'react'

export default function KYCButton({ children }: PropsWithChildren) {
  const { data: user } = useUser()
  const { data: refId } = useKYC()
  const url = new URL('https://verify-with.blockpass.org/')
  url.searchParams.append('clientId', import.meta.env.VITE_BLOCKPASS_CLIENTID)
  url.searchParams.append('refId', refId!)
  url.searchParams.append('email', user?.email!)

  return (
    <a href={url.toString()} target='_blank' rel='noopener noreferrer'>
      {children}
    </a>
  )
}
