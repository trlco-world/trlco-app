import MarketplaceCard, {
  MarketplaceProps,
} from '@/components/marketplace/MarketplaceCard'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { createFileRoute } from '@tanstack/react-router'

const inProgress: MarketplaceProps[] = [
  {
    id: 'dubai',
    name: 'Dubai',
    imgUrl: './images/dubai.jpg',
    symbol: '$TRLX1',
    properties: '10',
    tokenPrice: '50 USD',
    roi: '15%',
    valuation: '3,000,000 USD',
    tokenAvailable: '60,000',
    tokenUnavailable: '43,566',
    isLocked: false,
  },
]

const comingSoon: MarketplaceProps[] = [
  {
    id: 'kuala-lumpur',
    name: 'Kuala Lumpur',
    imgUrl: './images/kuala-lumpur.jpg',
    symbol: '$TRLX1',
    properties: '10',
    tokenPrice: '50 USD',
    roi: '15%',
    valuation: '3,000,000 USD',
    tokenAvailable: '60,000',
    tokenUnavailable: '43,566',
    isLocked: true,
  },
  {
    id: 'bali',
    name: 'Bali',
    imgUrl: './images/bali.jpg',
    symbol: '$TRLX1',
    properties: '10',
    tokenPrice: '50 USD',
    roi: '15%',
    valuation: '3,000,000 USD',
    tokenAvailable: '60,000',
    tokenUnavailable: '43,566',
    isLocked: true,
  },
]

const completed: MarketplaceProps[] = []

export const Route = createFileRoute('/_dashboard/marketplace/')({
  component: MarketplacePage,
})

function MarketplacePage() {
  return (
    <div className='space-y-6'>
      <h4 className='text-lg font-semibold sm:text-2xl'>Asset Marketplace</h4>
      <Tabs defaultValue='progress' className='space-y-6'>
        <TabsList>
          <TabsTrigger value='progress'>In Progress</TabsTrigger>
          <TabsTrigger value='coming'>Coming Soon</TabsTrigger>
          <TabsTrigger value='completed'>Completed</TabsTrigger>
        </TabsList>
        <TabsContent value='progress'>
          <div className='grid gap-6 sm:grid-cols-2 xl:grid-cols-3'>
            {inProgress ? (
              inProgress.map((u, i) => <MarketplaceCard key={i} {...u} />)
            ) : (
              <NoContentFound />
            )}
          </div>
        </TabsContent>
        <TabsContent value='coming'>
          <div className='grid gap-6 sm:grid-cols-2 xl:grid-cols-3'>
            {comingSoon ? (
              comingSoon.map((u, i) => <MarketplaceCard key={i} {...u} />)
            ) : (
              <NoContentFound />
            )}
          </div>
        </TabsContent>
        <TabsContent value='completed'>
          {completed.length > 0 ? (
            <div className='grid gap-6 sm:grid-cols-2 xl:grid-cols-3'>
              {completed.map((u, i) => (
                <MarketplaceCard key={i} {...u} />
              ))}
            </div>
          ) : (
            <NoContentFound />
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

function NoContentFound() {
  return (
    <div className='min-h-[400px] grid place-items-center p-10'>
      <div className='flex flex-col items-center justify-center space-y-6'>
        <img width={80} height={80} src='./not-found.svg' alt='not found' />
        <span className='text-[#565656] font-light'>
          You haven't subscribe to any property yet
        </span>
      </div>
    </div>
  )
}
