"use client"

import Image from "next/image"
import { Conversation } from "@/lib/types/chat"
import { useChatContext } from "@/store/context"


const NavbarWindowChat = () => {

    const {conversation , currentUserId} = useChatContext()
    if(!conversation || currentUserId ) return null 

  const isGroup = conversation.type === "group"

  const otherUser = !isGroup
    ? conversation.participants.find(p => p._id !== currentUserId)
    : null

  const name = isGroup
    ? conversation.group?.name
    : otherUser?.displayName

  const avatar = isGroup
    ? "/group.png"
    : otherUser?.avatarUrl || "/user.png"

    console.log("navbar check" , conversation , currentUserId)

  return (
    <div className="flex items-center gap-3 px-4 py-3 border-b bg-white">

      {/* Avatar */}
      <div className="relative w-10 h-10">
        <Image
          src={avatar}
          alt="avatar"
          fill
          className="rounded-full object-cover"
        />
      </div>

      {/* Name */}
      <div className="flex flex-col">
        <span className="font-semibold text-sm">
          {name}
        </span>

        {!isGroup && (
          <span className="text-xs text-gray-500">
            Online
          </span>
        )}
      </div>

    </div>
  )
}

export default NavbarWindowChat