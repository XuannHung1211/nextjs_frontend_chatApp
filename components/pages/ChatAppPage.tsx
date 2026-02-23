"use client"

import axios from "axios"
import { useEffect, useState } from "react"

import { SidebarProvider } from '../ui/sidebar'
import { AppSidebar } from '../sidebar/app-sidebar'
import ChatWindowLayout from '../chat/ChatWindowLayout'

import { Conversation } from "@/lib/types/chat"
import { User } from "@/lib/types/user"
import { useChatStore } from "@/store/useChatStore"
import ChatWindowSwitcher from "../chat/ChatWindowSwitcher"

const ChatAppPage = () => {

  
  const [user , setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const {conversations , currentUserId, setConversations , setCurrentUserId } = useChatStore()
  
  

  useEffect(() => {

    const fetchData = async () => {
      try {

        const [convoRes, userRes] = await Promise.all([
          axios.get("http://localhost:5001/api/conversation", { withCredentials: true }),
          axios.get("http://localhost:5001/api/users/me", { withCredentials: true })
        ])

        setConversations(convoRes.data.conversations)
        setCurrentUserId(convoRes.data.currentUserId)
        setUser(userRes.data)

      } catch (err) {
        console.log("Fetch error:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()

  }, [])

  if (loading || !user) return null


  
  return (
    <SidebarProvider>

      {user && (
      <AppSidebar
        conversations={conversations}
        currentUserId={user._id}
        user={user}
      />
)}

        <div className="flex-1 flex flex-col min-h-0">
        <ChatWindowSwitcher />
      </div>

      {/* {currentUserId && conversations && conversations?.length > 0 && 
      <div className='flex h-screen w-full p-2 ml-10'>
        <ChatWindowLayout/>
      </div>
      } */}
    </SidebarProvider>
  )
}

export default ChatAppPage
