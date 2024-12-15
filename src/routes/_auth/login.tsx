import { loginFn } from '@/lib/api'
import { encryptData } from '@/lib/encrypt'
import { useForm } from '@tanstack/react-form'
import { useMutation } from '@tanstack/react-query'
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { useCookies } from 'react-cookie'
import { FcGoogle } from 'react-icons/fc'
import { z } from 'zod'

const loginSearchSchema = z.object({
  redirectTo: z.string().optional(),
})

export const Route = createFileRoute('/_auth/login')({
  validateSearch: loginSearchSchema,
  component: LoginPage,
})

function LoginButton({ isLoading }: { isLoading: boolean }) {
  return (
    <button
      className='py-3 text-white bg-red-500 rounded-full'
      type='submit'
      disabled={isLoading}
    >
      {isLoading ? 'Logging In...' : 'Login'}
    </button>
  )
}

function LoginPage() {
  const [error, setError] = useState<string | null>(null)
  const [cookie, setCookie, removeCookie] = useCookies(['trlco-at'])
  const { redirectTo } = Route.useSearch()
  const navigate = useNavigate()

  // Define the mutation
  const loginMutation = useMutation({
    mutationFn: async (data: {
      email: Record<string, string>
      password: Record<string, string>
    }) => await loginFn(data),
    onError: (error: any) => {
      console.log(error)
      setError(error.response?.data?.message || 'An unexpected error occurred')
    },
    onSuccess: (data) => {
      if (cookie['trlco-at']) {
        removeCookie('trlco-at')
      }

      setError(null)
      setCookie('trlco-at', data.access_token, {
        secure: import.meta.env.PROD,
        sameSite: import.meta.env.PROD ? 'strict' : 'lax',
        maxAge: 24 * 60 * 60,
        path: '/',
      })
      if (redirectTo) {
        navigate({ to: redirectTo })
      } else {
        navigate({ to: '/dashboard' })
      }
    },
  })

  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    onSubmit: async ({ value }) => {
      const { email, password } = value

      if (!email || !password) {
        setError('Email and password are required')
        return
      }

      const encryptedEmail = encryptData(email)
      const encryptedPassword = encryptData(password)

      loginMutation.mutate({
        email: encryptedEmail,
        password: encryptedPassword,
      })
    },
  })

  return (
    <div className='grid min-h-screen mx-auto sm:grid-cols-2 max-w-7xl'>
      {/* Left column */}
      <div className='relative hidden place-content-center sm:grid'>
        <img
          className='object-contain'
          src='/images/auth.png'
          width={708}
          height={543}
          alt='auth'
        />
      </div>

      {/* Right column */}
      <div className='grid gap-10 p-6 place-content-center'>
        <div className='space-y-2 text-center'>
          <h1 className='text-3xl font-bold'>Let's get started</h1>
          <p>Join us today to revolutionize property transactions.</p>
        </div>

        <button
          onClick={() =>
            window.open('https://api-stg.trlco.world/auth/google', '_self')
          }
          className='flex items-center justify-center gap-3 py-3 text-lg font-medium rounded-full bg-neutral-100 text-neutral-500'
        >
          <FcGoogle className='w-6 h-6' />
          Continue with Google
        </button>

        <div className='relative'>
          <div className='absolute inset-0 flex items-center'>
            <span className='w-full border-t' />
          </div>
          <div className='relative flex justify-center text-xs uppercase'>
            <span className='px-6 text-lg font-bold bg-background'>or</span>
          </div>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault(), e.stopPropagation(), form.handleSubmit()
          }}
          className='flex flex-col gap-4'
        >
          <form.Field
            name='email'
            children={(field) => (
              <input
                type='email'
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                className='px-6 py-3 border rounded-full bg-neutral-100'
                placeholder='Enter your email'
                autoComplete='username'
              />
            )}
          />
          <form.Field
            name='password'
            children={(field) => (
              <input
                type='password'
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                className='px-6 py-3 border rounded-full bg-neutral-100'
                placeholder='Enter your password'
                autoComplete='current-password'
              />
            )}
          />

          <LoginButton isLoading={loginMutation.isPending} />
        </form>

        {/* Display error messages */}
        {error && (
          <div className='p-4 text-red-500 bg-red-100'>
            <p>{error}</p>
          </div>
        )}

        <div className='space-y-3 text-sm text-center'>
          <div className='text-neutral-700'>
            Don't have an account?{' '}
            <Link className='text-red-500' href='/signup'>
              Sign Up
            </Link>
          </div>
          <div className='text-neutral-500'>
            By continuing, you are agreeing to our{' '}
            <Link className='text-red-500' href=''>
              Terms of Use
            </Link>{' '}
            and{' '}
            <Link className='text-red-500' href=''>
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
