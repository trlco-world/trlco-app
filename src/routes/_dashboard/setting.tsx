import AccountForm from '@/components/setting/account-form'
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
  const navigate = Route.useNavigate()

  function handleChangeTabs(e: any) {
    navigate({ search: { type: e }, replace: true })
  }

  return (
    <div className='space-y-6'>
      <Tabs
        defaultValue={type}
        onValueChange={handleChangeTabs}
        className='space-y-6'
      >
        <TabsList>
          <TabsTrigger value='account'>Account</TabsTrigger>
          <TabsTrigger value='security'>Security</TabsTrigger>
          <TabsTrigger value='kyc'>KYC</TabsTrigger>
        </TabsList>
        <TabsContent value='account'>
          <AccountForm />
        </TabsContent>
      </Tabs>
    </div>
  )
}
