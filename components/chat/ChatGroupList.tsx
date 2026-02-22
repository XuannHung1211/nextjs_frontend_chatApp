"use client"

import { Conversation } from "@/lib/types/chat"
import ChatCard from "./ChatCard"
import { useChatStore } from "@/store/useChatStore"

const ChatGroupList = () => {
  const {selectedConversation , currentUserId , conversations , setSelectedConversation , setActiveConversationId} = useChatStore()
  const groupChats = conversations.filter(c => c.type === "group")
 
  
  
 
function handleCurrentConversation(conversation: Conversation) {
  setSelectedConversation(conversation)
  setActiveConversationId(conversation._id)
}

  return (
    
    <div className="space-y-2">
      {groupChats.map((convo :Conversation) => (
        <ChatCard
          conversationId={convo._id}
          handleClick={() => handleCurrentConversation(convo)}
          key={convo._id}
        
        />
      ))}
      
    </div>  
  )
}

export default ChatGroupList
