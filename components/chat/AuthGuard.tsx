"use client"

import { useEffect, useState } from "react"
import axiosClient from "@/lib/axios_config"

export default function AuthGuard({
  children,
}: {
  children: React.ReactNode
}) {

  const [loading, setLoading] =
    useState(true)

  const [authorized, setAuthorized] =
    useState(false)

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

          setAuthorized(true)

        } catch {

          window.location.href =
            "/signin"
        } finally {

          setLoading(false)
        }
      }

    checkAuth()

  }, [])

  if (loading) {

    return <div>Loading...    </div>
  }

  if (!authorized) {

    return null
  }

  return children
}