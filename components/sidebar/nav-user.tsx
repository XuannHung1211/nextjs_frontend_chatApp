"use client"

import axios from "axios"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { User } from "@/lib/types/user"
import { useEffect, useState } from "react"
import { useChatStore } from "@/store/useChatStore"
import { useUserStore } from "@/store/useUserStore"

interface Props {
  user: User
}

export function NavUser({ user : initialUser }: Props) {

  const {setCurrentUserId} = useChatStore()

  const router = useRouter()
  
 
  const {setUser , user} = useUserStore()


  const handleLogout = async () => {
    try {

      await axios.post(
        "http://localhost:5001/api/auth/signout",
        {},
        { withCredentials: true }
      )

      router.replace("/signin")

    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {

    const fetchUser = async () => {
      try {
        const res  = await axios.get(`http://localhost:5001/api/users/me` , { withCredentials:true})
        console.log(res.data)
        console.log(res.data._id)
        setCurrentUserId(res.data._id)
        
        setUser(res.data)
    } catch (error) {
      console.log("Lỗi fetch user detail ",error)

      }
    }

    fetchUser()

  } ,[])

  if(!user) return null

  return (
    <div className="flex items-center justify-between w-full">

      {/* User Info */}
      <div className="flex items-center gap-2">

        {/* Avatar */}
        <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200">
          {user.avatarUrl ? (
            <img
              src={user.avatarUrl}
              alt="avatar"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-xs">
              {user.displayName?.charAt(0).toUpperCase()}
            </div>
          )}
        </div>

        {/* Name */}
        <div className="text-sm">
          <p className="font-medium">
            {user.displayName}
          </p>
          <p className="text-xs text-muted-foreground">
            @{user.username}
          </p>
        </div>

      </div>

      {/* Logout */}
      <Button size="sm" onClick={handleLogout}>
        Logout
      </Button>

    </div>
  )
}
