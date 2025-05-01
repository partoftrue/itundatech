"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import Head from "next/head"

export default function ThemeAppIcons() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // After mounting, we can safely show the app icons based on the theme
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const isDark = resolvedTheme === "dark"

  return (
    <Head>
      {/* Apple Touch Icons */}
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href={isDark ? "/apple-icon-dark-180.png" : "/apple-icon-light-180.png"}
      />

      {/* Meta tags for theme color */}
      <meta name="theme-color" content={isDark ? "#1b1e3d" : "#1f78ff"} />

      {/* Meta tags for Apple */}
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content={isDark ? "black-translucent" : "default"} />
    </Head>
  )
}
