import Banner from '@/components/Banner'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_dashboard/swap')({
  component: SwapPage,
})

function SwapPage() {
  return (
    <div className="overflow-hidden bg-white rounded-3xl">
      <Banner>
        <h2 className="text-2xl font-semibold text-white">Swap</h2>
        <p className="font-light text-neutral-100">
          Trade your $TRLX and $TRLCO tokens via our Swap feature, powered by
          Uniswap.
        </p>
      </Banner>
      <div className="grid gap-10 p-10 place-items-center">
        <div className="w-[400px] space-y-6">
          <div className="p-6 space-y-3 border rounded-3xl">
            <div className="text-neutral-700">You pay</div>
            <div className="flex items-end justify-between">
              <span className="text-5xl font-semibold">10</span>
              <input
                className="p-3 text-sm font-medium text-red-500 border border-red-500 rounded-full"
                value="TRLX"
              />
            </div>
            <div className="flex items-center justify-between text-neutral-500">
              <span>$500</span>
              <span>
                Balance: 228.00192 <span className="text-red-500">Max</span>
              </span>
            </div>
          </div>
          <div className="p-6 space-y-3 border rounded-3xl">
            <div className="text-neutral-700">You receive</div>
            <div className="flex items-end justify-between">
              <span className="text-5xl font-semibold">10</span>
              <input
                className="p-3 text-sm font-medium text-red-500 border border-red-500 rounded-full"
                value="TRLX"
              />
            </div>
            <div className="flex items-center justify-between text-neutral-500">
              <span>$500</span>
              <span>Balance: 58.00192</span>
            </div>
          </div>
        </div>
        <div>
          <button className="px-32 py-4 text-xl text-white bg-red-500 rounded-full">
            Swap
          </button>
        </div>
      </div>
    </div>
  )
}
