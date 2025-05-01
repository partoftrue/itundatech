"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export default function ThemeFavicon() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // After mounting, we can safely update the favicon based on the theme
  useEffect(() => {
    setMounted(true)
  }, [])

  // Update favicon when theme changes
  useEffect(() => {
    if (!mounted) return

    const isDark = resolvedTheme === "dark"

    // Find the existing favicon link element
    let link = document.querySelector('link[rel="icon"]') as HTMLLinkElement

    // If it doesn't exist, create it
    if (!link) {
      link = document.createElement("link")
      link.rel = "icon"
      document.head.appendChild(link)
    }

    // Update the href attribute based on theme
    link.href = isDark ? "/favicon-dark.ico" : "/favicon.ico"
  }, [resolvedTheme, mounted])

  return null
}
