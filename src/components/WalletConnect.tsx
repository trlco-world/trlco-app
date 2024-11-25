import { CopyIcon, LoaderCircle, WalletIcon } from 'lucide-react'
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTrigger,
} from './ui/alert-dialog'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog'
import { Link } from '@tanstack/react-router'
import {
  AlertDialogDescription,
  AlertDialogTitle,
} from '@radix-ui/react-alert-dialog'

const walletIcon: { [key: string]: string } = {
  MetaMask: '/metamask.svg',
  WalletConnect: '/walletconnect.svg',
  'Coinbase Wallet': '/coinbase.svg',
}

const WalletConnect = () => {
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

  //   Display loading State when connecting or reconencting
  if (isConnecting || isReconnecting) {
    return (
      <div className='py-1.5 px-4 rounded-full bg-red-500 text-white w-full flex items-center'>
        Connecting <LoaderCircle className='ml-1 animate-spin' />
      </div>
    )
  }

  //   Display connect button when isDisconnect
  if (isDisconnected) {
    if (connectors) {
      return (
        <Dialog>
          <DialogTrigger asChild>
            <button className='py-1.5 px-4 rounded-full bg-red-500 text-white w-full'>
              Connect Wallet
            </button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader className='text-2xl font-semibold !text-center'>
              <DialogTitle>Connect your wallet</DialogTitle>
              <DialogDescription></DialogDescription>
            </DialogHeader>
            <DialogDescription className='!text-center'>
              Select a wallet type to continue
            </DialogDescription>
            <div className='grid grid-cols-3 gap-6'>
              {connectors.map((connector) => (
                <button
                  key={connector.uid}
                  onClick={() => connect({ connector })}
                  className='relative flex items-center justify-center h-12 border rounded-xl'
                >
                  <img
                    className='object-contain p-3'
                    src={walletIcon[connector.name] || ''}
                    alt={connector.name}
                  />
                </button>
              ))}
            </div>
            <DialogFooter>
              <div className='w-full text-sm text-center'>
                Need help to get started?
                <Link className='ml-1 font-medium text-red-500' href={''}>
                  Contact us
                </Link>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )
    }
  }

  //   Display Wallet Info when connected
  if (isConnected) {
    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <button className='py-1.5 px-4 rounded-full border border-red-500 flex items-center bg-white'>
            <WalletIcon className='w-4 h-4 mr-2' />
            <span className='text-sm font-bold text-red-500'>{`0x...${address.slice(-4)}`}</span>
          </button>
        </AlertDialogTrigger>
        <AlertDialogContent className='p-10 !rounded-3xl'>
          <AlertDialogHeader className='!text-center text-2xl font-semibold'>
            <AlertDialogTitle>Your wallet account</AlertDialogTitle>
            <AlertDialogDescription></AlertDialogDescription>
          </AlertDialogHeader>
          <div className='grid gap-4 p-6 border rounded-3xl md:grid-cols-3'>
            <div className='flex flex-col gap-1'>
              <span className='text-sm text-gray-500'>Status</span>
              <span className='capitalize'>{status}</span>
            </div>
            <div className='flex flex-col gap-1'>
              <span className='text-sm text-gray-500'>Network</span>
              <span className='capitalize'>{chain?.name}</span>
            </div>
            <div className='flex flex-col gap-1'>
              <span className='text-sm text-gray-500'>Wallet type</span>
              <img
                className='pt-1'
                src={walletIcon[connector.name]}
                width={200}
                height={20}
                alt={connector.name}
              />
            </div>
          </div>
          <div className='flex items-end justify-between'>
            <span className='font-medium'>Your wallet address</span>
            <Link
              href={`https://basescan.org/address/${address}`}
              target='_blank'
              className='text-sm font-medium text-red-500'
            >
              View on Basescan
            </Link>
          </div>
          <div className='border rounded-full px-6 py-2.5 flex justify-between'>
            <span className='text-sm text-gray-500'>{address}</span>
            <button onClick={() => navigator.clipboard.writeText(address)}>
              <CopyIcon className='w-4 h-4' />
            </button>
          </div>
          <div className='!flex justify-center gap-6 !w-full'>
            <AlertDialogAction
              className='bg-red-500 rounded-full px-6 py-2.5 text-white font-medium'
              onClick={() => disconnect()}
            >
              Disconnect
            </AlertDialogAction>
            <AlertDialogCancel className='border-red-500 text-red-500 rounded-full px-6 py-2.5 font-medium'>
              Cancel
            </AlertDialogCancel>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    )
  }
}

export default WalletConnect
