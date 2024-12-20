import { Link } from '@tanstack/react-router'
import { FaChevronRight } from 'react-icons/fa6'

export default function FaucetBanner() {
  return (
    <Link to='/faucet'>
      <div className='flex items-center justify-between p-4 border border-yellow-300 bg-yellow-50 rounded-xl'>
        <div>
          <h5 className='font-medium'>Redeem test token</h5>
          <p className='text-sm text-gray-500'>
            Test token are used during test phrase for platform experience
          </p>
        </div>
        <FaChevronRight className='w-6 h-6' />
      </div>
    </Link>
  )
}
