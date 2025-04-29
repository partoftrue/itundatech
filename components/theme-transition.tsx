"use client"

import { useEffect } from "react"
import { useTheme } from "next-themes"

export function ThemeTransition() {
  const { theme, resolvedTheme } = useTheme()

  useEffect(() => {
    // Add transition styles when theme changes
    const transitionStyles = document.createElement("style")
    transitionStyles.appendChild(
      document.createTextNode(`
        * {
          transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease, fill 0.3s ease, stroke 0.3s ease !important;
        }
      `),
    )
    document.head.appendChild(transitionStyles)

    // Remove transition after they've completed
    const timeout = setTimeout(() => {
      document.head.removeChild(transitionStyles)
    }, 300)

    return () => {
      clearTimeout(timeout)
      if (document.head.contains(transitionStyles)) {
        document.head.removeChild(transitionStyles)
      }
    }
  }, [theme, resolvedTheme])

  return null
}
