"use client"

import { useState } from "react"
import { SplashScreen } from "@/components/splash-screen"
import { Button } from "@/components/ui/button"
import { getAppResources, getEssentialResources } from "@/utils/resource-preloader"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function SplashDemo() {
  const [showSplash, setShowSplash] = useState(true)
  const [loadingMode, setLoadingMode] = useState<"essential" | "full" | "simulated">("essential")

  const handleReplay = () => {
    setShowSplash(true)
  }

  const getResources = () => {
    switch (loadingMode) {
      case "full":
        return getAppResources()
      case "essential":
        return getEssentialResources()
      case "simulated":
      default:
        return []
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      {showSplash && (
        <SplashScreen
          onFinish={() => setShowSplash(false)}
          resources={getResources()}
          minLoadingTime={loadingMode === "simulated" ? 2000 : 500}
        />
      )}

      <div className="max-w-md w-full space-y-8 text-center">
        <h1 className="text-3xl font-bold">Splash Screen Demo</h1>
        <p className="text-gray-500 dark:text-gray-400">
          This page demonstrates the Itunda app splash screen with real resource loading.
        </p>

        <Tabs defaultValue="essential" className="w-full" onValueChange={(v) => setLoadingMode(v as any)}>
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="essential">Essential</TabsTrigger>
            <TabsTrigger value="full">Full App</TabsTrigger>
            <TabsTrigger value="simulated">Simulated</TabsTrigger>
          </TabsList>
          <TabsContent value="essential" className="text-sm text-left mt-2">
            Loads only essential resources (logo, banner, fonts)
          </TabsContent>
          <TabsContent value="full" className="text-sm text-left mt-2">
            Loads all app resources (images, fonts, data)
          </TabsContent>
          <TabsContent value="simulated" className="text-sm text-left mt-2">
            Uses a simulated loading progress without actual resource loading
          </TabsContent>
        </Tabs>

        <Button onClick={handleReplay} className="mt-4">
          Replay Splash Screen
        </Button>
      </div>
    </div>
  )
}
