import MarketplaceCard, {
  MarketplaceProps,
} from '@/components/marketplace/MarketplaceCard'
import * as Tabs from '@radix-ui/react-tabs'
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

const subscribed: MarketplaceProps[] = []

export const Route = createFileRoute('/_dashboard/marketplace/')({
  component: MarketplacePage,
})

const tabTriggerStyle =
  'px-6 py-3 data-[state="active"]:border-b-2 data-[state="active"]:border-red-500 data-[state="active"]:font-semibold'

function MarketplacePage() {
  return (
    <div className='p-6 space-y-6 overflow-hidden bg-white sm:p-10 rounded-3xl'>
      <h4 className='text-lg font-semibold sm:text-2xl'>Properties</h4>
      <div>
        <Tabs.Root defaultValue='progress'>
          <Tabs.List className='flex gap-3 overflow-x-auto text-sm sm:text-base text-nowrap'>
            <Tabs.Trigger value='progress' className={tabTriggerStyle}>
              In Progress
            </Tabs.Trigger>
            <Tabs.Trigger value='coming' className={tabTriggerStyle}>
              Coming Soon
            </Tabs.Trigger>
            <Tabs.Trigger value='subscribed' className={tabTriggerStyle}>
              Fully Subscribed
            </Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value='progress'>
            <div className='grid gap-6 py-6 sm:grid-cols-4'>
              {inProgress ? (
                inProgress.map((u, i) => <MarketplaceCard key={i} {...u} />)
              ) : (
                <NoContentFound />
              )}
            </div>
          </Tabs.Content>
          <Tabs.Content value='coming'>
            <div className='grid gap-6 py-6 sm:grid-cols-4'>
              {comingSoon ? (
                comingSoon.map((u, i) => <MarketplaceCard key={i} {...u} />)
              ) : (
                <NoContentFound />
              )}
            </div>
          </Tabs.Content>
          <Tabs.Content value='subscribed'>
            {subscribed.length > 0 ? (
              <div className='grid grid-cols-4 gap-6 py-6'>
                {subscribed.map((u, i) => (
                  <MarketplaceCard key={i} {...u} />
                ))}
              </div>
            ) : (
              <NoContentFound />
            )}
          </Tabs.Content>
        </Tabs.Root>
      </div>
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
