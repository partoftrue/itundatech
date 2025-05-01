"use client"

import { useEffect } from "react"
import { checkFaviconLoaded } from "@/utils/favicon-generator"

export function FaviconDebug() {
  useEffect(() => {
    // Only run in production
    if (process.env.NODE_ENV !== "production") return

    // Check if favicon is loaded
    const isFaviconLoaded = checkFaviconLoaded()

    if (!isFaviconLoaded) {
      console.warn("Favicon may not be loaded correctly")

      // Try to force favicon reload
      const link = document.querySelector('link[rel="icon"]') as HTMLLinkElement
      if (link) {
        const currentHref = link.href
        link.href = ""
        setTimeout(() => {
          link.href = currentHref
          console.log("Attempted to reload favicon:", currentHref)
        }, 100)
      }
    } else {
      console.log("Favicon loaded successfully")
    }

    // Log all link elements in head for debugging
    const links = document.querySelectorAll("link")
    console.log("All link elements:", links)
  }, [])

  return null
}
