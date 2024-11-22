import Banner from '@/components/Banner'
import { RedeemDropdown } from '@/components/RedeemDropdown'
import { portfolioData } from '@/data'
import { cn } from '@/lib/utils'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_dashboard/portfolio')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      <div className="overflow-hidden text-black bg-white rounded-3xl">
        <Banner>
          <div className="flex items-center justify-between">
            <div className="space-y-3">
              <h2 className="text-2xl font-semibold text-white">
                My portfolio
              </h2>
              <p className="font-light text-neutral-100">
                Manage your portfolio with ease with our portfolio management
                dashboard. <br /> Track earnings, status of properties, capital
                appreciation and unrealized gains.
              </p>
            </div>
            <div className="bg-white rounded-3xl w-[18rem] p-4 flex flex-col gap-4 h-fit">
              <span>
                <p>Portflio value</p>
              </span>
              <div className="flex flex-col gap-1">
                <span className="flex items-end gap-2">
                  <p className="text-2xl font-semibold">45,000</p>
                  <p>USD</p>
                </span>
                <span className="flex gap-2 py-2 px-3 bg-[#FFF1E9] text-[#FF4A3F] w-fit rounded-3xl">
                  <img src="/house.svg" alt="" />
                  <p>30 properties</p>
                </span>
              </div>
            </div>
          </div>
        </Banner>

        <div className="p-8">
          <div>
            <h1 className="font-semibold">Key Insights</h1>
            <div className="flex w-full gap-8 mt-3">
              <div className="flex flex-col p-4 border border-neutral-300 rounded-3xl">
                <span className="flex items-center gap-8">
                  <p className="text-neutral-500">Yield accumulated</p>
                  <RedeemDropdown />
                </span>
                <span className="flex items-end gap-1 lg:mt-8">
                  <p className="font-semibold">$TRLCO</p>
                  <p className="text-2xl font-semibold">10,000</p>
                </span>
                <p className="text-neutral-300 text-md">~ 50.00 USD</p>
              </div>

              <div className="flex flex-col p-4 border border-neutral-300 rounded-3xl">
                <span className="flex items-center gap-8">
                  <p className="text-neutral-500">
                    Unrealised gains from capital appreciation
                  </p>
                  <RedeemDropdown />
                </span>
                <span className="flex items-end gap-1 lg:mt-8">
                  <p className="font-semibold">$TRLCO</p>
                  <p className="text-2xl font-semibold">10,000</p>
                </span>
                <p className="text-neutral-300 text-md">~ 50.00 USD</p>
              </div>
              <div className="flex flex-col p-4 border border-neutral-300 rounded-3xl">
                <span className="flex items-center gap-8">
                  <p className="text-neutral-500">
                    Total rental income accumulated
                  </p>
                  <RedeemDropdown />
                </span>
                <span className="flex items-end gap-1 lg:mt-8">
                  <p className="font-semibold">$TRLCO</p>
                  <p className="text-2xl font-semibold">10,000</p>
                </span>
                <p className="text-neutral-300 text-md">~ 50.00 USD</p>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h1 className="font-semibold">Invested Portfolio</h1>
            <div className="my-6 py-4 px-8 bg-[#F6F6F2] rounded-3xl flex justify-between w-full">
              <span className="flex items-center gap-2">
                <p className="text-2xl font-semibold">$TRLX1</p>
                <img src="/misc/dropdown.svg" alt="" />
              </span>
              <div className="flex items-center gap-10">
                <div className="flex items-center gap-4">
                  <img src="/misc/chartup.svg" alt="" />
                  <div className="flex flex-col">
                    <span className="flex items-end gap-2">
                      <p className="text-2xl font-semibold">50,000</p>
                      <p>USD</p>
                    </span>
                    <p className="text-neutral-500">Portfolio value</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <img src="/misc/chartup.svg" alt="" />
                  <div className="flex flex-col">
                    <span className="flex items-end gap-2">
                      <p className="text-2xl font-semibold">50,000</p>
                      <p>USD</p>
                    </span>
                    <p className="text-neutral-500">Total appreaciation</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <img src="/misc/house-cash.svg" alt="" />
                  <div className="flex flex-col">
                    <span className="flex items-end gap-2">
                      <p className="text-2xl font-semibold">2,000</p>
                      <p>USD</p>
                    </span>
                    <p className="text-neutral-500">Total rental income</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex px-4 mt-8">
            <p className=" basis-1/6">Portfolio</p>
            <p className=" basis-4/6">Property</p>
            <p className=" basis-1/6">Status</p>
          </div>

          <div className="flex flex-col gap-4 mt-4">
            {portfolioData.map((data, id) => (
              <PortfolioCard key={id} {...data} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

interface PortfolioCardProps {
  token: string
  propertyName: string
  propertyAddress: string
  status: 'Pending' | 'Completed'
}

const PortfolioCard = ({
  token,
  propertyName,
  propertyAddress,
  status,
}: PortfolioCardProps) => (
  <div className="flex items-center px-6 py-2 border border-neutral-300 rounded-3xl">
    <p className="basis-1/6">{token}</p>
    <div className="flex flex-col basis-4/6">
      <p>{propertyName}</p>
      <p className="text-neutral-500">{propertyAddress}</p>
    </div>
    <span
      className={cn(
        'px-2 rounded-sm',
        status === 'Pending'
          ? 'bg-yellow-100 text-yellow-600'
          : status === 'Completed'
            ? 'bg-emerald-100 text-emerald-600'
            : 'bg-red-100 text-red-600',
      )}
    >
      {status}
    </span>
  </div>
)
