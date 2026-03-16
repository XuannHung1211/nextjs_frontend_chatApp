"use client"

import { useChatStore } from "@/store/useChatStore"
import axios from "axios"
import { useMemo, useState } from "react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MoreHorizontal, Trash2, UserPlus } from "lucide-react"
import { toast } from "sonner"
import { format, isToday, isYesterday } from "date-fns"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import AddMemberModal from "../form/AddMemberForm"

const ChatCard = ({ conversationId }: { conversationId: string }) => {
  const {
    conversations,
    currentUserId,
    activeConversationId,
    setActiveConversationId,
    setMessages,
    removeConversation
  } = useChatStore()

  const conversation = conversations?.find(c => c._id === conversationId)
  const [openAddMember, setOpenAddMember] = useState(false)

  if (!conversation) return null
  const isActive = activeConversationId === conversationId

  const formatTime = (dateString?: string) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    if (isToday(date)) return format(date, "HH:mm")
    if (isYesterday(date)) return "Hôm qua"
    return format(date, "dd/MM")
  }

  const info = useMemo(() => {
    const isGroup = conversation?.type === "group"
    const otherUser = conversation?.participants?.find(
      (p: any) => p._id !== currentUserId
    )

    return {
      name: isGroup ? conversation?.group?.name : (otherUser?.displayName || "Người dùng"),
      avatar: isGroup ? "/group.png" : (otherUser?.avatarUrl || "/user.png"),
      lastMsg: conversation?.lastMessage?.content || "Bắt đầu cuộc trò chuyện",
      unread: conversation?.unreadCounts?.[currentUserId || ""] || 0,
      time: formatTime(conversation?.lastMessage?.createdAt || conversation?.updatedAt)
    }
  }, [conversation, currentUserId])

  const handleClick = async () => {
    setActiveConversationId(conversationId)
    try {
      const res = await axios.get(
        `http://localhost:5001/api/conversation/${conversationId}/message`,
        { withCredentials: true }
      )
      setMessages(conversationId, res.data.messages)
    } catch (err) {
      console.error("Lỗi fetch tin nhắn:", err)
    }
  }

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation()
    try {
      const res = await axios.delete(
        `http://localhost:5001/api/conversation/${conversationId}/delete`,
        { withCredentials: true }
      )
      if (res.status === 200) {
        toast.success("Đã xóa cuộc hội thoại")
        removeConversation(conversationId)
      }
    } catch (err) {
      toast.error("Không thể xóa hội thoại")
    }
  }

  return (
    <>
      <div
        onClick={handleClick}
        className={cn(
          "group relative flex items-center gap-3 p-3 cursor-pointer transition-all duration-300 w-full mb-0.5 rounded-xl mx-2 max-w-[calc(100%-16px)]",
          isActive 
            ? "bg-blue-600 shadow-lg shadow-blue-200" 
            : "hover:bg-gray-100/80 active:scale-[0.98]"
        )}
      >
        {/* Avatar Section */}
        <div className="relative flex-shrink-0">
          <Avatar className={cn(
            "h-12 w-12 border-2 transition-all shadow-sm",
            isActive ? "border-blue-400" : "border-white"
          )}>
            <AvatarImage src={info.avatar} className="object-cover" />
            <AvatarFallback className="bg-slate-200 text-slate-600 font-bold">
              {info.name?.[0]?.toUpperCase()}
            </AvatarFallback>
          </Avatar>
          
          {info.unread > 0 && (
            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white ring-2 ring-white">
              {info.unread > 9 ? "9+" : info.unread}
            </span>
          )}
        </div>

        {/* Content Section */}
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-center gap-1">
            <h4 className={cn(
                "text-[14.5px] font-bold truncate transition-colors",
                isActive ? "text-white" : "text-gray-900"
            )}>
              {info.name}
            </h4>
            
            {/* Time / Dropdown Container */}
            <div className="relative flex items-center justify-end w-14 h-5 flex-shrink-0">
              {/* Time - Sẽ mờ đi khi hover */}
              <span className={cn(
                  "text-[11px] font-medium transition-all duration-200 group-hover:opacity-0",
                  isActive ? "text-blue-100" : (info.unread > 0 ? "text-blue-600 font-bold" : "text-gray-400")
              )}>
                {info.time}
              </span>

              {/* More Button - Hiện ra khi hover đúng vị trí của Time */}
              <div className="absolute inset-0 flex justify-end items-center opacity-0 group-hover:opacity-100 transition-all duration-200 transform translate-x-2 group-hover:translate-x-0">
                <DropdownMenu modal={false}>
                  <DropdownMenuTrigger asChild>
                    <button
                      onClick={(e) => e.stopPropagation()}
                      className={cn(
                        "p-1 rounded-full transition-colors",
                        isActive ? "hover:bg-blue-500 text-white" : "hover:bg-gray-200 text-gray-500"
                      )}
                    >
                      <MoreHorizontal size={18} />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-44 p-1 shadow-xl rounded-xl border-gray-100">
                    {conversation.type === "group" && (
                      <DropdownMenuItem
                        onClick={(e) => {
                          e.stopPropagation()
                          setOpenAddMember(true)
                        }}
                        className="rounded-lg py-2 cursor-pointer gap-2"
                      >
                        <UserPlus size={15} className="text-blue-500" />
                        <span className="text-sm font-medium">Thêm thành viên</span>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem
                      onClick={handleDelete}
                      className="text-red-600 focus:text-red-700 focus:bg-red-50 rounded-lg py-2 cursor-pointer gap-2"
                    >
                      <Trash2 size={15} />
                      <span className="text-sm font-medium">Xóa hội thoại</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>

          <div className="flex items-center">
            <p className={cn(
                "text-[13px] truncate transition-colors",
                isActive ? "text-blue-50" : (info.unread > 0 ? "font-bold text-gray-900" : "text-gray-500")
            )}>
              {info.lastMsg}
            </p>
          </div>
        </div>
      </div>

      <AddMemberModal
        conversationId={conversationId}
        open={openAddMember}
        onClose={() => setOpenAddMember(false)}
      />
    </>
  )
}

export default ChatCard