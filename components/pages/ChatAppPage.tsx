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
import SocketProvider from "@/provider/SocketProvider"
import { SmartLayout } from "../SmartLayout"
import FooterWindowChat from "../chat/FooterWindowChat"
import NavbarWindowChat from "../chat/NavbarWindowChat"
import { Command } from "lucide-react"
import { NavUser } from "../sidebar/nav-user"

const ChatAppPage = () => {


  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const { conversations, currentUserId, setConversations, setCurrentUserId } = useChatStore()



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
    <SocketProvider>

      <SmartLayout direction="horizontal" className="h-screen">

        {/* Conversation List */}
        <SmartLayout.Header initialSize={450}
              minSnapSize={450}
              resizable
              collapsible
              persistKey="chat-sidebar1"
              className="border-r bg-muted"
              resizableBarClass={(props) =>
                props + "bg-transparent! hover:bg-transparent! transition-colors "
              }
            >
          <SmartLayout>
            <SmartLayout.Footer >
              {/* HEADER */}
              <div className="border-b px-4 py-3 h-16 flex items-center">
                <div className="flex items-center gap-2">
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-black text-white">
                    <Command className="w-4 h-4" />
                  </div>

                  <div className="leading-tight">
                    <p className="text-sm font-medium">ChatApp</p>
                    <p className="text-xs text-gray-400">Talk with friends</p>
                  </div>
                </div>
              </div>
            </SmartLayout.Footer>
            <SmartLayout.Body
              initialSize={450}
              minSnapSize={450}
              resizable
              collapsible
              persistKey="chat-sidebar"
              className="border-r bg-muted"
              resizableBarClass={(props) =>
                props + "bg-transparent! hover:bg-transparent! transition-colors "
              }
              scroll={{ x: false, y: true }}>

              <div className="w-full">
                {user && (
                  <AppSidebar
                    conversations={conversations}
                    currentUserId={user._id}
                    user={user}
                  />
                )}
              </div>

            </SmartLayout.Body>
            <SmartLayout.Footer>
              {/* FOOTER */}
              <div className="border-t h-16 px-3 flex items-center">
                <NavUser user={user} />
              </div>

            </SmartLayout.Footer>

          </SmartLayout>


        </SmartLayout.Header>

        {/* Chat Area */}
        <SmartLayout direction="vertical">

          <SmartLayout.Footer className="h-16 border-b">
            <NavbarWindowChat />
          </SmartLayout.Footer>

          <SmartLayout.Body scroll={{ x: false, y: true }}>
            <div className="flex-1 flex flex-col min-h-0">
              <ChatWindowSwitcher />
            </div>
          </SmartLayout.Body>

          <SmartLayout.Footer className="h-16 border-t">
            <FooterWindowChat />
          </SmartLayout.Footer>

        </SmartLayout>

      </SmartLayout>
      <SidebarProvider>

        <></>
        {/* {currentUserId && conversations && conversations?.length > 0 && 
      <div className='flex h-screen w-full p-2 ml-10'>
        <ChatWindowLayout/>
      </div>
      } */}
      </SidebarProvider>

    </SocketProvider>
  )
}

export default ChatAppPage
