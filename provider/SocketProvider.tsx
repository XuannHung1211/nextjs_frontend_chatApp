"use client"

import { useSocket } from "@/hooks/useSocket"
import { useSocketMessage } from "@/hooks/useSocketMessage"
import { useChatStore } from "@/store/useChatStore"
import { ReactNode } from "react"

const SocketProvider = ({children } :{children:ReactNode}) => {
  const currentUserId = useChatStore(s => s.currentUserId)

  useSocket(currentUserId || undefined)
  useSocketMessage()

  return children
}

export default SocketProvider