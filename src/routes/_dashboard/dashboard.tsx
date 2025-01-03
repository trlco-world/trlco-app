import FaucetBanner from '@/components/FaucetBanner'
import MembershipCard from '@/components/MembershipCard'
import UserChecklist from '@/components/UserChecklist'
import { useTRLContract } from '@/hooks/use-contract'
import { createFileRoute } from '@tanstack/react-router'
import { useAccount } from 'wagmi'

export const Route = createFileRoute('/_dashboard/dashboard')({
  component: RouteComponent,
})

function RouteComponent() {
  const bc = useTRLContract()
  const { isConnected } = useAccount()

  return (
    <div className='space-y-6'>
      <FaucetBanner />

      {/* steps card */}
      <UserChecklist />

      {isConnected ? <MembershipCard isMobile /> : null}
    </div>
  )
}
