"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { AuthInput } from "@/components/auth/auth-input"
import { motion } from "framer-motion"
import { CheckCircle } from "lucide-react"
import Link from "next/link"
import { createClientSupabaseClient } from "@/lib/supabase"
import { useRouter } from "next/navigation"

export default function UpdatePasswordPage() {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [passwordUpdated, setPasswordUpdated] = useState(false)
  const [validResetLink, setValidResetLink] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check if the reset link is valid
    const checkResetLink = async () => {
      const supabase = createClientSupabaseClient()
      const { data, error } = await supabase.auth.getSession()

      if (error || !data.session) {
        setValidResetLink(false)
      }
    }

    checkResetLink()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    // Validate passwords match
    if (password !== confirmPassword) {
      setError("Passwords don't match")
      setIsLoading(false)
      return
    }

    try {
      const supabase = createClientSupabaseClient()

      const { error } = await supabase.auth.updateUser({
        password,
      })

      if (error) throw error

      setPasswordUpdated(true)

      // Sign out after password update
      setTimeout(async () => {
        await supabase.auth.signOut()
        router.push("/auth")
      }, 5000)
    } catch (error: any) {
      console.error("Password update error:", error)
      setError(error.message || "An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  if (!validResetLink) {
    return (
      <div className="text-center space-y-6 py-8">
        <h2 className="text-xl font-medium">Invalid or expired link</h2>
        <p className="text-gray-500 dark:text-gray-400 max-w-sm mx-auto">
          This password reset link is invalid or has expired. Please request a new password reset link.
        </p>
        <div className="pt-4">
          <Button className="rounded-xl" asChild>
            <Link href="/auth/reset-password">Request new link</Link>
          </Button>
        </div>
      </div>
    )
  }

  if (passwordUpdated) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center space-y-6 py-8"
      >
        <div className="mx-auto bg-green-100 dark:bg-green-900/30 p-4 rounded-full w-fit">
          <CheckCircle className="h-10 w-10 text-green-600 dark:text-green-400" />
        </div>
        <h2 className="text-xl font-medium">Password updated</h2>
        <p className="text-gray-500 dark:text-gray-400 max-w-sm mx-auto">
          Your password has been successfully updated. You can now sign in with your new password.
        </p>
        <div className="pt-4">
          <Button className="rounded-xl py-6 px-8 bg-brand hover:bg-brand/90 text-white font-medium" asChild>
            <Link href="/auth">Sign in</Link>
          </Button>
        </div>
        <p className="text-sm text-gray-400">You will be redirected to the sign in page in a few seconds...</p>
      </motion.div>
    )
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-medium">Set new password</h1>

      <p className="text-gray-500 dark:text-gray-400">Enter your new password below.</p>

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

        <AuthInput
          id="password"
          type="password"
          placeholder="New password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
        />

        <AuthInput
          id="confirmPassword"
          type="password"
          placeholder="Confirm new password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          minLength={6}
        />

        <Button
          type="submit"
          className="w-full py-6 rounded-xl bg-brand hover:bg-brand/90 text-white font-medium text-base"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
              <span>Updating password...</span>
            </div>
          ) : (
            "Update password"
          )}
        </Button>
      </form>
    </div>
  )
}
