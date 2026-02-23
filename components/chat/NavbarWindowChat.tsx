"use client"

import { Phone, Video, Info } from "lucide-react"
import { useChatStore } from "@/store/useChatStore"

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
    : otherUser?.displayName

  const avatar = isGroup
    ? "/group-avatar.png"
    : otherUser?.avatarUrl

  return (
    <div className="h-16 border-b bg-white px-4 flex items-center justify-between">
      
      {/* LEFT */}
      <div className="flex items-center gap-3">
        <div className="relative">
          <img
            src={avatar || "/avatar.png"}
            className="w-10 h-10 rounded-full object-cover"
          />

          {/* Online dot */}
          {!isGroup && (
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
          )}
        </div>

        <div className="flex flex-col leading-tight">
          <span className="font-semibold text-gray-800 text-sm">
            {name}
          </span>
          <span className="text-xs text-gray-400">
            {isGroup ? "Nhóm trò chuyện" : "Đang hoạt động"}
          </span>
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-3 text-gray-500">
        <button className="hover:text-blue-500 transition">
          <Phone size={18} />
        </button>
        <button className="hover:text-blue-500 transition">
          <Video size={18} />
        </button>
        <button className="hover:text-blue-500 transition">
          <Info size={18} />
        </button>
      </div>

    </div>
  )
}

export default NavbarWindowChat