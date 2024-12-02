import { useAuth } from '@/hooks/user-auth'
import { PropsWithChildren, useEffect } from 'react'

declare global {
  interface Window {
    BlockpassKYCConnect: any
  }
}

const clientId = import.meta.env.VITE_BLOCKPASS_CLIENTID

const KYCConnect = ({ children }: PropsWithChildren) => {
  const { refId } = useAuth()

  useEffect(() => {
    if (window.BlockpassKYCConnect && refId) {
      const blockpass = new window.BlockpassKYCConnect(clientId, {
        refId, // Optional: unique identifier for the user
      })

      // Start the KYC widget flow
      blockpass.startKYCConnect()

      // Event listener for successful KYC connection
      blockpass.on('KYCConnectSuccess', (payload: any) => {
        console.log('Success payload:', payload)
        // Handle successful KYC submission
      })

      // Event listener for closing the widget
      blockpass.on('KYCConnectClose', () => {
        // console.log('KYC workflow closed.')
      })

      // Event listener for KYC cancellation
      blockpass.on('KYCConnectCancel', () => {
        // console.log('KYC workflow canceled.')
      })
    }

    // Cleanup on unmount
    return () => {
      if (window.BlockpassKYCConnect) {
        // If necessary, perform cleanup here
      }
    }
  }, [clientId, refId])

  return <div id='blockpass-kyc-connect'>{children}</div>
}

export default KYCConnect
