import MembershipCard from '@/components/MembershipCard'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/test')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className='grid h-dvh place-content-center'>
      <MembershipCard membership='Basic' stakedAmount={100} isActive />
    </div>
  )
}
