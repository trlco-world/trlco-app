import FaucetBanner from '@/components/FaucetBanner'
import MembershipCard from '@/components/MembershipCard'
import UserChecklist from '@/components/UserChecklist'
import { useAuth } from '@/hooks/user-auth'
import { createFileRoute } from '@tanstack/react-router'
import { useAccount } from 'wagmi'

export const Route = createFileRoute('/_dashboard/dashboard')({
  component: RouteComponent,
})

function RouteComponent() {
  const { user } = useAuth()
  const { isConnected } = useAccount()

  return (
    <div className='space-y-6'>
      <h4 className='text-lg font-semibold sm:text-2xl'>
        Hi, {user?.name ?? user?.email}
      </h4>

      <div>
        <FaucetBanner />
      </div>
      <UserChecklist />
      {isConnected ? <MembershipCard isMobile /> : null}
    </div>
  )
}
