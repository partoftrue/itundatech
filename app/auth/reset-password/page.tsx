"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { AuthInput } from "@/components/auth/auth-input"
import { motion } from "framer-motion"
import { ArrowLeft, CheckCircle } from "lucide-react"
import Link from "next/link"
import { createClientSupabaseClient } from "@/lib/supabase"

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [resetSent, setResetSent] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const supabase = createClientSupabaseClient()

      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/update-password`,
      })

      if (error) throw error

      setResetSent(true)
    } catch (error: any) {
      console.error("Password reset error:", error)
      setError(error.message || "An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  if (resetSent) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center space-y-6 py-8"
      >
        <div className="mx-auto bg-brand/10 p-4 rounded-full w-fit">
          <CheckCircle className="h-10 w-10 text-brand" />
        </div>
        <h2 className="text-xl font-medium">Check your email</h2>
        <p className="text-gray-500 dark:text-gray-400 max-w-sm mx-auto">
          We've sent a password reset link to <strong>{email}</strong>. Please check your inbox and click the link to
          reset your password.
        </p>
        <div className="pt-4">
          <Button variant="outline" className="rounded-xl" asChild>
            <Link href="/auth">Return to sign in</Link>
          </Button>
        </div>
      </motion.div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Button variant="ghost" size="icon" className="rounded-full mr-2" asChild>
          <Link href="/auth">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-2xl font-medium">Reset password</h1>
      </div>

      <p className="text-gray-500 dark:text-gray-400">
        Enter your email address and we'll send you a link to reset your password.
      </p>

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
          id="email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <Button
          type="submit"
          className="w-full py-6 rounded-xl bg-brand hover:bg-brand/90 text-white font-medium text-base"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
              <span>Sending reset link...</span>
            </div>
          ) : (
            "Send reset link"
          )}
        </Button>
      </form>
    </div>
  )
}
