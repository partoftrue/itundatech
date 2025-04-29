"use client"

import { useEffect } from "react"
import { useThemeContext } from "@/contexts/theme-context"

export function ThemeSync() {
  const { settings, updateSettings } = useThemeContext()

  // Listen for storage events to sync theme across tabs
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "itunda-theme-settings" && e.newValue) {
        try {
          const newSettings = JSON.parse(e.newValue)
          updateSettings(newSettings)
        } catch (error) {
          console.error("Failed to parse theme settings from storage:", error)
        }
      }
    }

    window.addEventListener("storage", handleStorageChange)
    return () => window.removeEventListener("storage", handleStorageChange)
  }, [updateSettings])

  return null
}
