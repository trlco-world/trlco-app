import { Link } from '@tanstack/react-router'
import { CircleAlert } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from './ui/alert'

export default function FaucetBanner() {
  return (
    <Link to='/faucet'>
      <Alert>
        <CircleAlert className='w-4 h-4' />
        <AlertTitle>Redeem test token</AlertTitle>
        <AlertDescription>
          Test token are used during test phrase for platform experience
        </AlertDescription>
      </Alert>
    </Link>
  )
}
