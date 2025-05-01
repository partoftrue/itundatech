"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { getFaviconPath } from "@/utils/favicon-generator"

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

    // Find the existing favicon link elements
    const links = document.querySelectorAll('link[rel="icon"], link[rel="shortcut icon"]')

    // If no favicon links exist, create one
    if (links.length === 0) {
      const link = document.createElement("link")
      link.rel = "icon"
      link.href = isDark ? getFaviconPath("/favicon-dark.ico") : getFaviconPath("/favicon.ico")
      document.head.appendChild(link)
    } else {
      // Update existing favicon links
      links.forEach((linkEl) => {
        const link = linkEl as HTMLLinkElement
        link.href = isDark ? getFaviconPath("/favicon-dark.ico") : getFaviconPath("/favicon.ico")
      })
    }

    // Also update apple touch icon
    const appleLink = document.querySelector('link[rel="apple-touch-icon"]') as HTMLLinkElement
    if (appleLink) {
      appleLink.href = isDark ? getFaviconPath("/apple-touch-icon-dark.png") : getFaviconPath("/apple-touch-icon.png")
    }

    console.log(`Favicon updated to ${isDark ? "dark" : "light"} theme`)
  }, [resolvedTheme, mounted])

  return null
}
