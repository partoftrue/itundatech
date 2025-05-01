"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { SplashScreen } from "@/components/splash-screen"
import { getEssentialResources } from "@/utils/resource-preloader"

export default function SplashPage() {
  const router = useRouter()

  const handleSplashFinish = () => {
    router.push("/")
  }

  // Prevent back navigation to splash screen
  useEffect(() => {
    window.history.pushState(null, "", "/")
  }, [])

  return (
    <SplashScreen
      onFinish={handleSplashFinish}
      duration={1000}
      resources={getEssentialResources()}
      minLoadingTime={800}
    />
  )
}
