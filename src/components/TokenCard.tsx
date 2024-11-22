import { Separator } from '@/components/ui/separator'
import { Link } from '@tanstack/react-router'

const TokenCard = ({
  tokenName,
  exploreUrl,
  flexibleApy,
  fixedApr,
}: {
  tokenImg: string
  tokenName: string
  exploreUrl: string
  flexibleApy: string
  fixedApr: string
}) => {
  return (
    <div className='p-4 space-y-3 border rounded-3xl'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          <div className='w-6 h-6 rounded-full bg-neutral-200'></div>
          <span className='font-medium'>{tokenName}</span>
        </div>
        <Link
          href={exploreUrl}
          className='px-3 py-1 text-sm text-red-500 border border-red-500 rounded-full'
        >
          Explore
        </Link>
      </div>
      <div className='flex justify-around'>
        <div className='flex flex-col text-center'>
          <span className='text-2xl font-medium'>{flexibleApy}</span>
          <span className='text-xs text-neutral-500'>Flexible APY</span>
        </div>
        <div>
          <Separator orientation='vertical' />
        </div>
        <div className='flex flex-col text-center'>
          <span className='text-2xl font-medium'>{fixedApr}</span>
          <span className='text-xs text-neutral-500'>Flexible APY</span>
        </div>
      </div>
    </div>
  )
}

export default TokenCard
