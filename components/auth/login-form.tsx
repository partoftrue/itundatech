"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "./auth-provider"
import { useRouter } from "next/navigation"
import { Separator } from "@/components/ui/separator"
import Image from "next/image"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Info } from "lucide-react"

export function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isVerificationError, setIsVerificationError] = useState(false)
  const { signIn, signInWithGoogle, resendVerificationEmail } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setIsVerificationError(false)

    try {
      await signIn(email, password)
      router.push("/")
      router.refresh()
    } catch (error: any) {
      console.error("Login error:", error)

      if (error.message && error.message.includes("verify your email")) {
        setIsVerificationError(true)
      } else {
        setError("Invalid email or password")
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true)
    setError(null)

    try {
      await signInWithGoogle()
      // No need to redirect here as the OAuth flow will handle it
    } catch (error) {
      console.error("Google login error:", error)
      setError("Failed to sign in with Google")
      setIsGoogleLoading(false)
    }
  }

  const handleResendVerification = async () => {
    setIsLoading(true)
    setError(null)

    try {
      await resendVerificationEmail(email)
      setError("Verification email sent! Please check your inbox.")
    } catch (error: any) {
      console.error("Resend verification error:", error)
      setError(error.message || "Failed to resend verification email")
    } finally {
      setIsLoading(false)
      setIsVerificationError(false)
    }
  }

  return (
    <div className="space-y-6">
      <Button
        type="button"
        variant="outline"
        onClick={handleGoogleSignIn}
        disabled={isGoogleLoading}
        className="w-full flex items-center justify-center gap-2"
      >
        {isGoogleLoading ? (
          <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        ) : (
          <Image src="/google-logo.png" alt="Google" width={16} height={16} />
        )}
        Sign in with Google
      </Button>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <Separator />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-lg"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="rounded-lg"
            required
          />
        </div>

        {isVerificationError && (
          <Alert variant="destructive" className="bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-900">
            <Info className="h-4 w-4" />
            <AlertDescription>
              Please verify your email before signing in.{" "}
              <Button
                variant="link"
                onClick={handleResendVerification}
                className="p-0 h-auto text-red-600 dark:text-red-400"
              >
                Resend verification email
              </Button>
            </AlertDescription>
          </Alert>
        )}

        {error && <p className="text-sm text-red-500">{error}</p>}
        <Button type="submit" className="w-full rounded-full bg-brand hover:bg-brand/90" disabled={isLoading}>
          {isLoading ? "Signing in..." : "Sign In"}
        </Button>
      </form>
    </div>
  )
}
