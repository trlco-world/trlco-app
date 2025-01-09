import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useAuth } from '@/hooks/user-auth'
import { useNavigate } from '@tanstack/react-router'
import { Cog, LogOut } from 'lucide-react'
import { useCookies } from 'react-cookie'

export default function UserButton() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [cookies, _, removeCookie] = useCookies(['trlco-at'])

  function handleLogout() {
    removeCookie('trlco-at')
    logout(cookies['trlco-at'])
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className='px-4 py-2 border rounded-full border-neutral-500'>
          {user?.email}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{user?.email}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => navigate({ to: '/preference' })}>
            <Cog />
            Settings
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
