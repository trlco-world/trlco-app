import AccountForm from '@/components/setting/account-form'
import KYCStatus from '@/components/setting/kyc-status'
import SecurityForm from '@/components/setting/security-form'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'

const searchSchema = z.object({
  type: z.enum(['account', 'security', 'kyc']).optional().default('account'),
})

export const Route = createFileRoute('/_dashboard/setting')({
  validateSearch: searchSchema,
  component: SettingPage,
})

function SettingPage() {
  const { type } = Route.useSearch()

  return (
    <div className='space-y-6'>
      <h4 className='text-lg font-semibold sm:text-2xl'>My Profile</h4>
      <Tabs defaultValue={type} className='space-y-6'>
        <TabsList>
          <TabsTrigger value='account'>Account</TabsTrigger>
          <TabsTrigger value='security'>Security</TabsTrigger>
          <TabsTrigger value='kyc'>KYC</TabsTrigger>
        </TabsList>
        <TabsContent value='account'>
          <AccountForm />
        </TabsContent>
        <TabsContent value='security'>
          <SecurityForm />
        </TabsContent>
        <TabsContent value='kyc'>
          <KYCStatus />
        </TabsContent>
      </Tabs>
    </div>
  )
}
