import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useUser } from '@/hooks/auth/use-user'
import { CircleCheck, UserCheck, UserCircle, Wallet } from 'lucide-react'
import { PropsWithChildren, useEffect, useState } from 'react'
import { useAccount } from 'wagmi'
import { CompleteProfileModal } from './CompleteProfileModal'
import WalletConnect from './WalletConnect'
import { Link } from '@tanstack/react-router'

type Checklist = {
  key: 'wallet' | 'profile' | 'kyc'
  title: string
  description: string
  icon: React.ReactNode
  isCompleted: boolean
  Modal: React.ComponentType<{ children: React.ReactNode }>
}

export default function UserChecklist() {
  const [checklist, setChecklist] = useState<Checklist[]>([
    {
      key: 'profile',
      title: 'Setup Profile',
      description: 'Create your profile to personalize your experience',
      icon: <UserCircle className='w-6 h-6' />,
      isCompleted: false,
      Modal: CompleteProfileModal,
    },
    {
      key: 'wallet',
      title: 'Connect Wallet',
      description: 'Connect your wallet to get started',
      icon: <Wallet className='w-6 h-6' />,
      isCompleted: false,
      Modal: WalletConnect,
    },
    {
      key: 'kyc',
      title: 'Verify KYC',
      description: 'Complete your personal verification',
      icon: <UserCheck className='w-6 h-6' />,
      isCompleted: false,
      Modal: KYC,
    },
  ])
  const { data: user } = useUser()
  const { isConnected } = useAccount()

  useEffect(() => {
    setChecklist((prevChecklist) =>
      prevChecklist.map((checklist) => {
        if (user && user.is_profile_filled && checklist.key === 'profile') {
          return { ...checklist, isCompleted: true }
        }
        if (isConnected && checklist.key === 'wallet') {
          return { ...checklist, isCompleted: true }
        }
        if (user && user.kyc_status === 'APPROVED' && checklist.key === 'kyc') {
          return { ...checklist, isCompleted: true }
        }
        return checklist
      }),
    )
  }, [isConnected, user])

  const allCompleted = checklist.every((item) => item.isCompleted)

  return (
    <Card className='w-full shadow-none'>
      <CardHeader>
        <CardTitle>Complete Your Profile</CardTitle>
        <CardDescription>Complete these steps to get started</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='grid gap-6 sm:grid-cols-3'>
          {checklist.map((item) => (
            <ChecklistCard
              key={item.key}
              title={item.title}
              description={item.description}
              icon={item.icon}
              isCompleted={item.isCompleted}
              Modal={item.Modal}
            />
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <p className='text-sm font-medium'>
          {allCompleted
            ? 'All completed!'
            : `${checklist.filter((m) => m.isCompleted).length} of ${checklist.length} completed`}
        </p>
      </CardFooter>
    </Card>
  )
}

function ChecklistCard({
  title,
  description,
  icon,
  isCompleted,
  Modal,
}: Omit<Checklist, 'key'> & {
  Modal: React.ComponentType<{ children: React.ReactNode }>
}) {
  const cardContent = (
    <div className='flex items-center justify-between p-3 border rounded-xl'>
      <div className='flex flex-col'>
        <span className='text-sm font-medium'>{title}</span>
        <span className='text-xs text-neutral-500'>{description}</span>
      </div>
      {isCompleted ? <CircleCheck className='text-green-500' /> : icon}
    </div>
  )

  return isCompleted ? cardContent : <Modal>{cardContent}</Modal>
}

function KYC({ children }: PropsWithChildren) {
  return (
    <Link to='/setting' search={{ type: 'kyc' }}>
      {children}
    </Link>
  )
}
