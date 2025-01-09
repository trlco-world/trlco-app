import * as React from 'react'
import { createFileRoute, redirect } from '@tanstack/react-router'
import { z } from 'zod'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useForm } from 'react-hook-form'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Eye, EyeOff } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const Route = createFileRoute('/_auth/reset')({
  validateSearch: z.object({
    token: z.string(),
  }),
  beforeLoad(ctx) {
    if (!ctx.search.token) {
      throw redirect({ to: '/login' })
    }
  },
  component: ResetPage,
})

type FormValues = {
  password: string
  confirm_password: string
}

function ResetPage() {
  const [isPasswordVisible, setIsPasswordVisible] = React.useState<boolean>()
  //   const { token } = Route.useSearch()
  const { register, getValues } = useForm<FormValues>()

  function handleResetPassword() {
    const data = getValues()
    console.log(data)
  }

  return (
    <div className='grid max-w-sm mx-auto h-dvh place-items-center'>
      <Card className='w-full shadow-none'>
        <CardHeader>
          <CardTitle>Reset Password</CardTitle>
          <CardDescription>Enter your know password</CardDescription>
        </CardHeader>
        <CardContent>
          <div className='space-y-6'>
            <div className='space-y-1'>
              <Label htmlFor='password'>Password</Label>
              <div className='relative'>
                <Input
                  type={isPasswordVisible ? 'text' : 'password'}
                  {...register('password')}
                  placeholder='password'
                  className='col-span-3'
                  required
                />
                <span
                  onClick={() => setIsPasswordVisible((prev) => !prev)}
                  className='absolute top-0 bottom-0 right-0 flex items-center justify-end px-4 cursor-pointer'
                >
                  {isPasswordVisible ? (
                    <Eye className='w-4 h-4' />
                  ) : (
                    <EyeOff className='w-4 h-4' />
                  )}
                </span>
              </div>
            </div>
            <div className='space-y-1'>
              <Label htmlFor='confirmPassword'>Confirm Password</Label>
              <div className='relative'>
                <Input
                  type={isPasswordVisible ? 'text' : 'password'}
                  {...register('confirm_password')}
                  placeholder='confirm password'
                  className='col-span-3'
                  required
                />
                <span
                  onClick={() => setIsPasswordVisible((prev) => !prev)}
                  className='absolute top-0 bottom-0 right-0 flex items-center justify-end px-4 cursor-pointer'
                >
                  {isPasswordVisible ? (
                    <Eye className='w-4 h-4' />
                  ) : (
                    <EyeOff className='w-4 h-4' />
                  )}
                </span>
              </div>
            </div>
            <Button className='w-full' onClick={handleResetPassword}>
              Submit
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
