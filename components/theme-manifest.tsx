"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import Head from "next/head"

export function ThemeManifest() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const manifestPath = resolvedTheme === "dark" ? "/manifest-dark.json" : "/manifest.json"

  return (
    <Head>
      <link rel="manifest" href={manifestPath} />
    </Head>
  )
}
