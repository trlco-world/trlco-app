import { useRouter } from '@tanstack/react-router'
import { IoChevronBack } from 'react-icons/io5'

const BackButton = () => {
  const router = useRouter()
  return (
    <button
      type='button'
      onClick={() => router.history.back()}
      className='flex items-center h-8 gap-1 px-3 text-sm text-white rounded-full bg-black/35'
    >
      <IoChevronBack />
      Back
    </button>
  )
}

export default BackButton
