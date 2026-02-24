import { Conversation, Message } from "@/lib/types/chat"
import { create } from "zustand"

interface ChatStore {
  currentUserId: string | null
  conversations: Conversation[]
  activeConversationId: string | null
  messagesByConversationId: Record<string, Message[]>

  setCurrentUserId: (id: string) => void
  setConversations: (data: Conversation[]) => void
  setActiveConversationId: (id: string) => void
  setMessages: (conversationId: string, messages: Message[]) => void

  addMessage: (message: Message & { tempId?: string }) => void
}

export const useChatStore = create<ChatStore>((set) => ({
  currentUserId: null,
  conversations: [],
  activeConversationId: null,
  messagesByConversationId: {},

  setCurrentUserId: (id) => set({ currentUserId: id }),

  setConversations: (data) => set({ conversations: data }),

  setActiveConversationId: (id) => set({ activeConversationId: id }),

  setMessages: (conversationId, messages) =>
    set((state) => ({
      messagesByConversationId: {
        ...state.messagesByConversationId,
        [conversationId]: messages
      }
    })),

  // 🚀 Realtime smart addMessage
 addMessage: (message) =>
  set((state) => {
    const msgs = state.messagesByConversationId[message.conversationId] || []

    // Kiểm tra nếu tin nhắn trả về có tempId trùng với tin nhắn tạm đang hiện
    if (message.tempId) {
      const index = msgs.findIndex(m => m._id === message.tempId)
      if (index !== -1) {
        const newMsgs = [...msgs]
        newMsgs[index] = message // Replace tin nhắn tạm bằng tin nhắn thật từ server
        return {
          messagesByConversationId: {
            ...state.messagesByConversationId,
            [message.conversationId]: newMsgs
          }
        }
      }
    }

    // Tránh duplicate
    if (msgs.some(m => m._id === message._id)) return state

    return {
      messagesByConversationId: {
        ...state.messagesByConversationId,
        [message.conversationId]: [...msgs, message]
      }
    }
  })


  
}))
