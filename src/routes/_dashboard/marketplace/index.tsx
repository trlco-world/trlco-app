import MarketplaceCard from '@/components/marketplace/MarketplaceCard'
import * as Tabs from '@radix-ui/react-tabs'
import { createFileRoute } from '@tanstack/react-router'

const data = {
  id: '123',
  name: 'Dubai',
  imgUrl: './images/dubai.jpg',
  symbol: '$TRLX1',
  properties: '10',
  tokenPrice: '50 USD',
  roi: '15%',
  valuation: '3,000,000 USD',
  tokenAvailable: '60,000',
  tokenUnavailable: '43,566',
}

export const Route = createFileRoute('/_dashboard/marketplace/')({
  component: MarketplacePage,
})

const tabTriggerStyle =
  'px-6 py-3 data-[state="active"]:border-b-2 data-[state="active"]:border-red-500 data-[state="active"]:font-semibold'

const tabContentStyle = 'py-6 grid grid-cols-4'

function MarketplacePage() {
  return (
    <div className='p-10 space-y-6 overflow-hidden bg-white rounded-3xl'>
      <h4 className='text-2xl font-semibold'>Properties</h4>
      <div>
        <Tabs.Root defaultValue='progress'>
          <Tabs.List className='flex gap-3'>
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
          <Tabs.Content value='progress' className={tabContentStyle}>
            <MarketplaceCard {...data} />
          </Tabs.Content>
        </Tabs.Root>
      </div>
    </div>
  )
}
