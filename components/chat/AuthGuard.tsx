"use client"

import { useEffect, useState } from "react"
import axiosClient from "@/lib/axios_config"
import { useRouter, usePathname } from "next/navigation"

export default function AuthGuard({
  children,
}: {
  children: React.ReactNode
}) {
  const [loading, setLoading] = useState(true)
  const [authorized, setAuthorized] = useState(false)

  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axiosClient.get("/api/users/me", {
          withCredentials: true,
        })

        setAuthorized(true)
      } catch (err) {
        setAuthorized(false)

        // chỉ redirect nếu đang vào route cần bảo vệ
        if (pathname.startsWith("/chat")) {
          router.replace("/signin")
        }
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [pathname, router])

  if (loading) return <div>Loading...</div>

  if (!authorized) return null

  return <>{children}</>
}