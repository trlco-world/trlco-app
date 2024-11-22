import Banner from '@/components/Banner'
import StakeContent from '@/components/StakeContent'
import TokenCard from '@/components/TokenCard'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_dashboard/stake/')({
  component: StakePage,
})

function StakePage() {
  return (
    <div className="overflow-hidden bg-white rounded-3xl">
      <Banner>
        <h2 className="text-2xl font-semibold text-white">
          Start staking to enjoy high earnings
        </h2>
        <p className="text-neutral-200">
          Enjoy yield by staking $TRLCO and $TRLX through a flexible or
          <br /> a locked pool.
        </p>
      </Banner>
      <div className="p-10 space-y-6">
        <div className="space-y-3">
          <h3 className="text-lg font-medium">Utility Token</h3>
          <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-5">
            <TokenCard
              tokenName="$TRLCO"
              exploreUrl="/stake/trlco"
              flexibleApy="5.88%"
              fixedApr="10.88%"
              tokenImg=""
            />
          </div>
        </div>
        <div className="space-y-3">
          <h3 className="text-lg font-medium">Security Token</h3>
          <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-5">
            <TokenCard
              tokenName="$TRLX1"
              exploreUrl="/stake/trlx1"
              flexibleApy="5.88%"
              fixedApr="10.88%"
              tokenImg=""
            />
            <TokenCard
              tokenName="$TRLX2"
              exploreUrl="/stake/trlx2"
              flexibleApy="5.88%"
              fixedApr="10.88%"
              tokenImg=""
            />
            <TokenCard
              tokenName="$TRLX3"
              exploreUrl="/stake/trlx3"
              flexibleApy="5.88%"
              fixedApr="10.88%"
              tokenImg=""
            />
          </div>
        </div>
      </div>
      <div className="mt-10">
        <StakeContent />
      </div>
    </div>
  )
}
