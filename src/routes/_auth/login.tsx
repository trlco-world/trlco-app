import { getUserFn, loginFn } from '@/lib/api'
import { encryptData } from '@/lib/encrypt'
import { useForm } from '@tanstack/react-form'
import { useMutation } from '@tanstack/react-query'
import {
  createFileRoute,
  Link,
  redirect,
  useNavigate,
} from '@tanstack/react-router'
import { Eye, EyeOff } from 'lucide-react'
import React, { useState } from 'react'
import { useCookies } from 'react-cookie'
import { FcGoogle } from 'react-icons/fc'
import { z } from 'zod'

const isAuthenticated = async () => {
  const token = document.cookie.split('=')[1]
  if (!token) return false
  const user = await getUserFn(token)
  return Boolean(user)
}

export const Route = createFileRoute('/_auth/login')({
  validateSearch: z.object({
    redirectTo: z.string().optional(),
  }),
  beforeLoad: async ({ location }) => {
    if (await isAuthenticated()) {
      throw redirect({
        to: '/dashboard',
        search: {
          redirectTo: location.href,
        },
        replace: true,
      })
    }
  },
  component: LoginPage,
})

function LoginButton({ isLoading }: { isLoading: boolean }) {
  return (
    <button
      className='py-2.5 text-white bg-red-500 rounded-xl'
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
      <div className='grid max-w-sm gap-10 px-6 mx-auto place-content-center sm:px-0'>
        <div className='space-y-2 text-center'>
          <h1 className='text-3xl font-bold'>Let's get started</h1>
          <p>Join us today to revolutionize property transactions.</p>
        </div>

        <button
          onClick={() =>
            window.open('https://api-stg.trlco.world/auth/google', '_self')
          }
          className='flex items-center justify-center gap-3 py-2.5 rounded-xl bg-neutral-100 text-neutral-500'
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
                className='px-4 py-2.5 border rounded-xl bg-neutral-100'
                placeholder='Enter your email'
                autoComplete='username'
              />
            )}
          />
          <form.Field
            name='password'
            children={(field) => (
              <PasswordInput
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                className='px-4 py-2.5 border rounded-xl bg-neutral-100 w-full'
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

        <div className='space-y-3 text-center'>
          <div className='text-neutral-700'>
            Don't have an account?{' '}
            <Link className='text-red-500' href='/signup'>
              Sign Up
            </Link>
          </div>
          <div className='text-sm text-neutral-500'>
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

function PasswordInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev)
  }

  return (
    <div className='relative'>
      <input type={isPasswordVisible ? 'text' : 'password'} {...props} />
      <span
        onClick={togglePasswordVisibility}
        className='absolute top-0 bottom-0 right-0 flex items-center justify-end px-4 cursor-pointer'
      >
        {isPasswordVisible ? (
          <Eye className='w-4 h-4' />
        ) : (
          <EyeOff className='w-4 h-4' />
        )}
      </span>
    </div>
  )
}
