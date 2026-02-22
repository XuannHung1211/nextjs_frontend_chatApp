import { Conversation } from "@/lib/types/chat"
import {create} from "zustand"

interface ChatStore {
  currentUserId: string | null
  conversations: Conversation[]
  selectedConversation: Conversation | null
  activeConversationId: string | null

  setCurrentUserId: (id: string) => void
  setConversations: (data: Conversation[]) => void
  setSelectedConversation: (c: Conversation) => void
  setActiveConversationId: (id: string) => void

  addConversation: (conversation: Conversation) => void
  updateConversation: (conversationId: string, data: Partial<Conversation>) => void
}

export const useChatStore = create<ChatStore>((set) => ({
  currentUserId: null,
  conversations: [],
  selectedConversation: null,
  activeConversationId: null,

  setCurrentUserId: (id) => set({ currentUserId: id }),

  setConversations: (data) => set({ conversations: data }),

  setSelectedConversation: (c) => set({ selectedConversation: c }),

  setActiveConversationId: (id) => set({ activeConversationId: id }),

  addConversation: (conversation) =>
    set((state) => ({
      conversations: [conversation, ...state.conversations]
    })),

  updateConversation: (conversationId, data) =>
    set((state) => ({
      conversations: state.conversations.map(c =>
        c._id === conversationId ? { ...c, ...data } : c
      )
    }))
}))