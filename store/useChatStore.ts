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

}))