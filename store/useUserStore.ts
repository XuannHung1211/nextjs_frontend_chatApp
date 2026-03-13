import { Conversation, Message } from "@/lib/types/chat"
import { create } from "zustand"

interface UserStore {
    user: any | null

    setUser: (data: any) => void

}

export const useUserStore = create<UserStore>((set) => ({


    setUser: (data) => set({ user: data }),

    user: null


}))
