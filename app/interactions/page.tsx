"use client"

import { useState } from "react"
import { Separator } from "@/components/ui/separator"
import { EnhancedButton } from "@/components/ui/enhanced-button"
import { EnhancedInput } from "@/components/ui/enhanced-input"
import { Tooltip, CopyButton, InfoBadge } from "@/components/ui/micro-interactions"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Lock } from "lucide-react"

export default function InteractionsPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [emailError, setEmailError] = useState("")
  const [passwordSuccess, setPasswordSuccess] = useState(false)

  const validateEmail = () => {
    if (!email) {
      setEmailError("Email is required")
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Please enter a valid email address")
    } else {
      setEmailError("")
    }
  }

  const validatePassword = () => {
    if (password.length >= 8) {
      setPasswordSuccess(true)
    } else {
      setPasswordSuccess(false)
    }
  }

  return (
    <div className="container py-10 max-w-4xl">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-4">Interactive Elements</h1>
          <p className="text-muted-foreground">
            Explore our enhanced interactive elements designed to provide better feedback and user experience.
          </p>
        </div>

        <Separator className="my-8" />

        <section>
          <h2 className="text-2xl font-bold mb-6">Enhanced Buttons</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Primary Buttons</CardTitle>
                <CardDescription>Used for primary actions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <EnhancedButton>Default Button</EnhancedButton>
                <EnhancedButton size="lg">Large Button</EnhancedButton>
                <EnhancedButton rounded="full">Rounded Button</EnhancedButton>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Button Variants</CardTitle>
                <CardDescription>Different styles for different contexts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <EnhancedButton variant="secondary">Secondary</EnhancedButton>
                <EnhancedButton variant="outline">Outline</EnhancedButton>
                <EnhancedButton variant="ghost">Ghost</EnhancedButton>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Special States</CardTitle>
                <CardDescription>Loading and gradient buttons</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <EnhancedButton isLoading loadingText="Loading...">
                  Submit
                </EnhancedButton>
                <EnhancedButton variant="gradient">Gradient</EnhancedButton>
                <EnhancedButton variant="subtle">Subtle</EnhancedButton>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator className="my-8" />

        <section>
          <h2 className="text-2xl font-bold mb-6">Enhanced Form Inputs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Input with Validation</CardTitle>
                <CardDescription>Provides immediate feedback</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <EnhancedInput
                  label="Email Address"
                  placeholder="your.email@example.com"
                  icon={<Mail className="h-4 w-4" />}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={validateEmail}
                  error={emailError}
                  helperText="We'll never share your email with anyone else."
                />

                <EnhancedInput
                  label="Password"
                  type="password"
                  placeholder="Enter your password"
                  icon={<Lock className="h-4 w-4" />}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={validatePassword}
                  success={passwordSuccess}
                  successMessage="Password strength is good"
                  helperText="Password must be at least 8 characters long."
                />
              </CardContent>
              <CardFooter>
                <EnhancedButton className="w-full">Sign In</EnhancedButton>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Micro-Interactions</CardTitle>
                <CardDescription>Small details that enhance usability</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-4">
                  <Tooltip content="This is a helpful tooltip" position="top">
                    <EnhancedButton variant="outline" size="sm">
                      Hover Me
                    </EnhancedButton>
                  </Tooltip>

                  <Tooltip content="Shows on bottom" position="bottom">
                    <EnhancedButton variant="outline" size="sm">
                      Bottom Tip
                    </EnhancedButton>
                  </Tooltip>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm">API Key:</span>
                    <code className="bg-muted px-2 py-1 rounded text-sm">sk_test_123456</code>
                    <CopyButton text="sk_test_123456" />
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-sm">Required field</span>
                  <InfoBadge text="This field is required for compliance reasons and cannot be left blank." />
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  )
}
