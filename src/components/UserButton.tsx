import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { getUserFn } from '@/lib/api'
import { useQuery } from '@tanstack/react-query'

import { LogOut } from 'lucide-react'
import { useCookies } from 'react-cookie'

export default function UserButton() {
  const [cookies] = useCookies(['trlco-at'])
  const token = cookies['trlco-at']
  const { data: user } = useQuery({
    queryKey: ['user'],
    queryFn: async () => await getUserFn(token),
  })

  //   const handleLogout = async () => {
  //     "use server";

  //     const response = await fetch(`${process.env.NEXT_PUBLIC_API}/logout`, {
  //       method: "POST",
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${accessToken}`,
  //       },
  //       redirect: "follow",
  //     });

  //     if (response.ok) {
  //       cookies().delete("accessToken");
  //       redirect("/logout");
  //     }
  //   };

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
            <button type='submit' className='flex items-center w-full'>
              <LogOut className='w-4 h-4 mr-2' />
              <span>Log out</span>
            </button>
          </DropdownMenuItem>
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
