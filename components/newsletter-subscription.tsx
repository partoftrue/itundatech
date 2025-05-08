"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail, CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface NewsletterSubscriptionProps {
  className?: string
  variant?: "default" | "compact"
}

export function NewsletterSubscription({ className, variant = "default" }: NewsletterSubscriptionProps) {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address")
      return
    }

    setIsSubmitting(true)
    setError(null)

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setIsSuccess(true)
      setEmail("")
    } catch (err) {
      setError("Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (variant === "compact") {
    return (
      <div className={cn("w-full", className)}>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
          <div className="flex-1 relative">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isSubmitting || isSuccess}
              className="rounded-full pr-10"
            />
            <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </div>
          <Button type="submit" disabled={isSubmitting || isSuccess} className="rounded-full">
            {isSubmitting ? "Subscribing..." : isSuccess ? "Subscribed!" : "Subscribe"}
            {isSuccess && <CheckCircle2 className="ml-2 h-4 w-4" />}
          </Button>
        </form>
        {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
      </div>
    )
  }

  return (
    <div className={cn("bg-muted/50 rounded-xl p-8", className)}>
      <div className="flex flex-col items-center text-center max-w-md mx-auto">
        <div className="bg-toss-blue/10 p-3 rounded-full mb-4">
          <Mail className="h-6 w-6 text-toss-blue" />
        </div>
        <h3 className="text-xl font-medium mb-2">Stay in the loop</h3>
        <p className="text-muted-foreground mb-6">
          Subscribe to our newsletter to get the latest articles, insights, and updates delivered to your inbox.
        </p>
        {isSuccess ? (
          <div className="flex items-center justify-center gap-2 text-toss-blue">
            <CheckCircle2 className="h-5 w-5" />
            <span>Thanks for subscribing!</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="w-full">
            <div className="flex flex-col sm:flex-row gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSubmitting}
                className="rounded-full"
              />
              <Button type="submit" disabled={isSubmitting} className="rounded-full">
                {isSubmitting ? "Subscribing..." : "Subscribe"}
              </Button>
            </div>
            {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
          </form>
        )}
      </div>
    </div>
  )
}
