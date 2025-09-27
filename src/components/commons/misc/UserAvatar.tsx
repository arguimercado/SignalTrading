import React from 'react'
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";

const UserAvatar = ({user,className} : {user:{name:string,email:string},className?:string}) => {
  return (
    <Avatar className={className}>
      <AvatarImage src={"https://github.com/shadcn.png"} />
      <AvatarFallback className="bg-yellow-500 text-yellow-900 text-sm font-bold">
        {user.name.split(" ").map(n => n[0]).join("")}
      </AvatarFallback>
    </Avatar>
  )
}
export default UserAvatar
