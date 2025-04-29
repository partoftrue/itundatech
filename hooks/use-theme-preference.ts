"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function useThemePreference() {
  const { theme, setTheme, systemTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [hasStoredPreference, setHasStoredPreference] = useState(false)

  // Fix for light theme not applying correctly
  useEffect(() => {
    setMounted(true)

    // Check if there's a stored theme preference
    const storedTheme = localStorage.getItem("theme")
    setHasStoredPreference(!!storedTheme)

    // Fix light theme application
    if (theme === "light" || (!theme && systemTheme === "light")) {
      document.documentElement.classList.remove("dark")
      document.documentElement.setAttribute("data-theme", "light")
    }
  }, [theme, systemTheme])

  // Fix for resetting to system preference
  const resetToSystemPreference = () => {
    localStorage.removeItem("theme")
    setTheme("system")
    setHasStoredPreference(false)

    // Apply correct theme based on system preference
    if (systemTheme === "light") {
      document.documentElement.classList.remove("dark")
      document.documentElement.setAttribute("data-theme", "light")
    } else {
      document.documentElement.classList.add("dark")
      document.documentElement.setAttribute("data-theme", "dark")
    }
  }

  return {
    theme,
    setTheme,
    systemTheme,
    hasStoredPreference,
    resetToSystemPreference,
    mounted,
  }
}
