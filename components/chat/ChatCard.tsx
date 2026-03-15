"use client"

import { useChatStore } from "@/store/useChatStore"
import axios from "axios"
import { useMemo, useState } from "react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MoreHorizontal, Trash2, UserPlus, CheckCheck } from "lucide-react"
import { toast } from "sonner"
// Thêm hàm format của date-fns
import { format, isToday, isYesterday, formatDistanceToNow } from "date-fns"
import { vi } from "date-fns/locale" 

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

  // Logic xử lý format thời gian
  const formatTime = (dateString?: string) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    
    // Nếu là hôm nay: 14:30
    if (isToday(date)) {
      return format(date, "HH:mm")
    }
    // Nếu là hôm qua: Hôm qua
    if (isYesterday(date)) {
      return "Hôm qua"
    }
    // Nếu trong tuần: Thứ 2, Thứ 3...
    // Nếu lâu hơn: 15/03
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
      // Lấy thời gian từ tin nhắn cuối hoặc thời gian cập nhật cuộc hội thoại
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
          "group relative flex items-center gap-4 p-3.5 cursor-pointer transition-all duration-200 w-full mb-1 border-l-[3px]",
          isActive 
            ? "bg-blue-50/60 border-blue-500 shadow-[inset_0px_0px_10px_rgba(59,130,246,0.05)]" 
            : "border-transparent hover:bg-gray-50 hover:translate-x-0.5"
        )}
      >
        <div className="relative flex-shrink-0">
          <Avatar className="h-13 w-13 border-[1.5px] border-white shadow-sm">
            <AvatarImage src={info.avatar} className="object-cover" />
            <AvatarFallback className="bg-gradient-to-tr from-slate-200 to-slate-300 text-slate-600 font-bold">
              {info.name?.[0]?.toUpperCase()}
            </AvatarFallback>
          </Avatar>
          
          {info.unread > 0 && (
            <span className="absolute -top-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white ring-2 ring-white shadow-md">
              {info.unread > 9 ? "9+" : info.unread}
            </span>
          )}
        </div>

        <div className="flex-1 min-w-0 pr-2">
          <div className="flex justify-between items-center mb-0.5">
            <h4 className={cn(
                "text-[14.5px] font-semibold truncate",
                isActive ? "text-blue-600" : "text-gray-900"
            )}>
              {info.name}
            </h4>
            <span className={cn(
                "text-[11px] whitespace-nowrap ml-2",
                info.unread > 0 ? "text-blue-600 font-bold" : "text-gray-400 font-medium"
            )}>
              {info.time}
            </span>
          </div>

          <div className="flex items-center justify-between gap-2">
            <p className={cn(
                "text-[13px] truncate",
                info.unread > 0 ? "font-bold text-gray-900" : "text-gray-500"
            )}>
              {info.lastMsg}
            </p>
            
            {/* Tick xanh nếu đã đọc và không có tin nhắn mới */}
            {info.unread === 0 && (
                <CheckCheck size={14} className="text-blue-400 flex-shrink-0" />
            )}
          </div>
        </div>

        {/* Dropdown Action - Hiển thị khi hover */}
        <div className="absolute right-3 opacity-0 group-hover:opacity-100 transition-all duration-150">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                onClick={(e) => e.stopPropagation()}
                className="p-1.5 hover:bg-white rounded-full border bg-white/80 shadow-sm text-gray-500"
              >
                <MoreHorizontal size={16} />
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-48 p-1 shadow-xl border-gray-100 rounded-xl">
              {conversation.type === "group" && (
                <DropdownMenuItem
                  onClick={(e) => {
                    e.stopPropagation()
                    setOpenAddMember(true)
                  }}
                  className="rounded-lg py-2 cursor-pointer"
                >
                  <UserPlus size={15} className="mr-2 text-blue-500" />
                  <span>Thêm thành viên</span>
                </DropdownMenuItem>
              )}

              <DropdownMenuItem
                onClick={handleDelete}
                className="text-red-600 focus:text-red-700 focus:bg-red-50 rounded-lg py-2 cursor-pointer"
              >
                <Trash2 size={15} className="mr-2" />
                <span>Xóa hội thoại</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
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