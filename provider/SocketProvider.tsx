"use client"

import { useSocketLastMessage } from "@/hooks/useLastMessage"
import { useSocket } from "@/hooks/useSocket"
import { useSocketFriend } from "@/hooks/useSocketFriend"
import { useSocketMessage } from "@/hooks/useSocketMessage"
import { useChatStore } from "@/store/useChatStore"
import { ReactNode } from "react"

const SocketProvider = ({children } :{children:ReactNode}) => {
  const currentUserId = useChatStore(s => s.currentUserId)

  useSocket(currentUserId || undefined)
  useSocketMessage()
  useSocketLastMessage()
  useSocketFriend()

  return children
}

export default SocketProvider