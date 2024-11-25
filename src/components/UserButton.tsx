import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { getUserFn, logoutFn } from '@/lib/api'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useLocation, useNavigate } from '@tanstack/react-router'

import { LogOut } from 'lucide-react'
import { useCookies } from 'react-cookie'

export default function UserButton() {
  const navigate = useNavigate()
  const location = useLocation()
  const [cookies, _, removeCookie] = useCookies(['trlco-at'])
  const token = cookies['trlco-at']
  const { data: user } = useQuery({
    queryKey: ['user'],
    queryFn: async () => await getUserFn(token),
  })

  const logoutMutation = useMutation({
    mutationFn: async () => logoutFn(token),
    onSuccess: (data) => {
      if (data.status === 200) {
        removeCookie('trlco-at')
        navigate({ to: '/login', search: { redirectTo: location.href } })
      }
    },
  })

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className='px-4 py-2 border rounded-full border-neutral-500'>
          {user?.email}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{user?.email}</DropdownMenuLabel>
        <form>
          <DropdownMenuItem>
            <button
              onClick={(e) => {
                e.preventDefault(), e.stopPropagation(), logoutMutation.mutate()
              }}
              type='submit'
              className='flex items-center w-full'
            >
              <LogOut className='w-4 h-4 mr-2' />
              <span>Log out</span>
            </button>
          </DropdownMenuItem>
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
