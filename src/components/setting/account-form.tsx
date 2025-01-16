import { useUser } from '@/hooks/auth/use-user'
import { useUpdateProfile } from '@/hooks/auth/user-update-profile'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { Button } from '../ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form'
import { Input } from '../ui/input'

const formSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
})

export default function AccountForm() {
  const { data: user, refetch: refetchUser } = useUser()
  const { mutateAsync: updateProfile, isPending } = useUpdateProfile()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
    },
  })

  async function handleUpdateProfile() {
    const { firstName, lastName } = form.getValues()
    toast.promise(
      updateProfile({ first_name: firstName, last_name: lastName }).then(() =>
        refetchUser(),
      ),
      {
        loading: 'Updating...',
        success: 'Profile updated',
        error: 'Failed to update',
      },
    )
  }

  return (
    <Card className='max-w-sm shadow-none'>
      <CardHeader>
        <CardTitle>Account Information</CardTitle>
        <CardDescription>
          You can update your account information
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleUpdateProfile)}
            className='space-y-6'
          >
            <FormField
              control={form.control}
              name='firstName'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={user?.first_name ?? 'Enter your first name'}
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='lastName'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={user?.last_name ?? 'Enter your last name'}
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type='submit' disabled={isPending}>
              Save
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
