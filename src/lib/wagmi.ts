import { base, baseSepolia } from '@wagmi/core/chains'
import { createConfig, http } from 'wagmi'
import { coinbaseWallet, walletConnect } from 'wagmi/connectors'

export const config = createConfig({
  chains: [base, baseSepolia],
  transports: {
    [base.id]: http(),
    [baseSepolia.id]: http(),
  },
  connectors: [
    coinbaseWallet({ appName: 'TRLCO' }),
    walletConnect({ projectId: import.meta.env.VITE_PROJECT_ID }),
  ],
})
