"use client"

import { useEffect } from "react"

export function ResponsiveViewport() {
  useEffect(() => {
    // Function to update viewport height for mobile browsers
    const updateViewportHeight = () => {
      const vh = window.innerHeight * 0.01
      document.documentElement.style.setProperty("--vh", `${vh}px`)
    }

    // Initial call
    updateViewportHeight()

    // Update on resize and orientation change
    window.addEventListener("resize", updateViewportHeight)
    window.addEventListener("orientationchange", updateViewportHeight)

    return () => {
      window.removeEventListener("resize", updateViewportHeight)
      window.removeEventListener("orientationchange", updateViewportHeight)
    }
  }, [])

  return null
}
