"use client"

import { useChatStore } from "@/store/useChatStore"
import ChatWindowLayout from "./ChatWindowLayout"
import { EmptyChatState } from "./EmptyChatState"


const ChatWindowSwitcher = () => {
  const activeConversationId = useChatStore(s => s.activeConversationId)

  if (!activeConversationId) {
    return <EmptyChatState />
  }

  return <ChatWindowLayout />
}

export default ChatWindowSwitcher