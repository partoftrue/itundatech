"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function useThemePreference() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [hasStoredPreference, setHasStoredPreference] = useState(false)

  // Check if we have a stored preference on mount
  useEffect(() => {
    setMounted(true)
    const storedTheme = localStorage.getItem("itunda-theme-preference")
    setHasStoredPreference(!!storedTheme)
  }, [])

  // Save theme preference to localStorage whenever it changes
  useEffect(() => {
    if (!mounted) return

    if (theme && theme !== "system") {
      localStorage.setItem("itunda-theme-preference", theme)
      setHasStoredPreference(true)
    }
  }, [theme, mounted])

  // Function to toggle between light and dark
  const toggleTheme = () => {
    const newTheme = resolvedTheme === "dark" ? "light" : "dark"
    setTheme(newTheme)
  }

  // Function to reset to system preference
  const resetToSystemPreference = () => {
    localStorage.removeItem("itunda-theme-preference")
    setTheme("system")
    setHasStoredPreference(false)
  }

  return {
    theme,
    resolvedTheme,
    setTheme,
    toggleTheme,
    resetToSystemPreference,
    hasStoredPreference,
    mounted,
  }
}
