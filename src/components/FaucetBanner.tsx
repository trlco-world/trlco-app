import { Link } from '@tanstack/react-router'
import { Button } from './ui/button'
import { Card, CardDescription, CardHeader, CardTitle } from './ui/card'

export default function FaucetBanner() {
  return (
    <Link to='/faucet'>
      <Card className='transition-all ease-in-out shadow-none hover:border hover:border-red-400 hover:bg-red-50'>
        <CardHeader>
          <div className='flex items-center justify-between'>
            <div className='space-y-2'>
              <CardTitle>Redeem Your Testnet Token</CardTitle>
              <CardDescription>
                Testnet token are used during testnet phase.
              </CardDescription>
            </div>
            <Button>Redeem</Button>
          </div>
        </CardHeader>
      </Card>
    </Link>
  )
}
