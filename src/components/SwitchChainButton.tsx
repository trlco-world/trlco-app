import { LoaderCircle } from 'lucide-react'
import { toast } from 'sonner'
import { useAccount, useSwitchChain } from 'wagmi'
import { Label } from './ui/label'
import { Switch } from './ui/switch'

export default function ToggleChain() {
  const { chains, switchChainAsync, status } = useSwitchChain()
  const { chain, isConnected } = useAccount()

  function handleToggleNetwork() {
    const targetNetwork = chains.find((value) => value.id !== chain?.id)?.id

    toast.promise(switchChainAsync({ chainId: targetNetwork ?? 8453 }), {
      loading: 'Switching Network',
      success: (chain) => `Network changed to ${chain.name}`,
      error: 'Error in Switching Network',
    })
  }

  if (isConnected) {
    const defaultChecked = chain?.id === 8453
    return (
      <div className='flex items-center space-x-2'>
        <Label htmlFor='switch-network'>
          {status === 'idle' || status === 'success' ? (
            chain?.name
          ) : (
            <LoaderCircle className='animate-spin' />
          )}
        </Label>
        <Switch
          id='switch-network'
          onCheckedChange={handleToggleNetwork}
          checked={defaultChecked}
        />
      </div>
    )
  }
}
