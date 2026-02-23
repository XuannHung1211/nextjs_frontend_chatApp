"use client"

import { Conversation } from "@/lib/types/chat"
import ChatCard from "./ChatCard"
import { useChatStore } from "@/store/useChatStore"

const ChatGroupList = () => {
  const { conversations } = useChatStore()

  const groupChats = conversations.filter(c => c.type === "group")

  return (
    <div className="space-y-2">
      {groupChats.map((convo: Conversation) => (
        <ChatCard
          key={convo._id}
          conversationId={convo._id}
        />
      ))}
    </div>
  )
}

export default ChatGroupList