"use client"
import { Conversation } from "@/lib/types/chat"
import { cn } from "@/lib/utils"
import { useChatStore } from "@/store/useChatStore"
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"
import { useMemo } from "react"

interface Props {
  conversationId: string
  handleClick: () => void
}

const ChatCard = ({handleClick , conversationId} : Props) => {
 const { conversations, currentUserId, activeConversationId } = useChatStore()

const conversation = conversations.find(c => c._id === conversationId)

const { name, avatar, lastMsg, unread, isGroup } = useMemo(() => {
  const c = conversation
  const isGroup = c?.type === "group"
  const otherUser = conversation?.participants.find( p => p._id !== currentUserId)
  const isActive = activeConversationId === conversationId
 
  return {
    isGroup,
    name: isGroup ? c?.group?.name : otherUser?.displayName,
    avatar: isGroup ? "/group.png" : otherUser?.avatarUrl ?? "/user.png",
    lastMsg: c?.lastMessage?.content ?? "No message yet",
    unread: c?.unreadCounts?.[currentUserId!] ?? 0
  }
}, [currentUserId])

  return (

    <div 
    className={cn( activeConversationId === conversationId &&"bg-gray-100" , "flex items-center gap-3 p-3 hover:bg-gray-100 cursor-pointer rounded-xl transition")} 
    onClick={handleClick}
    >
      
      <Avatar>
        <AvatarImage src={avatar} className="rounded-full w-16 h-16" />
        <AvatarFallback className="rounded-full w-16 h-16">{(name && name[0].toUpperCase()) || "CN" }</AvatarFallback>
      </Avatar>

      <div className="flex-1">
        <div className="font-semibold text-sm">
          {name}
        </div>

        <div className="text-xs text-gray-500 truncate">
          {lastMsg}
        </div>
      </div>

      {unread > 0 && (
        <div className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
          {unread}
        </div>
      )}
    </div>


  )


}

export default ChatCard
