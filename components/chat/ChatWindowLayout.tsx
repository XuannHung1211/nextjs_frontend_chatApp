"use client"

import NavbarWindowChat from './NavbarWindowChat'
import MainWindowChat from './MainWindowChat'
import FooterWindowChat from './FooterWindowChat'
import { useChatStore } from '@/store/useChatStore'

const ChatWindowLayout = () => {

  const { selectedConversation, currentUserId } = useChatStore()

  if (!selectedConversation || !currentUserId) return null

  return (
    <div className="flex flex-col h-full">

      <NavbarWindowChat />

      <MainWindowChat />

      <FooterWindowChat />

    </div>
  )
}

export default ChatWindowLayout