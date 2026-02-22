"use client"

import * as React from "react"
import { Command } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

import CreateNewGroup from "../chat/CreateNewGroup"
import ChatGroupList from "../chat/ChatGroupList"
import CreateDirectChat from "../chat/CreateDirectChat"
import ChatDirectList from "../chat/ChatDirectList"
import { NavUser } from "./nav-user"

import { Conversation } from "@/lib/types/chat"
import { User } from "@/lib/types/user"

interface Props extends React.ComponentProps<typeof Sidebar> {
  conversations: Conversation[]
  currentUserId: string
  user: User
}

export function AppSidebar({
  conversations,
  currentUserId,
  user,
  ...props
}: Props) {
  return (
    <Sidebar
      variant="inset"
      {...props}
      className="h-screen w-72 border-r"
    >

      {/* Header */}
      <SidebarHeader className="border-b">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#" className="flex gap-2 items-center">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex size-8 items-center justify-center rounded-lg">
                  <Command className="size-4" />
                </div>
                <div className="grid text-left text-sm leading-tight">
                  <span className="font-medium">ChatApp</span>
                  <span className="text-xs text-muted-foreground">
                    Talk with friends
                  </span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* Content */}
      <SidebarContent className="flex flex-col overflow-hidden px-2 py-3 gap-4">

        {/* GROUP */}
        <div className="flex flex-col min-h-0">
          <div className="flex items-center justify-between px-2 mb-2">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase">
              Group Chats
            </h3>
            <CreateNewGroup />
          </div>

          <div className="flex-1 overflow-y-auto">
            <ChatGroupList
             
            />
          </div>
        </div>

        <div className="h-px bg-border" />

        {/* DIRECT */}
        <div className="flex flex-col min-h-0">
          <div className="flex items-center justify-between px-2 mb-2">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase">
              Direct Messages
            </h3>
            <CreateDirectChat />
          </div>

          <div className="flex-1 overflow-y-auto">
            <ChatDirectList
              
            />
          </div>
        </div>

      </SidebarContent>

      {/* Footer */}
      <SidebarFooter className="border-t h-14 px-3 flex items-center">
        <NavUser user={user} />
      </SidebarFooter>

    </Sidebar>
  )
}
