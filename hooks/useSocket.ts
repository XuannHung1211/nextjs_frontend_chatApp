"use client"

import { useEffect } from "react"
import { useSocketStore } from "@/store/useSocketStore"

export const useSocket = (userId?: string) => {
  const { connect, disconnect, socket, isConnected, onlineUsers } = useSocketStore()

  useEffect(() => {
    if (!userId) return

    connect(userId)

    return () => {
      disconnect()
    }
  }, [userId])

  return {
    socket,
    isConnected,
    onlineUsers
  }
}