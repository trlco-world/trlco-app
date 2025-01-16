import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useLogout } from '@/hooks/auth/use-logout'
import { useUser } from '@/hooks/auth/use-user'
import { useNavigate } from '@tanstack/react-router'
import { Cog, LogOut } from 'lucide-react'
import { useCookies } from 'react-cookie'

export default function UserButton() {
  const { mutateAsync: logout } = useLogout()
  const { data: user } = useUser()
  const navigate = useNavigate()
  const [_, __, removeCookie] = useCookies(['trlco-at'])

  function handleLogout() {
    logout().then(() => {
      removeCookie('trlco-at')
      navigate({ to: '/login' })
    })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className='px-4 py-1.5 border rounded-xl border-neutral-500'>
          {user?.email}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{user?.email}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={() =>
              navigate({ to: '/setting', search: { type: 'account' } })
            }
          >
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
