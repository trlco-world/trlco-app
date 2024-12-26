import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useAuth } from '@/hooks/user-auth'
import { Check, UserCheck, UserCircle, Wallet } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'

type Checklist = {
  id: number
  title: string
  description: string
  icon: React.ReactNode
  completed: boolean
}

export default function UserChecklist() {
  const [checklist, setChecklist] = useState<Checklist[]>([
    {
      id: 1,
      title: 'Setup Profile',
      description: 'Create your profile to personalize your experience',
      icon: <UserCircle className='w-6 h-6' />,
      completed: false,
    },
    {
      id: 2,
      title: 'Connect Wallet',
      description: 'Connect your wallet to get started',
      icon: <Wallet className='w-6 h-6' />,
      completed: false,
    },
    {
      id: 3,
      title: 'Verify KYC',
      description: 'Complete the Know Your Customer process',
      icon: <UserCheck className='w-6 h-6' />,
      completed: false,
    },
  ])

  const { user } = useAuth()
  const { isConnected } = useAccount()

  useEffect(() => {
    setChecklist((prevChecklist) =>
      prevChecklist.map((checklist) => {
        if (user && user.is_profile_filled && checklist.id === 1) {
          return { ...checklist, completed: true }
        }
        if (isConnected && checklist.id === 2) {
          return { ...checklist, completed: true }
        }
        return checklist
      }),
    )
  }, [isConnected, user])

  const allCompleted = checklist.every((item) => item.completed)

  return (
    <Card className='w-full shadow-none'>
      <CardHeader>
        <CardTitle>Complete Your Profile</CardTitle>
        <CardDescription>Complete these steps to get started</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className='grid space-y-4 sm:grid-cols-3'>
          {checklist.map((item) => (
            <li key={item.id} className='flex items-center space-x-3'>
              <Button
                variant={item.completed ? 'default' : 'outline'}
                size='icon'
                disabled={item.completed}
              >
                {item.completed ? <Check className='w-4 h-4' /> : item.icon}
              </Button>
              <div>
                <h3 className='text-sm font-medium leading-none'>
                  {item.title}
                </h3>
                <p className='text-sm text-muted-foreground'>
                  {item.description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <p className='text-sm font-medium'>
          {allCompleted
            ? 'All completed!'
            : `${checklist.filter((m) => m.completed).length} of ${checklist.length} completed`}
        </p>
      </CardFooter>
    </Card>
  )
}
