import { baseSepolia } from '@wagmi/core/chains'
import { createConfig, http } from 'wagmi'
import { coinbaseWallet, walletConnect } from 'wagmi/connectors'

const nodeProviderUrl = import.meta.env.VITE_NODE_PROVIDER as string

export const config = createConfig({
  chains: [baseSepolia],
  transports: {
    [baseSepolia.id]: http(nodeProviderUrl),
  },
  connectors: [
    coinbaseWallet({
      appName: 'TRLCO',
      jsonRpcUrl:
        'https://api.developer.coinbase.com/rpc/v1/base-sepolia/lmvru71v6FP0T0Ldo5qvuQBIAsXqCNl4',
    }),
    walletConnect({ projectId: import.meta.env.VITE_PROJECT_ID }),
  ],
})
