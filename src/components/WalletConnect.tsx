import { useIsMobile } from '@/hooks/use-mobile'
import { CopyIcon, LoaderCircle, WalletIcon } from 'lucide-react'
import { PropsWithChildren } from 'react'
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { Button } from './ui/button'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from './ui/drawer'
import { toast } from 'sonner'

const walletIcon: { [key: string]: string } = {
  MetaMask: '/metamask.svg',
  WalletConnect: '/walletconnect.svg',
  'Coinbase Wallet': '/coinbase.svg',
}

const WalletConnect = ({ children }: PropsWithChildren) => {
  const {
    isConnected,
    isConnecting,
    isDisconnected,
    isReconnecting,
    address,
    connector,
    status,
    chain,
  } = useAccount()
  const { connectors, connect } = useConnect()
  const { disconnect } = useDisconnect()
  const isMobile = useIsMobile()

  //   Display loading State when connecting or reconencting
  if (isConnecting || isReconnecting) {
    return (
      <div className='py-1.5 px-4 rounded-full bg-red-500 text-white inline-flex items-center'>
        Connecting <LoaderCircle className='ml-1 animate-spin' />
      </div>
    )
  }

  //   Display connect button when isDisconnect
  if (isDisconnected) {
    if (connectors) {
      return (
        <Drawer>
          <DrawerTrigger asChild>{children}</DrawerTrigger>
          <DrawerContent>
            <div className='w-full max-w-sm mx-auto'>
              <DrawerHeader>
                <DrawerTitle>Connect your wallet</DrawerTitle>
                <DrawerDescription>
                  Choose your connect method
                </DrawerDescription>
              </DrawerHeader>
              <div className='grid gap-3 p-4 pb-0'>
                {connectors.map((connector) => (
                  <button
                    key={connector.uid}
                    onClick={() => connect({ connector })}
                    className='relative flex items-center justify-center border h-14 rounded-xl'
                  >
                    <img
                      className='object-contain w-auto h-12 p-3'
                      src={walletIcon[connector.name] || ''}
                      alt={connector.name}
                    />
                  </button>
                ))}
                <DrawerFooter>
                  <DrawerClose asChild>
                    <Button variant='destructive'>Cancel</Button>
                  </DrawerClose>
                </DrawerFooter>
              </div>
            </div>
          </DrawerContent>
        </Drawer>
      )
    }
  }

  //   Display Wallet Info when connected
  if (isConnected) {
    return (
      <Drawer>
        <DrawerTrigger asChild>
          <button className='py-1.5 px-4 rounded-full border border-red-500 flex items-center bg-white'>
            <WalletIcon className='w-4 h-4 mr-2' />
            <span className='text-sm font-bold text-red-500'>{`0x...${address.slice(-4)}`}</span>
          </button>
        </DrawerTrigger>
        <DrawerContent>
          <div className='w-full max-w-sm mx-auto space-y-6'>
            <DrawerHeader>
              <DrawerTitle className='text-lg'>My Wallet</DrawerTitle>
              <DrawerDescription>
                Your wallet connection summary
              </DrawerDescription>
            </DrawerHeader>
            <div className='grid gap-3'>
              <div className='grid p-4 border rounded-xl'>
                <span className='text-sm text-gray-500'>Status</span>
                <span className='capitalize'>{status}</span>
              </div>
              <div className='grid p-4 border rounded-xl'>
                <span className='text-sm text-gray-500'>Network</span>
                <span className='capitalize'>{chain?.name}</span>
              </div>
              <div className='grid p-4 border rounded-xl'>
                <span className='text-sm text-gray-500'>Address</span>
                <div className='flex items-center justify-between'>
                  <span className='text-sm text-gray-500'>
                    {isMobile
                      ? `${address.slice(0, 12)}...${address.slice(-4)}`
                      : `${address.slice(0, 30)}...`}
                  </span>
                  <Button
                    size='sm'
                    onClick={() => {
                      navigator.clipboard.writeText(address),
                        toast.success('Copied Wallet Address')
                    }}
                  >
                    <CopyIcon className='w-4 h-4' />
                    Copy
                  </Button>
                </div>
              </div>
              <div className='grid p-4 border rounded-xl'>
                <span className='text-sm text-gray-500'>Wallet type</span>
                <img
                  className='w-auto h-8 pt-2'
                  src={walletIcon[connector.name]}
                  alt={connector.name}
                />
              </div>
            </div>
            <DrawerFooter>
              <Button onClick={() => disconnect()}>Disconnect</Button>
              <DrawerClose asChild>
                <Button variant='destructive'>Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    )
  }
}

export default WalletConnect
