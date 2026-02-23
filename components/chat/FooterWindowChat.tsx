"use client"

import { Smile, SendHorizonal } from "lucide-react"
import { useChatStore } from "@/store/useChatStore"
import { useState } from "react"
import axios from "axios"

const FooterWindowChat = () => {
  const { activeConversationId , conversations } = useChatStore()
  if (!activeConversationId) return null

  const conversation = conversations.find(
    c => c._id === activeConversationId
  )

  const [content , setContent] = useState("")
   

 const handleClickSendMessage = async () => {
  if (!content.trim()) return

  const api =
    conversation?.type === "group"
      ? "http://localhost:5001/api/message/group"
      : "http://localhost:5001/api/message/direct"

  await axios.post(
    api,
    {
      conversationId: activeConversationId,
      content
    },
    {
      withCredentials: true
    }
  )

  setContent("")
}

  return (
    <div className="h-20 border-t bg-white px-4 flex items-center">
      <div className="flex items-center w-full gap-2 bg-gray-100 rounded-full px-3 py-2 focus-within:ring-2 focus-within:ring-blue-400 transition">

        <button className="text-gray-500 hover:text-gray-700 transition">
          <Smile size={22} />
        </button>

        <input
          className="flex-1 bg-transparent outline-none px-2 text-sm placeholder:text-gray-400"
          placeholder="Nhập tin nhắn..."
          value={content}
          onChange={(p) => setContent(p.target.value)}

        />

        <button className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full transition shadow-sm">
          <SendHorizonal size={18}
          onClick={handleClickSendMessage}
          />
        </button>

      </div>
    </div>
  )
}

export default FooterWindowChat