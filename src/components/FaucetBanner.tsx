import { Link } from '@tanstack/react-router'
import { Card, CardDescription, CardHeader, CardTitle } from './ui/card'
import { AlertCircleIcon } from 'lucide-react'

export default function FaucetBanner() {
  return (
    <Link to='/faucet'>
      <Card className='shadow-none'>
        <CardHeader>
          <div className='flex items-center gap-3'>
            <AlertCircleIcon className='text-red-500' />
            <div>
              <CardTitle>Redeem test token</CardTitle>
              <CardDescription>
                Test token are used during test phrase for platform experience
              </CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>
    </Link>
  )
}
