"use client"

import { useChatStore } from "@/store/useChatStore"
const MessageCard = () => {
  const currentUserId = useChatStore(s => s.currentUserId)
  const activeConversationId = useChatStore(s => s.activeConversationId)

  const messages = useChatStore(
    s => activeConversationId
      ? s.messagesByConversationId[activeConversationId]
      : []
  )

  if (!activeConversationId) return null

  return (
    <div className="flex flex-col gap-3 p-4">
      {messages?.map(msg => {
        // ✅ Sửa logic isMine: 
        // 1. Nếu là tin nhắn tạm (senderId là "me")
        // 2. Nếu là tin nhắn từ DB (senderId trùng với currentUserId)
        const isMine = msg.senderId === currentUserId || msg.senderId === "me"

        return (
          <div key={msg._id} className={`flex flex-col ${isMine ? "items-end" : "items-start"}`}>
            {/* Tên người gửi - Chỉ hiển thị nếu không phải mình hoặc tùy chỉnh theo UI */}
          {
            isMine ?(<span className="text-[10px] font-medium text-gray-500 mb-1 ml-1">
               You
              </span>) : 
            (
              <span className="text-[10px] font-medium text-gray-500 mb-1 ml-1">
                {msg?.senderInfor?.displayName || msg?.displayName }
              </span>)
          }
              
       

            <div className={`flex w-full ${isMine ? "justify-end" : "justify-start"}`}>
              <div
                className={`
                  max-w-[75%] px-4 py-2 rounded-2xl text-sm shadow-sm break-words
                  ${isMine
                    ? "bg-blue-500 text-white rounded-tr-none" 
                    : "bg-gray-200 text-gray-800 rounded-tl-none"
                  }
                `}
              >
                {msg.content}
              </div>
            </div>
            
            {/* (Tùy chọn) Hiển thị thời gian tin nhắn nhỏ ở dưới */}
            {/* <span className="text-[9px] text-gray-400 mt-1">12:30 PM</span> */}
          </div>
        )
      })}
    </div>
  )
}

export default MessageCard