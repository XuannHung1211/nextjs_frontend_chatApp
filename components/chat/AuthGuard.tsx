"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import axiosClient from "@/lib/axios_config"

export default function AuthGuard({
  children,
}: {
  children: React.ReactNode
}) {

  const router = useRouter()

  const [loading, setLoading] =
    useState(true)

  useEffect(() => {

    const checkAuth =
      async () => {

        try {

          await axiosClient.get(
            "/api/users/me",
            {
              withCredentials: true
            }
          )

          setLoading(false)

        } catch (error) {

          router.push("/signin")
        }
      }

    checkAuth()

  }, [])

  if (loading) {

    return (
      <div>
        Loading...
      </div>
    )
  }

  return children
}