"use client"
import { useEffect } from "react"
import { useSocketStore } from "@/store/useSocketStore"
import { useChatStore } from "@/store/useChatStore"

export const useSocketMessage = () => {
  const socket = useSocketStore(s => s.socket)
  const addMessage = useChatStore(s => s.addMessage)

  useEffect(() => {
    if (!socket) return

    // Server emit "receive-message" thì ở đây phải nghe đúng tên đó
    socket.on("receive-message", (message) => {
      addMessage(message)
    })

    return () => {
      socket.off("receive-message")
    }
  }, [socket, addMessage])
}