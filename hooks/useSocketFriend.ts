"use client"

import { useEffect } from "react"
import { useSocketStore } from "@/store/useSocketStore"
import { useFriendStore } from "@/store/useFriendStore"

export const useSocketFriend = () => {

  const socket = useSocketStore(s => s.socket)

  const addIncomingRequest = useFriendStore(s => s.addIncomingRequest)

  useEffect(() => {

    if (!socket) return

    const handleFriendRequest = (request:any) => {
      console.log("REALTIME FRIEND REQUEST:", request)
      addIncomingRequest(request)
    }

    socket.on("friend_request_received", handleFriendRequest)

    return () => {
      socket.off("friend_request_received", handleFriendRequest)
    }

  }, [socket])

}