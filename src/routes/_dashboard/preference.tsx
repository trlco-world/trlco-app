import { createFileRoute } from '@tanstack/react-router'
import * as Tabs from '@radix-ui/react-tabs'
import PreferenceForm from '@/components/preference/PreferenceForm'
import AccountForm from '@/components/preference/AccountForm'
import SecurityForm from '@/components/preference/SecurityForm'

const triggerStyle =
  "py-3.5 px-6 font-light data-[state='active']:border-b-2 data-[state='active']:border-red-500 data-[state='active']:font-medium"

export const Route = createFileRoute('/_dashboard/preference')({
  component: PreferencePage,
})

function PreferencePage() {
  return (
    <div className='overflow-hidden bg-white rounded-3xl'>
      <Tabs.Root defaultValue='security'>
        <Tabs.List>
          <Tabs.Trigger className={triggerStyle} value='account'>
            Account information
          </Tabs.Trigger>
          <Tabs.Trigger className={triggerStyle} value='preference'>
            Preferences
          </Tabs.Trigger>
          <Tabs.Trigger className={triggerStyle} value='security'>
            Security and privacy
          </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value='account'>
          <AccountForm />
        </Tabs.Content>
        <Tabs.Content value='preference'>
          <PreferenceForm />
        </Tabs.Content>
        <Tabs.Content value='security'>
          <SecurityForm />
        </Tabs.Content>
      </Tabs.Root>
    </div>
  )
}
