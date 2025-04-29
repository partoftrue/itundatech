"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function DynamicFavicon() {
  const { theme, systemTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    // Fix for light theme favicon
    const currentTheme = theme === "system" ? systemTheme : theme
    const faviconLink = document.querySelector('link[rel="icon"]') as HTMLLinkElement

    if (faviconLink) {
      if (currentTheme === "dark") {
        faviconLink.href = "/favicon-dark.ico"
      } else {
        faviconLink.href = "/favicon.ico"
      }
    }
  }, [theme, systemTheme, mounted])

  return null
}
