"use client"


import { Conversation } from "@/lib/types/chat"
import ChatCard from "./ChatCard"
import { useChatStore } from "@/store/useChatStore"
import { useEffect } from "react"




const ChatDirectList = () => {
  const {selectedConversation , currentUserId , conversations , setSelectedConversation , setActiveConversationId} = useChatStore()
  const directChats = conversations.filter(c => c.type === "direct")
 
  

  function handleCurrentConversation(conversation: Conversation) {
  setSelectedConversation(conversation)
  setActiveConversationId(conversation._id)
}

  useEffect(() => {
      console.log("eeee" , selectedConversation)
  } ,[selectedConversation])

  return (
    
    <div className="space-y-2">
      {directChats.map((convo :Conversation) => (
        <ChatCard
          conversationId={convo._id}
          handleClick={() => handleCurrentConversation(convo)}
          key={convo._id}
        
        />
      ))}
      
    </div>  
  )
}

export default ChatDirectList
