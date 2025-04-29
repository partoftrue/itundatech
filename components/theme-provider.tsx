"use client"

import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { ThemeProviderProps } from "next-themes"
import { useEffect, useState } from "react"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const [mounted, setMounted] = useState(false)

  // Fix light theme issues by ensuring proper theme initialization
  useEffect(() => {
    setMounted(true)

    // Fix potential theme inconsistency by ensuring the theme attribute is properly set
    const root = window.document.documentElement
    const initialColorValue = root.style.getPropertyValue("--initial-color-mode")

    // Ensure light theme CSS variables are properly applied
    if (
      initialColorValue === "light" ||
      (!initialColorValue && !window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.setAttribute("data-theme", "light")
      document.documentElement.classList.remove("dark")
    }
  }, [])

  // Avoid hydration mismatch by only rendering when mounted
  if (!mounted) {
    return <>{children}</>
  }

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
