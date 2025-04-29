"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { useAuth } from "@/components/auth/auth-provider"

interface AuthGuardProps {
  children: React.ReactNode
}

export function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter()
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null)
  const { user, isLoading: authLoading } = useAuth()

  useEffect(() => {
    const checkAuth = async () => {
      if (authLoading) {
        return
      }

      if (!user) {
        router.push("/auth")
        setIsAuthorized(false)
        return
      }

      setIsAuthorized(true)
    }

    checkAuth()
  }, [user, router, authLoading])

  if (isAuthorized === null || authLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (isAuthorized === false) {
    return null
  }

  return <>{children}</>
}
