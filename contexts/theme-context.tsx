"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { useTheme } from "next-themes"

type ThemeMode = "light" | "dark" | "system"

interface ThemeContextType {
  mode: ThemeMode
  setMode: (mode: ThemeMode) => void
  toggleMode: () => void
  isLoaded: boolean
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { theme, setTheme, systemTheme, resolvedTheme } = useTheme()
  const [isLoaded, setIsLoaded] = useState(false)

  // Set isLoaded to true after hydration
  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const mode = theme as ThemeMode

  const setMode = (mode: ThemeMode) => {
    setTheme(mode)
  }

  const toggleMode = () => {
    if (theme === "dark" || (theme === "system" && systemTheme === "dark")) {
      setTheme("light")
    } else {
      setTheme("dark")
    }
  }

  return (
    <ThemeContext.Provider
      value={{
        mode,
        setMode,
        toggleMode,
        isLoaded,
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export function useThemeContext() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useThemeContext must be used within a ThemeProvider")
  }
  return context
}
