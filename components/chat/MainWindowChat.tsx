"use client"
import { useChatStore } from "@/store/useChatStore"
import MessageCard from "./MessageCard"

const MainWindowChat = () => {
  const activeConversationId = useChatStore(s => s.activeConversationId)

  if (!activeConversationId) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-400">
        Chọn một cuộc trò chuyện để bắt đầu
      </div>
    )
  }

  // Bỏ overflow-y-auto ở đây, để MessageCard xử lý
  return (
    <div className="flex-1 h-full relative overflow-hidden bg-white dark:bg-zinc-950">
      <MessageCard />
    </div>
  )
}

export default MainWindowChat