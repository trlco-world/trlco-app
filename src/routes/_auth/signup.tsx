import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useForm } from '@tanstack/react-form'
import { useMutation } from '@tanstack/react-query'
import { signUpFn } from '@/lib/api'
import { encryptData } from '@/lib/encrypt'
import { useState } from 'react'
import { useCookies } from 'react-cookie'
import { Eye, EyeOff } from 'lucide-react'

export const Route = createFileRoute('/_auth/signup')({
  component: SignUpPage,
})

export default function SignUpPage() {
  const [error, setError] = useState<string | null>(null)
  const [_, setCookies] = useCookies(['trlco-at'])
  const navigate = useNavigate()

  const signUpMutation = useMutation({
    mutationFn: async (data: {
      name: string
      email: string
      password: Record<string, string>
      password_confirmation: Record<string, string>
    }) => await signUpFn(data),
    onError: (error: any) => {
      console.log(error)
      setError(error.response?.data?.message || 'An unexpected error occurred')
    },
    onSuccess: (data) => {
      setError(null)
      setCookies('trlco-at', data.access_token, {
        secure: import.meta.env.PROD,
        sameSite: import.meta.env.PROD ? 'strict' : 'lax',
        maxAge: 24 * 60 * 60,
        path: '/',
      })
      navigate({ to: '/verify', search: { email: data.username } })
    },
  })

  const form = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    onSubmit: async ({ value }) => {
      const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{6,}$/
      if (!passwordRegex.test(value.password)) {
        setError(
          'Password must contain at least one capital letter, one number, and be at least 6 characters long.',
        )
        return
      }
      if (value.password !== value.confirmPassword) {
        setError('Passwords do not match.')
        return
      }

      const password = encryptData(value.password)
      const password_confirmation = encryptData(value.confirmPassword)

      signUpMutation.mutate({
        name: value.name,
        email: value.email,
        password,
        password_confirmation,
      })
    },
  })

  return (
    <div className='grid min-h-screen mx-auto sm:grid-cols-2 max-w-7xl'>
      {/* left column */}
      <div className='relative hidden sm:grid place-content-center'>
        <img
          className='object-contain'
          src='/images/auth.png'
          width={708}
          height={543}
          alt='auth'
        />
      </div>
      {/* right column */}
      <div className='grid max-w-sm gap-10 px-6 mx-auto place-content-center sm:px-0'>
        <div className='space-y-3 text-center'>
          <h1 className='text-3xl font-semibold'>Let's get started</h1>
          <p className='text-gray-500'>
            Join us today to revolutionize property transactions.
          </p>
        </div>
        <form
          className='grid gap-4'
          onSubmit={(e) => {
            e.preventDefault(), e.stopPropagation(), form.handleSubmit()
          }}
        >
          <form.Field
            name='name'
            children={(field) => (
              <input
                type='text'
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                className='px-6 py-2.5 border rounded-xl bg-neutral-100'
                placeholder='Enter your name'
                required
              />
            )}
          />
          <form.Field
            name='email'
            children={(field) => (
              <input
                type='email'
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                className='px-6 py-2.5 border rounded-xl bg-neutral-100'
                placeholder='Enter your email'
                required
              />
            )}
          />
          <form.Field
            name='password'
            children={(field) => (
              <div>
                <PasswordInput
                  name={field.name}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className='w-full px-6 py-2.5 border rounded-xl bg-neutral-100'
                  placeholder='Enter your password'
                  required
                />
                <span className='text-xs text-neutral-400 ms-2'>
                  At least 1 uppercase, 1 number, and min 6 characters.
                </span>
              </div>
            )}
          />
          <form.Field
            name='confirmPassword'
            children={(field) => (
              <PasswordInput
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                className='w-full px-6 py-2.5 border rounded-xl bg-neutral-100'
                placeholder='Confirm your password'
                required
              />
            )}
          />
          {signUpMutation.isPending ? (
            <button
              className='px-6 py-2.5 font-medium text-white bg-gray-500 rounded-xl'
              disabled
            >
              Signing Up...
            </button>
          ) : (
            <button
              className='px-6 py-2.5 font-medium text-white bg-red-500 rounded-xl'
              type='submit'
            >
              Sign Up
            </button>
          )}
          {/* Display error messages */}
          {error && (
            <div className='p-4 text-red-500 bg-red-100 rounded-xl'>
              <p>{error}</p>
            </div>
          )}
        </form>

        <div className='space-y-3 text-sm text-center'>
          <div className='text-neutral-700'>
            have an account?{' '}
            <Link className='font-medium text-red-500' href='/login'>
              Login Now
            </Link>
          </div>
          <div className='text-neutral-500'>
            By continuing, you are agreeing to our{' '}
            <Link className='font-medium text-red-500' href=''>
              Terms of Use
            </Link>{' '}
            and{' '}
            <Link className='font-medium text-red-500' href=''>
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
