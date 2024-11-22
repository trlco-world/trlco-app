import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { fixedStaking, flexibleStaking } from '@/data'
import StakeModal from './StakeModel'

interface FlexibleStakeProps {
  staked: string
  unstakeToken: string
  lastStakedDate: string
  redeemableToken: string
  redeemableUSD: string
}

interface FixedStakeProps extends FlexibleStakeProps {
  maturityDate: string
}

function ManageStakeModel() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className='px-4 py-1 text-sm text-red-500 border-2 border-red-500 rounded-full'>
          Manage
        </button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader className='flex flex-col items-center'>
          <DialogTitle className='text-3xl font-semibold'>Manage</DialogTitle>
          <DialogDescription className='text-base font-light text-gray-600'>
            Select an action to proceed.
          </DialogDescription>
        </DialogHeader>
        <div className='grid gap-4 py-4'>
          <button className='px-4 py-2 font-medium text-red-500 border border-red-500 rounded-full'>
            Redeem reward
          </button>
          <StakeModal>
            <button className='px-4 py-2 font-medium text-red-500 border border-red-500 rounded-full'>
              Stake more
            </button>
          </StakeModal>
        </div>
        <DialogFooter>
          <div className='flex items-end justify-center w-full gap-2 text-sm'>
            Stop staking?
            <button type='submit' className='font-medium text-red-500'>
              Unstake
            </button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

const FlexibleStake = ({ ...props }: FlexibleStakeProps) => (
  <div className='flex flex-col w-full border border-gray-300 rounded-2xl'>
    <div className='flex items-center justify-between px-4 py-3'>
      <p>$TRLCO</p>
      <ManageStakeModel />
    </div>
    <span className='h-[1px] bg-gray-300' />
    <div className='flex flex-col w-full gap-5 py-4 text-center md:flex-row justify-evenly md:gap-0'>
      <div className='flex flex-row-reverse items-center justify-between w-full px-3 md:justify-around md:flex-col'>
        <p>{props.staked}</p>
        <p>Staked Token</p>
      </div>
      <div className='flex flex-row-reverse items-center justify-between w-full px-3 md:justify-around md:flex-col'>
        <p>{props.unstakeToken}</p>
        <p>Unstaked Token</p>
      </div>
      <div className='flex flex-row-reverse items-center justify-between w-full px-3 md:justify-around md:flex-col'>
        <p>{props.lastStakedDate}</p>
        <p>Last Staked date</p>
      </div>
      <div className='flex flex-row-reverse items-center justify-between w-full px-3 md:justify-around md:flex-col'>
        <span className='flex flex-col items-center md:flex-row'>
          <p>{props.redeemableToken}</p>
          <p className='text-sm text-neutral-400'>
            &nbsp;-&nbsp;{props.redeemableUSD}&nbsp; USD
          </p>
        </span>
        <p>Redeemable $ TRLCO</p>
      </div>
    </div>
  </div>
)
const FixedStake = ({ ...props }: FixedStakeProps) => (
  <div className='flex flex-col w-full border border-gray-300 rounded-2xl'>
    <div className='flex items-center justify-between px-4 py-3'>
      <p>$TRLCO</p>
      <ManageStakeModel />
    </div>
    <span className='h-[1px] bg-gray-300' />
    <div className='flex flex-col w-full gap-5 py-4 text-center md:flex-row justify-evenly md:gap-0'>
      <div className='flex flex-row-reverse items-center justify-between w-full px-3 md:justify-around md:flex-col'>
        <p>{props.staked}</p>
        <p>Staked Token</p>
      </div>
      <div className='flex flex-row-reverse items-center justify-between w-full px-3 md:justify-around md:flex-col'>
        <p>{props.unstakeToken}</p>
        <p>Unstaked Token</p>
      </div>
      <div className='flex flex-row-reverse items-center justify-between w-full px-3 md:justify-around md:flex-col'>
        <p>{props.lastStakedDate}</p>
        <p>Last Staked date</p>
      </div>
      <div className='flex flex-row-reverse items-center justify-between w-full px-3 md:justify-around md:flex-col'>
        <p>{props.maturityDate}</p>
        <p>Maturity Date</p>
      </div>
      <div className='flex flex-row-reverse items-center justify-between w-full px-3 md:justify-around md:flex-col'>
        <span className='flex flex-col items-center md:flex-row'>
          <p>{props.redeemableToken}</p>
          <p className='text-sm text-neutral-400'>
            &nbsp;-&nbsp;{props.redeemableUSD}&nbsp; USD
          </p>
        </span>
        <p>Redeemable $ TRLCO</p>
      </div>
    </div>
  </div>
)

const StakeContent = () => {
  return (
    <div className='w-full bg-white rounded-3xl'>
      <h1 className='px-6 pt-3 text-xl font-bold text-black'>
        Staking History
      </h1>
      <Tabs
        defaultValue='account'
        className='flex flex-col w-full h-full py-4 text-black'
      >
        <TabsList className='flex w-full gap-4 bg-white lg:justify-start md:pl-4'>
          <TabsTrigger
            value='account'
            className='data-[state=active]:border-b-[3px] border-red-500 data-[state=active]:text-black px-4'
          >
            Flexible
          </TabsTrigger>
          <TabsTrigger
            value='password'
            className='data-[state=active]:border-b-[3px] border-red-500 data-[state=active]:text-black px-4'
          >
            Fixed Term
          </TabsTrigger>
        </TabsList>

        <TabsContent value='account'>
          <div className='flex flex-col gap-8 px-6'>
            {flexibleStaking.map((index, i) => (
              <FlexibleStake
                key={i}
                staked={index.staked}
                unstakeToken={index.unstakeToken}
                lastStakedDate={index.lastStakedDate}
                redeemableToken={index.redeemableToken}
                redeemableUSD={index.redeemableUSD}
              />
            ))}
          </div>
        </TabsContent>
        <TabsContent value='password'>
          <div className='flex flex-col gap-8 px-6'>
            {fixedStaking.map((index, i) => (
              <FixedStake
                key={i}
                staked={index.staked}
                unstakeToken={index.unstakeToken}
                lastStakedDate={index.lastStakedDate}
                redeemableToken={index.redeemableToken}
                redeemableUSD={index.redeemableUSD}
                maturityDate={index.maturityDate}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default StakeContent
