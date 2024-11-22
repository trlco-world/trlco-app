import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/signup')({
  component: SignUpPage,
})

function SignUpButton() {
  // const { pending } = useFormStatus();

  // if (pending) {
  //   return (
  //     <button
  //       className='flex items-center justify-center gap-2 py-3 text-white bg-red-300 rounded-full '
  //       type='submit'
  //       disabled
  //     >
  //       Signing Up <LoaderCircle className='duration-300 animate-spin' />
  //     </button>
  //   );
  // } else {
  return (
    <button
      className='px-6 py-3 font-medium text-white bg-red-500 rounded-full'
      type='submit'
    >
      Sign Up
    </button>
  )
  // }
}

export default function SignUpPage() {
  //   const [status, formAction] = useFormState(handleSignUp, null)

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
        <div className='space-y-3 text-center'>
          <h1 className='text-3xl font-semibold'>Let's get started</h1>
          <p className='text-gray-500'>
            Join us today to revolutionize property transactions.
          </p>
        </div>
        <form className='grid gap-4'>
          <input
            type='name'
            id='name'
            name='name'
            className='px-6 py-3 border rounded-full bg-neutral-100'
            placeholder='Enter your name'
            required
          />
          <input
            type='email'
            id='email'
            name='email'
            className='px-6 py-3 border rounded-full bg-neutral-100'
            placeholder='Enter your email'
            required
          />
          <input
            type='password'
            id='password'
            name='password'
            className='px-6 py-3 border rounded-full bg-neutral-100'
            placeholder='Enter your password'
            required
          />
          <input
            type='password'
            id='password'
            name='password'
            className='px-6 py-3 border rounded-full bg-neutral-100'
            placeholder='Confirm your password'
            required
          />
          <SignUpButton />
          {/* {status && (
            <div className='flex flex-col items-center justify-center py-4 text-red-500 bg-red-100'>
              <div>{status.message}</div>
              {status.errors && (
                <ul className='mt-2 text-left'>
                  {Object.entries(status.errors).map(([field, messages]) => (
                    <li key={field} className='text-red-700'>
                      <strong>{field}:</strong> {messages?.toString()}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )} */}
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
