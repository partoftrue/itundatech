"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import Head from "next/head"

export function DynamicFavicon() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const faviconPath = resolvedTheme === "dark" ? "/favicon-dark.ico" : "/favicon.ico"
  const iconPath = resolvedTheme === "dark" ? "/icon-dark.png" : "/icon.png"
  const appleIconPath = resolvedTheme === "dark" ? "/apple-icon-dark.png" : "/apple-icon.png"

  return (
    <Head>
      <link rel="icon" href={faviconPath} sizes="any" />
      <link rel="icon" href={iconPath} type="image/svg+xml" />
      <link rel="apple-touch-icon" href={appleIconPath} />
    </Head>
  )
}
