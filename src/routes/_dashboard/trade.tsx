import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_dashboard/trade')({
  component: TradePage,
})

function TradePage() {
  return (
    <div className="w-full p-8 text-black bg-white rounded-3xl">
      <div className="w-full h-full bg-red-200/25 rounded-3xl">
        <div className="flex items-end justify-center w-full h-full bg-red- -z-10">
          <div className="flex flex-col justify-center items-center z-10 absolute top-[20%] gap-[4rem]">
            <img src="/trade-clock.svg" alt="" />
            <h1 className="text-xl lg:text-3xl xl:text-5xl font-semibold max-w-[18rem] xl:max-w-7xl text-center">
              TRL Secondary Marketplace launching soon!
            </h1>
            <span className="text-sm max-w-[18rem] xl:max-w-7xl xl:text-xl text-center text-neutral-500">
              <p>
                Hold on tight as our TRL Secondary Trading marketplace will be
                launching soon.
              </p>
              <p>
                In the meantime, head over to IXSwap to trade your asset-backed
                tokens.
              </p>
            </span>
            <button className="px-8 py-3 text-xl text-white bg-red-500 rounded-3xl">
              Trade in IXSwap
            </button>
          </div>
          <div className="output"></div>
        </div>
      </div>
    </div>
  )
}
