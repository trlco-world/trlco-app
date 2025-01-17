import FaucetBanner from '@/components/FaucetBanner'
import { MembershipCard } from '@/components/MembershipCard'
import { Button } from '@/components/ui/button'
import UserChecklist from '@/components/UserChecklist'
import { useUser } from '@/hooks/auth/use-user'
import { createFileRoute } from '@tanstack/react-router'
import { useAccount } from 'wagmi'

export const Route = createFileRoute('/_dashboard/dashboard')({
  component: RouteComponent,
})

function RouteComponent() {
  const { data: user } = useUser()
  const { isConnected } = useAccount()

  return (
    <div className='space-y-6'>
      <h4 className='text-lg font-semibold sm:text-2xl'>
        Hi, {user?.name ?? user?.email}
      </h4>

      <div className='grid gap-6 sm:grid-cols-2'>
        <FaucetBanner />
        <div className='flex items-center justify-between p-4 bg-white border border-red-400 rounded-xl '>
          <div className='flex flex-col'>
            <span className='text-red-700'>Road to TGE Campaign</span>
            <span className='text-sm font-light text-neutral-600'>
              Be an Early Contributor and Earn Rewards Worth $300,000.
            </span>
          </div>
          <Button variant={'secondary'}>Participate</Button>
        </div>
      </div>
      <UserChecklist />
      {isConnected ? <MembershipCard isMobile /> : null}
    </div>
  )
}
