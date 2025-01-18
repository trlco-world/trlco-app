import { MembershipCard } from '@/components/MembershipCard'
import { Button } from '@/components/ui/button'
import UserChecklist from '@/components/UserChecklist'
import { useUser } from '@/hooks/auth/use-user'
import { createFileRoute, Link } from '@tanstack/react-router'
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
        {/* <FaucetBanner /> */}
        <Link to='/faucet'>
          <div className='grid items-center justify-between gap-3 p-5 bg-white border border-destructive sm:flex rounded-xl '>
            <div className='flex flex-col'>
              <span className='text-destructive'>
                Redeem your testnet token
              </span>
              <span className='text-sm font-light text-neutral-600'>
                Testnet token are used during testnet phase.
              </span>
            </div>
            <Button variant='destructive'>Redeem</Button>
          </div>
        </Link>
        <a href='https://rewards.taskon.xyz/quest/137369143' target='_blank'>
          <div className='grid items-center justify-between gap-3 p-5 bg-white border border-destructive sm:flex rounded-xl '>
            <div className='flex flex-col'>
              <span className='text-destructive'>Road to TGE Campaign</span>
              <span className='text-sm font-light text-neutral-600'>
                Be an Early Contributor and Earn Rewards Worth $300,000.
              </span>
            </div>
            <Button variant='destructive'>Participate</Button>
          </div>
        </a>
      </div>
      <UserChecklist />
      {isConnected ? <MembershipCard isMobile /> : null}
    </div>
  )
}
