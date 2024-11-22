import { createFileRoute, Link } from '@tanstack/react-router'
import * as Tabs from '@radix-ui/react-tabs'

export const Route = createFileRoute('/_dashboard/explore')({
  component: RouteComponent,
})

const tabTriggerStyle =
  'px-6 py-3 data-[state="active"]:border-b-2 data-[state="active"]:border-red-500 data-[state="active"]:font-semibold'

const tabContentStyle = 'py-6'

function RouteComponent() {
  return (
    <div className="p-10 space-y-6 overflow-hidden bg-white rounded-3xl">
      <h4 className="text-2xl font-semibold">Properties</h4>
      <div>
        <Tabs.Root defaultValue="progress">
          <Tabs.List className="flex gap-3">
            <Tabs.Trigger value="progress" className={tabTriggerStyle}>
              In Progress
            </Tabs.Trigger>
            <Tabs.Trigger value="coming" className={tabTriggerStyle}>
              Coming Soon
            </Tabs.Trigger>
            <Tabs.Trigger value="subscribed" className={tabTriggerStyle}>
              Fully Subscribed
            </Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="progress" className={tabContentStyle}>
            <div className="flex overflow-hidden border shadow rounded-3xl">
              <div className="relative min-w-[300px]">
                <img
                  className="object-cover"
                  src="/images/carousel-placeholder.png"
                  alt=""
                />
              </div>
              <div className="flex items-center flex-1 p-6">
                <div className="flex-1 space-y-6">
                  <div className="flex items-center gap-3">
                    <span className="text-xl font-semibold">Dubai</span>
                    <span className="bg-cyan-600 text-white py-0.5 px-3 rounded-lg text-sm">
                      $TRLX1
                    </span>
                  </div>
                  <div className="grid grid-cols-3 xl:gap-3">
                    <div className="flex flex-col">
                      <span>10</span>
                      <span className="text-sm text-neutral-500">
                        No. of properties
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span>15%</span>
                      <span className="text-sm text-neutral-500">
                        Yearly investment return
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span>3,000,000 USD</span>
                      <span className="text-sm text-neutral-500">
                        Current valuation
                      </span>
                    </div>
                  </div>
                </div>
                <Link href="/explore/property">
                  <button className="block px-6 py-2 text-white bg-red-500 rounded-full">
                    Invest Now
                  </button>
                </Link>
              </div>
            </div>
          </Tabs.Content>
        </Tabs.Root>
      </div>
    </div>
  )
}
