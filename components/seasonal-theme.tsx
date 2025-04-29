"use client"

import { useEffect } from "react"
import { useThemeContext } from "@/contexts/theme-context"

export function SeasonalTheme() {
  const { updateSettings } = useThemeContext()

  useEffect(() => {
    // Check if user has opted in to seasonal themes
    const seasonalThemesEnabled = localStorage.getItem("enable-seasonal-themes") === "true"
    if (!seasonalThemesEnabled) return

    // Get current month
    const month = new Date().getMonth()

    // Apply seasonal theme based on month
    if (month === 11 || month === 0 || month === 1) {
      // Winter theme (December, January, February)
      updateSettings({ preset: "winter" })
    } else if (month >= 2 && month <= 4) {
      // Spring theme (March, April, May)
      updateSettings({ preset: "spring" })
    } else if (month >= 5 && month <= 7) {
      // Summer theme (June, July, August)
      updateSettings({ preset: "summer" })
    } else if (month >= 8 && month <= 10) {
      // Fall theme (September, October, November)
      updateSettings({ preset: "fall" })
    }
  }, [updateSettings])

  return null
}
