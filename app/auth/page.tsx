"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LoginForm } from "@/components/auth/login-form"
import { RegisterForm } from "@/components/auth/register-form"
import { useAuth } from "@/components/auth/auth-provider"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import Image from "next/image"

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
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <div>
      <div className="bg-gradient-to-r from-itunda-purple to-itunda-darkPurple py-12">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white mb-4">Welcome to itunda.tech</h1>
            <p className="text-xl text-white/80 max-w-md mx-auto">
              Sign in or create an account to access all features
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="hidden md:block">
            <div className="relative h-96">
              <Image
                src="/placeholder.svg?height=500&width=500&text=👩‍💻"
                alt="Login illustration"
                fill
                className="object-contain"
              />
            </div>
          </div>
          <div>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger
                  value="login"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-itunda-purple data-[state=active]:text-itunda-purple px-4 py-2 text-sm font-medium"
                >
                  Login
                </TabsTrigger>
                <TabsTrigger
                  value="register"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-itunda-purple data-[state=active]:text-itunda-purple px-4 py-2 text-sm font-medium"
                >
                  Register
                </TabsTrigger>
              </TabsList>
              <TabsContent value="login">
                <Card className="border-none shadow-none">
                  <CardHeader className="px-0">
                    <CardTitle>Welcome back</CardTitle>
                    <CardDescription>Sign in to your account to continue</CardDescription>
                  </CardHeader>
                  <CardContent className="px-0">
                    <LoginForm />
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="register">
                <Card className="border-none shadow-none">
                  <CardHeader className="px-0">
                    <CardTitle>Create an account</CardTitle>
                    <CardDescription>Register to contribute and interact with articles</CardDescription>
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
    </div>
  )
}
