import { CopyIcon, ExternalLink, LoaderCircle } from 'lucide-react'
import { PropsWithChildren } from 'react'
import { toast } from 'sonner'
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
import { baseSepolia } from 'viem/chains'

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
    chain,
  } = useAccount()
  const { connectors, connect } = useConnect()
  const { disconnect } = useDisconnect()
  const explorerUrl = import.meta.env.VITE_EXPLORER_LINK

  //   Display loading State when connecting or reconencting
  if (isConnecting || isReconnecting) {
    return (
      <div className='flex items-center px-4 font-medium border rounded-xl'>
        Connecting <LoaderCircle className='w-5 h-5 ml-2 animate-spin' />
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
                    onClick={() =>
                      connect({ connector, chainId: baseSepolia.id })
                    }
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
        <DrawerTrigger asChild>{children}</DrawerTrigger>
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
                <span className='text-sm text-gray-500'>Address</span>
                <span className='font-mono text-xs sm:text-sm text-wrap'>
                  {address}
                </span>
                <div className='grid grid-cols-2 gap-3 mt-3'>
                  <Button
                    variant='secondary'
                    onClick={() => {
                      navigator.clipboard.writeText(address),
                        toast.success('Copied Wallet Address')
                    }}
                  >
                    Copy
                    <CopyIcon className='w-4 h-4' />
                  </Button>
                  <Button
                    variant='secondary'
                    onClick={() =>
                      window.open(`${explorerUrl}/address/${address}`, '_blank')
                    }
                  >
                    View Explorer
                    <ExternalLink className='w-4 h-4' />
                  </Button>
                </div>
              </div>
              <div className='grid p-4 border rounded-xl'>
                <span className='text-sm text-gray-500'>Network</span>
                <span className='capitalize'>{chain?.name}</span>
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
            <DrawerFooter className='grid grid-cols-2'>
              <Button variant='destructive' onClick={() => disconnect()}>
                Disconnect
              </Button>
              <DrawerClose asChild>
                <Button>Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    )
  }
}

export default WalletConnect
