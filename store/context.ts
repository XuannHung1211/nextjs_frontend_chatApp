"use client"

import { createContext , useContext } from "react"
import { Conversation } from "@/lib/types/chat"

interface ChatContextType {
    conversation:Conversation|null
    currentUserId:string|null

}

export const chatContext = createContext<ChatContextType>({
    conversation:null,
    currentUserId:null
})

export const useChatContext = () => useContext(chatContext)