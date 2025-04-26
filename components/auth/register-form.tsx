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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle2, Info } from "lucide-react"

export function RegisterForm() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [verificationSent, setVerificationSent] = useState(false)
  const { signUp, signInWithGoogle, resendVerificationEmail } = useAuth()
  const router = useRouter()

  // Update the handleSubmit function to handle the registration response better
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const { user, session } = await signUp(email, password, name)

      // If we have a session, the user was auto-confirmed (like with a test email)
      if (session) {
        router.push("/")
        router.refresh()
      } else {
        // Otherwise, show the verification message
        setVerificationSent(true)
      }
    } catch (error: any) {
      console.error("Registration error:", error)
      setError(error.message || "An error occurred during registration")
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
      setVerificationSent(true)
    } catch (error: any) {
      console.error("Resend verification error:", error)
      setError(error.message || "Failed to resend verification email")
    } finally {
      setIsLoading(false)
    }
  }

  if (verificationSent) {
    return (
      <div className="space-y-6">
        <Alert className="bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-900">
          <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
          <AlertTitle>Verification email sent!</AlertTitle>
          <AlertDescription>
            We've sent a verification email to <strong>{email}</strong>. Please check your inbox and click the link to
            verify your account.
          </AlertDescription>
        </Alert>
        <div className="text-center space-y-4">
          <p className="text-sm text-muted-foreground">
            Didn't receive the email? Check your spam folder or click below to resend.
          </p>
          <Button
            type="button"
            variant="outline"
            onClick={handleResendVerification}
            disabled={isLoading}
            className="mx-auto"
          >
            {isLoading ? "Sending..." : "Resend verification email"}
          </Button>
          <div>
            <Button variant="link" onClick={() => setVerificationSent(false)} className="text-sm">
              Back to registration
            </Button>
          </div>
        </div>
      </div>
    )
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
        Sign up with Google
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
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="rounded-lg"
            required
          />
        </div>
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

        <Alert variant="outline" className="bg-muted/50">
          <Info className="h-4 w-4" />
          <AlertDescription className="text-xs">
            By signing up, you'll receive a verification email. You must verify your email before you can sign in.
          </AlertDescription>
        </Alert>

        {error && <p className="text-sm text-red-500">{error}</p>}
        <Button type="submit" className="w-full rounded-full bg-brand hover:bg-brand/90" disabled={isLoading}>
          {isLoading ? "Signing up..." : "Sign Up"}
        </Button>
      </form>
    </div>
  )
}
