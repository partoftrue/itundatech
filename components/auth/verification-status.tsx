"use client"

import { useAuth } from "@/components/auth/auth-provider"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { CheckCircle2, AlertTriangle } from "lucide-react"
import { useState } from "react"

export function VerificationStatus() {
  const { user, resendVerificationEmail } = useAuth()
  const [isResending, setIsResending] = useState(false)
  const [resendSuccess, setResendSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  if (!user) return null

  const isVerified = !!user.email_confirmed_at

  const handleResendVerification = async () => {
    if (!user.email) return

    setIsResending(true)
    setError(null)
    setResendSuccess(false)

    try {
      await resendVerificationEmail(user.email)
      setResendSuccess(true)
    } catch (error: any) {
      setError(error.message || "Failed to resend verification email")
    } finally {
      setIsResending(false)
    }
  }

  if (isVerified) {
    return (
      <Alert className="bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-900">
        <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
        <AlertTitle>Email Verified</AlertTitle>
        <AlertDescription>Your email address has been verified.</AlertDescription>
      </Alert>
    )
  }

  return (
    <Alert className="bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-900">
      <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
      <AlertTitle>Email Not Verified</AlertTitle>
      <AlertDescription className="flex flex-col gap-2">
        <p>Please verify your email address to access all features.</p>
        {resendSuccess ? (
          <p className="text-green-600 dark:text-green-400 text-sm">
            Verification email sent! Please check your inbox.
          </p>
        ) : error ? (
          <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
        ) : null}
        <Button variant="outline" size="sm" onClick={handleResendVerification} disabled={isResending} className="w-fit">
          {isResending ? "Sending..." : "Resend Verification Email"}
        </Button>
      </AlertDescription>
    </Alert>
  )
}
