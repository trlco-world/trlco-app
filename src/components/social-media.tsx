import { Link } from '@tanstack/react-router'
import { Instagram, Linkedin, Twitter, Youtube } from 'lucide-react'
import { FaMedium, FaTelegram } from 'react-icons/fa6'

const lists = [
  {
    name: 'x',
    url: 'https://x.com/Trl_co',
    icon: <Twitter className='w-auto h-6' />,
  },
  {
    name: 'linkedin',
    url: 'https://www.linkedin.com/company/trlco/',
    icon: <Linkedin className='w-auto h-6' />,
  },
  {
    name: 'telegram',
    url: 'https://t.me/trlworld',
    icon: <FaTelegram className='w-auto h-6' />,
  },
  {
    name: 'medium',
    url: 'https://medium.com/@TRLCo',
    icon: <FaMedium className='w-auto h-6' />,
  },
  {
    name: 'youtube',
    url: 'https://www.youtube.com/watch?v=5j-YLqpqb-g',
    icon: <Youtube className='w-auto h-6' />,
  },
  {
    name: 'instagram',
    url: 'https://instagram.com/trlco_world/',
    icon: <Instagram className='w-auto h-6' />,
  },
]

export default function SocialMedia() {
  return (
    <div className='flex gap-6'>
      {lists.map((i) => (
        <Link to={i.url} target='_blank' key={i.name}>
          {i.icon}
        </Link>
      ))}
    </div>
  )
}
