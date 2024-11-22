export default function Banner({ children }: React.PropsWithChildren) {
  return (
    <div className='bg-[url("/banner.svg")] bg-cover p-10 space-y-3'>
      {children}
    </div>
  )
}
