export default function Banner({ children }: React.PropsWithChildren) {
  return (
    <div className='bg-[url("/banner.svg")] bg-cover p-6 sm:p-8 rounded-xl'>
      {children}
    </div>
  )
}
