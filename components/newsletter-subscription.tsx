"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CheckCircle } from "lucide-react"

export function NewsletterSubscription() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Success
      setIsSuccess(true)
      setEmail("")
    } catch (err) {
      setError("Failed to subscribe. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="bg-primary/5 rounded-2xl p-4 flex items-center">
        <CheckCircle className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
        <p className="text-sm">Thank you for subscribing! We'll keep you updated.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <p className="text-sm text-muted-foreground">
        Get the latest articles and resources sent straight to your inbox.
      </p>
      <div className="flex flex-col space-y-2">
        <Input
          type="email"
          placeholder="Your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="rounded-xl"
        />
        <Button type="submit" disabled={isSubmitting} className="w-full rounded-xl">
          {isSubmitting ? "Subscribing..." : "Subscribe"}
        </Button>
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </form>
  )
}
