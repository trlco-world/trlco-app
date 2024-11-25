import { createFileRoute, Link } from '@tanstack/react-router'
import { z } from 'zod'

const SignUpSearchSchema = z.object({
  email: z.string().optional(),
})

export const Route = createFileRoute('/_auth/verify')({
  validateSearch: SignUpSearchSchema,
  component: VerifyPage,
})

function VerifyPage() {
  const { email } = Route.useSearch()
  return (
    <div className='grid min-h-screen grid-cols-2 mx-auto max-w-7xl'>
      {/* left column */}
      <div className='relative grid place-content-center'>
        <img
          className='object-contain'
          src='/images/auth.png'
          width={708}
          height={543}
          alt='auth'
        />
      </div>
      {/* right column */}
      <div className='grid gap-10 p-6 place-content-center'>
        <div className='space-y-2 text-center'>
          <h1 className='text-3xl font-bold'>Verify your email</h1>
          <p>We've sent a verification email to</p>
          <p className='font-semibold'>{email ?? ''}</p>
        </div>
        <div className='flex justify-center'>
          <span>Please check your inbox for verification link</span>
        </div>

        {/* <div className='grid justify-center'>
          <h5 className='text-neutral-600'>Didn't receive your code yet?</h5>
          <button className='text-red-400'>Resend Code</button>
        </div> */}

        <div className='space-y-3 text-sm text-center'>
          <div className='text-neutral-700'>
            Already have an account?{' '}
            <Link className='text-red-400' href='/login'>
              Log in
            </Link>
          </div>
          <div className='text-neutral-500'>
            By continuing, you are agreeing to our{' '}
            <Link className='text-red-400' href=''>
              Terms of Use
            </Link>{' '}
            and{' '}
            <Link className='text-red-400' href=''>
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
