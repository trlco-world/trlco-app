import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { completeUserProfileFn } from '@/lib/api'
import { AxiosError } from 'axios'
import { PropsWithChildren, useState } from 'react'
import { useCookies } from 'react-cookie'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

type FormValues = {
  first_name: string
  last_name: string
  mobile_number: string
}

export function CompleteProfileModal({ children }: PropsWithChildren) {
  const [open, setOpen] = useState<boolean>()
  const [cookie] = useCookies(['trlco-at'])
  const authorization = cookie['trlco-at']

  const { register, getValues } = useForm<FormValues>()

  async function handleCompleteProfile() {
    try {
      const { first_name, last_name, mobile_number } = getValues()
      if (!first_name) throw new Error('First name cannot be empty')
      if (!last_name) throw new Error('Last name cannot be empty')
      if (!mobile_number) throw new Error('Phone number name cannot be empty')

      toast.promise(
        completeUserProfileFn({
          authorization,
          first_name,
          last_name,
          mobile_number,
        }),
        {
          loading: 'Loading...',
          success: (data) => {
            if (data) setOpen(false)
            return 'Thank you for completing the profile'
          },
          error: (error) => {
            console.log(error)
            if (error instanceof AxiosError) {
              return error.message
            }
          },
        },
      )
    } catch (error) {
      if (error instanceof Error) toast.error(error.message)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Complete your profile</DialogTitle>
          <DialogDescription>
            Please make sure to fill in the correct details.
          </DialogDescription>
        </DialogHeader>

        <div className='grid gap-6 py-4'>
          <div className='grid w-full max-w-sm items-center gap-1.5'>
            <Label htmlFor='name'>First Name</Label>
            <Input
              {...register('first_name')}
              placeholder='John'
              className='col-span-3'
              required
            />
          </div>
          <div className='grid w-full max-w-sm items-center gap-1.5'>
            <Label htmlFor='username'>Last Name</Label>
            <Input
              {...register('last_name')}
              placeholder='Doe'
              className='col-span-3'
              required
            />
          </div>
          <div className='grid w-full max-w-sm items-center gap-1.5'>
            <Label htmlFor='username'>Phone Number</Label>
            <Input
              type='tel'
              {...register('mobile_number')}
              placeholder='+6012345678'
              className='col-span-3'
              pattern='[0-9]{3}-[0-9]{2}-[0-9]{3}'
              required
            />
          </div>
        </div>

        <DialogFooter>
          <Button onClick={handleCompleteProfile}>Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
