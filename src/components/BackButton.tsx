import { useRouter } from '@tanstack/react-router'
import { IoChevronBack } from 'react-icons/io5'

const BackButton = () => {
  const router = useRouter()
  return (
    <button
      type='button'
      onClick={() => router.history.back()}
      className='flex items-center justify-center w-8 h-8 text-white rounded-full bg-[#D1D4D2]'
    >
      <IoChevronBack className='w-5 h-5' />
    </button>
  )
}

export default BackButton
