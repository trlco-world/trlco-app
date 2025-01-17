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
  return (
    <Card className='max-w-md shadow-none'>
      <CardHeader>
        <CardTitle>KYC Summary</CardTitle>
        <CardDescription>
          Please complete KYC ("Know Your Customer") verification.
        </CardDescription>
      </CardHeader>
      <CardContent className='space-y-6'>
        <div className='flex items-center gap-2'>
          <span className='text-sm font-medium'>Status:</span>
          <Badge variant='outline'>Not KYC</Badge>
        </div>
        <div>
          <KycCard />
        </div>
      </CardContent>
    </Card>
  )
}
