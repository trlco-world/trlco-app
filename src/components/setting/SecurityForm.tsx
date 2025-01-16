export default function SecurityForm() {
  return (
    <div className='p-10'>
      <div className='grid gap-6 md:grid-cols-2 lg:grid-col-4'>
        <div className='p-6 space-y-6 border rounded-3xl'>
          <div className='space-y-2'>
            <h4>Enable multi-factor authentication</h4>
            <p className='text-sm font-light text-gray-600'>
              You will need an authenticator app to generate a one time code
              each time you login.
            </p>
          </div>
          <button className='bg-red-500 rounded-full text-white font-medium py-2.5 px-6'>
            Setup MFA
          </button>
        </div>
      </div>
    </div>
  )
}
