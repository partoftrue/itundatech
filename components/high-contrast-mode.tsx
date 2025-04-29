"use client"

import { useEffect } from "react"
import { useThemeContext } from "@/contexts/theme-context"

export function HighContrastMode() {
  const { updateSettings } = useThemeContext()

  useEffect(() => {
    // Check if user has high contrast mode enabled in their OS
    const prefersHighContrast = window.matchMedia("(prefers-contrast: more)").matches

    if (prefersHighContrast) {
      // Apply high contrast theme
      updateSettings({ preset: "high-contrast" })
    }

    // Listen for changes to high contrast preference
    const mediaQuery = window.matchMedia("(prefers-contrast: more)")
    const handleChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        updateSettings({ preset: "high-contrast" })
      } else {
        // Revert to default theme when high contrast is disabled
        updateSettings({ preset: "default" })
      }
    }

    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [updateSettings])

  return null
}
