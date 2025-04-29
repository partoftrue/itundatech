"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useAuth } from "./auth-provider"
import { AuthInput } from "./auth-input"
import { motion } from "framer-motion"
import { CheckCircle } from "lucide-react"

export function RegisterForm() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [verificationSent, setVerificationSent] = useState(false)
  const { signUp } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const { user, session } = await signUp(email, password, name)

      // If we have a session, the user was auto-confirmed
      if (session) {
        window.location.href = "/"
      } else {
        // Otherwise, show the verification message
        setVerificationSent(true)
      }
    } catch (error: any) {
      console.error("Registration error:", error)

      if (error.message && error.message.includes("already registered")) {
        setError("This email is already registered. Please sign in instead.")
      } else {
        setError(error.message || "An error occurred during registration")
      }
    } finally {
      setIsLoading(false)
    }
  }

  if (verificationSent) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center space-y-6 py-8"
      >
        <div className="mx-auto bg-brand/10 p-4 rounded-full w-fit">
          <CheckCircle className="h-10 w-10 text-brand" />
        </div>
        <h2 className="text-xl font-medium">Verification email sent</h2>
        <p className="text-gray-500 dark:text-gray-400 max-w-sm mx-auto">
          We've sent a verification email to <strong>{email}</strong>. Please check your inbox and click the link to
          verify your account.
        </p>
        <div className="pt-4">
          <Button variant="outline" className="rounded-xl" onClick={() => (window.location.href = "/auth")}>
            Return to sign in
          </Button>
        </div>
      </motion.div>
    )
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
          id="name"
          type="text"
          placeholder="Full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

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
          placeholder="Password (min. 6 characters)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
        />

        <p className="text-xs text-gray-500 dark:text-gray-400">
          By creating an account, you agree to our{" "}
          <a href="/terms" className="text-brand hover:underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="/privacy" className="text-brand hover:underline">
            Privacy Policy
          </a>
          .
        </p>
      </div>

      <Button
        type="submit"
        className="w-full py-6 rounded-xl bg-brand hover:bg-brand/90 text-white font-medium text-base"
        disabled={isLoading}
      >
        {isLoading ? (
          <div className="flex items-center justify-center">
            <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
            <span>Creating account...</span>
          </div>
        ) : (
          "Create account"
        )}
      </Button>
    </form>
  )
}
