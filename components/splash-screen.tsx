"use client"

import { useState, useEffect } from "react"
import { Logo } from "./logo"
import { cn } from "@/lib/utils"
import { useLoadingProgress, type Resource } from "@/hooks/use-loading-progress"

interface SplashScreenProps {
  onFinish?: () => void
  duration?: number
  resources?: Resource[]
  minLoadingTime?: number
}

export function SplashScreen({ onFinish, duration = 2000, resources = [], minLoadingTime = 1000 }: SplashScreenProps) {
  const [isVisible, setIsVisible] = useState(true)
  const { progress, isComplete } = useLoadingProgress({
    resources,
    simulateMinimumTime: minLoadingTime,
  })

  // Handle completion of loading
  useEffect(() => {
    if (isComplete) {
      const timer = setTimeout(() => {
        setIsVisible(false)
        if (onFinish) onFinish()
      }, duration)

      return () => clearTimeout(timer)
    }
  }, [isComplete, duration, onFinish])

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#1b1e3d] transition-opacity duration-500",
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none",
      )}
    >
      <div className="flex flex-col items-center justify-center gap-4">
        <Logo size={80} color="#1f78ff" />
        <h1 className="text-3xl font-bold mt-4 text-white">itundatech</h1>

        <div className="flex flex-col items-center w-64 gap-2">
          <div className="w-full h-1 bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-white rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="text-sm text-gray-300">{progress}%</div>
        </div>
      </div>
    </div>
  )
}
