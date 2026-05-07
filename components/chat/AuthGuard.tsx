"use client"

import { useEffect, useState } from "react"
import axiosClient from "@/lib/axios_config"

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const check = async () => {
      try {
        await axiosClient.get("/api/users/me")
      } catch {
        // middleware đã xử lý redirect rồi
      } finally {
        setLoading(false)
      }
    }

    check()
  }, [])

  if (loading) return <div>Loading...</div>

  return <>{children}</>
}