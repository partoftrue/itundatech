"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import Head from "next/head"

export function ThemeManifest() {
  const { theme, systemTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  // Fix for light theme manifest
  const currentTheme = theme === "system" ? systemTheme : theme
  const manifestPath = currentTheme === "dark" ? "/manifest-dark.json" : "/manifest.json"

  return (
    <Head>
      <link rel="manifest" href={manifestPath} />
    </Head>
  )
}
