"use client";
import { Button } from "@/components/ui/button"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {useRouter} from "next/navigation";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import UserAvatar from "@/components/commons/misc/UserAvatar";
import {LogOut} from "lucide-react";
import NavItems from "@/app/(root)/_components/NavItems";


const UserDropdown = () => {
  const router = useRouter();

  const handleSignOut = async () => {
    router.push('/sign-in');
  }

  const user = {
    name: 'John Doe',
    email: 'johndoe@gmail.com'
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex item-centers gap-3 text-gray-4 hover:text-yellow-500">
          <UserAvatar user={user} className="h-6 w-6" />
          <div className="hidden md:flex flex-col items-start">
            <span className="text-base font-medium text-gray-400">{user.name}</span>

          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="text-gray-400" align="start">
        <DropdownMenuLabel>
          <div className="flex relative items-center gap-3 py-2 ">
            <UserAvatar user={user} className="h-10 w-10"/>
            <div className="flex flex-col items-start">
              <span className="text-base font-medium text-gray-400">{user.name}</span>
              <span className="text-xs text-gray-500">{user.email}</span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-gray-600" />
        <DropdownMenuItem onClick={handleSignOut}
                          className="text-gray-400 text-md focus:bg-transparent
                          focus:text-yellow-500 transition-colors cursor-pointer">
          <LogOut className="size-4 hidden sm:block " />
          Sign Out
        </DropdownMenuItem>
        <DropdownMenuSeparator className="sm:hidden bg-gray-600" />
        <nav className="sm:hidden">
          <NavItems/>
        </nav>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserDropdown