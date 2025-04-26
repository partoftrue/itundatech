"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LoginForm } from "@/components/auth/login-form"
import { RegisterForm } from "@/components/auth/register-form"
import { useAuth } from "@/components/auth/auth-provider"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import Image from "next/image"
import { LoadingSpinner } from "@/components/ui/loading-spinner"

export default function AuthPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (user && !isLoading) {
      router.push("/")
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  return (
    <div className="toss-container py-8 sm:py-12">
      <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
        <div className="hidden md:block">
          <div className="relative h-72 md:h-96">
            <Image src="/auth-illustration.png" alt="Login illustration" fill className="object-contain" />
          </div>
        </div>
        <div>
          <div className="mb-6 sm:mb-8 text-center md:text-left">
            <h1 className="text-2xl sm:text-3xl font-bold mb-2">Welcome to itunda.tech</h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              Sign in or create an account to access all features
            </p>
          </div>

          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6 sm:mb-8">
              <TabsTrigger
                value="login"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-brand data-[state=active]:text-brand px-4 py-2 text-sm font-medium"
              >
                Login
              </TabsTrigger>
              <TabsTrigger
                value="register"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-brand data-[state=active]:text-brand px-4 py-2 text-sm font-medium"
              >
                Register
              </TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <Card className="border-none shadow-none">
                <CardHeader className="px-0 py-2 sm:py-4">
                  <CardTitle className="text-lg sm:text-xl">Welcome back</CardTitle>
                  <CardDescription className="text-sm sm:text-base">
                    Sign in to your account to continue
                  </CardDescription>
                </CardHeader>
                <CardContent className="px-0">
                  <LoginForm />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="register">
              <Card className="border-none shadow-none">
                <CardHeader className="px-0 py-2 sm:py-4">
                  <CardTitle className="text-lg sm:text-xl">Create an account</CardTitle>
                  <CardDescription className="text-sm sm:text-base">
                    Register to contribute and interact with articles
                  </CardDescription>
                </CardHeader>
                <CardContent className="px-0">
                  <RegisterForm />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
