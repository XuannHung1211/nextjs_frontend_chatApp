"use client"
import { Smile, SendHorizonal, User } from "lucide-react"
import { useChatStore } from "@/store/useChatStore"
import { useState, useEffect } from "react"
import axios from "axios"
import { useSocketStore } from "@/store/useSocketStore"
import { useUserStore } from "@/store/useUserStore"


const FooterWindowChat = () => {
  const { activeConversationId, conversations, addMessage } = useChatStore()
  const {user} = useUserStore()
  const [content, setContent] = useState("")
  const { socket } = useSocketStore()

  // ✅ Join room để server biết socket này thuộc conversation nào
  useEffect(() => {
    if (socket && activeConversationId) {
      socket.emit("join-conversation", activeConversationId)
    }
  }, [socket, activeConversationId])

  if (!activeConversationId) return null

  const handleClickSendMessage = async () => {
    if (!content.trim()) return

    const tempId = crypto.randomUUID()
    const message = {
      _id: tempId,
      conversationId: activeConversationId,
      content,
      senderId: "me",
      createdAt: new Date().toISOString(),
      temp: true,
      displayName: user?.displayName
    }

    
    // 🚀 Render ngay (Optimistic UI)
    addMessage(message)

    // 🚀 Emit realtime (Dùng đúng tên event bạn đặt)
    socket?.emit("send-messsage-to-friend", {
      conversationId: activeConversationId,
      content,
      tempId,
      displayName: user?.displayName
    })

    // 🚀 Lưu DB (Giữ nguyên code axios của bạn)
    try {
      const conversation = conversations.find(c => c._id === activeConversationId)
      const api = conversation?.type === "group"
        ? "http://localhost:5001/api/message/group"
        : "http://localhost:5001/api/message/direct"

      await axios.post(api, {
        conversationId: activeConversationId,
        content,
        tempId
      }, { withCredentials: true })
    } catch (err) {
      console.error("Lỗi lưu tin nhắn:", err)
    }

    setContent("")
  }

  return (
    <div className="h-16 border-t bg-white px-4 flex items-center">
      <div className="flex items-center w-full gap-2 bg-gray-100 rounded-full px-3 py-2">
        <button className="text-gray-500 hover:text-gray-700">
          <Smile size={22} />
        </button>
        <input
          className="flex-1 bg-transparent outline-none px-2 text-sm"
          placeholder="Nhập tin nhắn..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleClickSendMessage()}
        />
        <button 
          onClick={handleClickSendMessage}
          className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full transition shadow-sm"
        >
          <SendHorizonal size={18} />
        </button>
      </div>
    </div>
  )
}
export default FooterWindowChat