import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useAuth } from '@/hooks/user-auth'
import { LogOut } from 'lucide-react'

export default function UserButton() {
  const { user, logout } = useAuth()

  const handleLogout = async (e: React.MouseEvent) => {
    e.preventDefault(), e.stopPropagation(), logout()
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
        <form>
          <DropdownMenuItem>
            <button
              onClick={handleLogout}
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
