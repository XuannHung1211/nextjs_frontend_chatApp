"use client"

import NavbarWindowChat from "./NavbarWindowChat"
import MainWindowChat from "./MainWindowChat"
import FooterWindowChat from "./FooterWindowChat"

const ChatWindowLayout = () => {
  return (
    <div className="flex flex-col h-full">
      <NavbarWindowChat />
      <MainWindowChat />
      <FooterWindowChat />
    </div>
  )
}

export default ChatWindowLayout