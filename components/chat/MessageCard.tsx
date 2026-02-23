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
    <div className="flex flex-col gap-3">
      {messages?.map(msg => {
        const isMine = msg.senderId === currentUserId

        return (
          <div
            key={msg._id}
            className={`flex ${isMine ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`
                max-w-[70%]
                px-4 py-2
                rounded-2xl
                text-sm
                shadow-sm
                break-words
                ${isMine
                  ? "bg-blue-500 text-white rounded-br-md"
                  : "bg-gray-100 text-gray-800 rounded-bl-md"}
              `}
            >
              {msg.content}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default MessageCard