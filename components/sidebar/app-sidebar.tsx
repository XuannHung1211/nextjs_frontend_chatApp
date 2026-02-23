"use client"

import * as React from "react"
import { Command } from "lucide-react"

import CreateNewGroup from "../chat/CreateNewGroup"
import ChatGroupList from "../chat/ChatGroupList"
import CreateDirectChat from "../chat/CreateDirectChat"
import ChatDirectList from "../chat/ChatDirectList"
import { NavUser } from "./nav-user"

import { Conversation } from "@/lib/types/chat"
import { User } from "@/lib/types/user"

interface Props {
  conversations: Conversation[]
  currentUserId: string
  user: User
}

export function AppSidebar({
  conversations,
  currentUserId,
  user
}: Props) {

  return (
    <aside className="h-screen w-72 border-r flex flex-col bg-white">

      {/* HEADER */}
      <div className="border-b px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-black text-white">
            <Command className="w-4 h-4" />
          </div>

          <div className="leading-tight">
            <p className="text-sm font-medium">ChatApp</p>
            <p className="text-xs text-gray-400">Talk with friends</p>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="flex-1 overflow-hidden flex flex-col px-2 py-3 gap-4">



        <div className="flex flex-col w-full overflow-y-auto scrollbar-thin">
          {/* GROUP */}
          <div>
            <div className="flex items-center justify-between px-2 mb-2">
              <h3 className="text-xs font-semibold text-gray-400 uppercase">
                Group Chats
              </h3>
              <CreateNewGroup />
            </div>

            <div className="space-y-1">
              <ChatGroupList />
            </div>
          </div>

          <div className="h-px bg-gray-200 my-3" />

          {/* DIRECT */}
          <div>
            <div className="flex items-center justify-between px-2 mb-2">
              <h3 className="text-xs font-semibold text-gray-400 uppercase">
                Direct Messages
              </h3>
              <CreateDirectChat />
            </div>

            <div className="space-y-1">
              <ChatDirectList />
            </div>
          </div>

        </div>

      </div>

      {/* FOOTER */}
      <div className="border-t h-14 px-3 flex items-center">
        <NavUser user={user} />
      </div>

    </aside>
  )
}