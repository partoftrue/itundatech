"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useAuth } from "./auth-provider"
import { useRouter } from "next/navigation"
import { AuthInput } from "./auth-input"
import { motion } from "framer-motion"
import Link from "next/link"

export function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { signIn } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      await signIn(email, password)
      router.push("/")
      router.refresh()
    } catch (error: any) {
      console.error("Login error:", error)

      if (error.message && error.message.includes("verify your email")) {
        setError("Please verify your email before signing in.")
      } else if (error.message && error.message.includes("Invalid login")) {
        setError("Invalid email or password.")
      } else {
        setError("An error occurred. Please try again.")
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm"
        >
          {error}
        </motion.div>
      )}

      <div className="space-y-4">
        <AuthInput
          id="email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <AuthInput
          id="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <div className="text-right">
          <Link href="/auth/reset-password" className="text-sm text-brand hover:underline">
            Forgot password?
          </Link>
        </div>
      </div>

      <Button
        type="submit"
        className="w-full py-6 rounded-xl bg-brand hover:bg-brand/90 text-white font-medium text-base"
        disabled={isLoading}
      >
        {isLoading ? (
          <div className="flex items-center justify-center">
            <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
            <span>Signing in...</span>
          </div>
        ) : (
          "Sign in"
        )}
      </Button>
    </form>
  )
}
