import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_dashboard/swap')({
  component: SwapPage,
})

function SwapPage() {
  return (
    <div className='space-y-6'>
      {/* <Banner>
        <h2 className='text-2xl font-semibold text-white'>Swap</h2>
        <p className='font-light text-neutral-100'>
          Trade your $TRLX and $TRLCO tokens via our Swap feature, powered by
          Uniswap.
        </p>
      </Banner> */}
      <h4 className='text-lg font-semibold sm:text-2xl'>Swap</h4>
      <div className=''>
        <iframe
          src='https://app.uniswap.org/#/swap?theme=light&outputCurrency=0xdAC17F958D2ee523a2206206994597C13D831ec7'
          height='660px'
          width='100%'
          style={{
            border: 0,
            margin: '0 auto',
            display: 'block',
            borderRadius: '10px',
            maxWidth: '600px',
            minWidth: '300px',
          }}
        />
        {/* <div className="w-[400px] space-y-6">
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
        </div> */}
      </div>
    </div>
  )
}
