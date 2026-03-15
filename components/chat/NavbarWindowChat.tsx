"use client"

import { Phone, Video, Info, Circle } from "lucide-react"
import { useChatStore } from "@/store/useChatStore"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const NavbarWindowChat = () => {
  const { activeConversationId, conversations, currentUserId } = useChatStore()

  const conversation = conversations.find(c => c._id === activeConversationId)
  if (!conversation) return null

  const isGroup = conversation.type === "group"
  const otherUser = conversation.participants.find(
    p => p._id !== currentUserId
  )

  const name = isGroup
    ? conversation.group?.name
    : (otherUser?.displayName || "Người dùng")

  const avatar = isGroup
    ? "/group.png"
    : (otherUser?.avatarUrl || "/user.png")

  return (
    <div className="h-[72px] border-b bg-white/80 backdrop-blur-md sticky top-0 z-20 px-6 flex items-center justify-between shadow-sm">
      
      {/* LEFT: User Info */}
      <div className="flex items-center gap-4 group cursor-pointer">
        <div className="relative">
          <Avatar className="h-11 w-11 border-2 border-white shadow-sm transition-transform group-hover:scale-105">
            <AvatarImage src={avatar} className="object-cover" />
            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white font-medium">
              {name?.[0]?.toUpperCase()}
            </AvatarFallback>
          </Avatar>

          {!isGroup && (
            <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-[2.5px] border-white rounded-full shadow-sm" />
          )}
        </div>

        <div className="flex flex-col">
          <h3 className="font-bold text-[15px] text-gray-900 leading-tight tracking-tight">
            {name}
          </h3>
          <div className="flex items-center gap-1.5">
            {isGroup ? (
              <span className="text-[12px] font-medium text-gray-400">
                {conversation.participants?.length || 0} thành viên
              </span>
            ) : (
              <>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span className="text-[12px] font-medium text-green-600">
                  Đang hoạt động
                </span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* RIGHT: Actions */}
      <div className="flex items-center gap-1">
        <TooltipProvider delayDuration={100}>
          
          {/* Call Button */}
          <Tooltip>
            <TooltipTrigger asChild>
              <button className="p-2.5 rounded-full text-gray-500 hover:bg-blue-50 hover:text-blue-600 transition-all active:scale-90">
                <Phone size={20} strokeWidth={2.2} />
              </button>
            </TooltipTrigger>
            <TooltipContent>Bắt đầu cuộc gọi thoại</TooltipContent>
          </Tooltip>

          {/* Video Button */}
          <Tooltip>
            <TooltipTrigger asChild>
              <button className="p-2.5 rounded-full text-gray-500 hover:bg-indigo-50 hover:text-indigo-600 transition-all active:scale-90">
                <Video size={21} strokeWidth={2.2} />
              </button>
            </TooltipTrigger>
            <TooltipContent>Bắt đầu gọi video</TooltipContent>
          </Tooltip>

          {/* Divider */}
          <div className="w-[1px] h-6 bg-gray-200 mx-2" />

          {/* Info Button */}
          <Tooltip>
            <TooltipTrigger asChild>
              <button className="p-2.5 rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-all active:scale-90">
                <Info size={21} strokeWidth={2.2} />
              </button>
            </TooltipTrigger>
            <TooltipContent>Thông tin hội thoại</TooltipContent>
          </Tooltip>

        </TooltipProvider>
      </div>

    </div>
  )
}

export default NavbarWindowChat