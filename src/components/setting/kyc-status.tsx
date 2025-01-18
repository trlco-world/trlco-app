import { useUser } from '@/hooks/auth/use-user'
import { CircleCheck } from 'lucide-react'
import KycCard from '../KycCard'
import { Badge } from '../ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card'

export default function KYCStatus() {
  const { data: user } = useUser()
  const kyc_status = user?.kyc_status?.replace(/_/g, ' ')
  return (
    <Card className='max-w-md shadow-none'>
      <CardHeader>
        <CardTitle>KYC Summary</CardTitle>
        <CardDescription>
          Please complete KYC ("Know Your Customer") verification.
        </CardDescription>
      </CardHeader>
      <CardContent className='space-y-6'>
        {kyc_status ? (
          <div className='flex items-center gap-2'>
            <span className='text-sm font-medium'>Status:</span>
            <Badge variant='outline'>{kyc_status}</Badge>
          </div>
        ) : null}

        <div>
          {user?.kyc_status === 'APPROVED' ? (
            <div className='flex items-center p-3 text-sm font-medium text-green-600 border-green-400 bg-green-50 rounded-xl'>
              <CircleCheck className='w-5 h-5 mr-2' />
              <span>Your application is approved</span>
            </div>
          ) : (
            <KycCard />
          )}
          <KycCard />
        </div>
      </CardContent>
    </Card>
  )
}
