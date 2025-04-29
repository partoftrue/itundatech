"use client"

import { useState, useEffect } from "react"

type ScreenSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl"

export function useScreenSize() {
  const [screenSize, setScreenSize] = useState<ScreenSize>("lg")

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth

      if (width < 375) return setScreenSize("xs")
      if (width < 640) return setScreenSize("sm")
      if (width < 768) return setScreenSize("md")
      if (width < 1024) return setScreenSize("lg")
      if (width < 1280) return setScreenSize("xl")
      return setScreenSize("2xl")
    }

    // Initial check
    checkScreenSize()

    // Add event listener
    window.addEventListener("resize", checkScreenSize)

    // Cleanup
    return () => window.removeEventListener("resize", checkScreenSize)
  }, [])

  return {
    screenSize,
    isXs: screenSize === "xs",
    isSm: screenSize === "sm",
    isMd: screenSize === "md",
    isLg: screenSize === "lg",
    isXl: screenSize === "xl",
    is2xl: screenSize === "2xl",
    isMobile: screenSize === "xs" || screenSize === "sm",
    isTablet: screenSize === "md" || screenSize === "lg",
    isDesktop: screenSize === "xl" || screenSize === "2xl",
  }
}
