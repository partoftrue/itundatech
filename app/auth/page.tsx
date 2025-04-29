"use client"

import { useAuth } from "@/components/auth/auth-provider"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { LoginForm } from "@/components/auth/login-form"
import { RegisterForm } from "@/components/auth/register-form"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function AuthPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [view, setView] = useState<"login" | "register">("login")

  // Check if there's a mode parameter in the URL
  useEffect(() => {
    const mode = searchParams.get("mode")
    if (mode === "register") {
      setView("register")
    } else {
      setView("login")
    }
  }, [searchParams])

  // Redirect if user is already logged in
  useEffect(() => {
    if (user && !isLoading) {
      router.push("/")
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={view}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.2 }}
      >
        {view === "login" ? (
          <div className="space-y-6">
            <div className="text-center">
              <h1 className="text-2xl font-medium mb-1">Welcome back</h1>
              <p className="text-gray-500 dark:text-gray-400">Sign in to your account to continue</p>
            </div>
            <LoginForm />
            <div className="text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Don't have an account?{" "}
                <Button
                  variant="link"
                  className="p-0 h-auto text-brand font-medium"
                  onClick={() => setView("register")}
                >
                  Create account
                </Button>
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center">
              <Button variant="ghost" size="icon" className="rounded-full mr-2" onClick={() => setView("login")}>
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <h1 className="text-2xl font-medium">Create account</h1>
            </div>
            <RegisterForm />
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  )
}
