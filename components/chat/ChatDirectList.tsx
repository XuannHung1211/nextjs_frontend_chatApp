"use client"

import { Conversation } from "@/lib/types/chat"
import ChatCard from "./ChatCard"
import { useChatStore } from "@/store/useChatStore"

const ChatDirectList = () => {
  const { conversations, setActiveConversationId } = useChatStore()

  const directChats = conversations.filter(c => c.type === "direct")

  return (
    <div className="space-y-2">
      {directChats.map((convo: Conversation) => (
        <ChatCard
          key={convo._id}
          conversationId={convo._id}
        />
      ))}
    </div>
  )
}

export default ChatDirectList