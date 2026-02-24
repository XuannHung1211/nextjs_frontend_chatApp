import { useSocketStore } from "@/store/useSocketStore"

export const useSendSocketMessage = () => {
  const socket = useSocketStore(s => s.socket)

  const sendMessageRealtime = (data: {
    conversationId: string
    content: string
    recipientId?: string
  }) => {
    socket?.emit("send-message", data)
  }

  return { sendMessageRealtime }
}