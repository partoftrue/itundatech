"use client"

import { useState, useEffect } from "react"
import { breakpoints } from "@/lib/responsive"

type Breakpoint = "xs" | "sm" | "md" | "lg" | "xl" | "2xl"

export function useResponsive() {
  const [currentBreakpoint, setCurrentBreakpoint] = useState<Breakpoint>("xs")
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)
  const [orientation, setOrientation] = useState<"portrait" | "landscape">("portrait")

  useEffect(() => {
    // Function to update all responsive states
    const updateResponsiveState = () => {
      const width = window.innerWidth
      const height = window.innerHeight

      // Set current breakpoint
      if (width < breakpoints.sm) {
        setCurrentBreakpoint("xs")
      } else if (width < breakpoints.md) {
        setCurrentBreakpoint("sm")
      } else if (width < breakpoints.lg) {
        setCurrentBreakpoint("md")
      } else if (width < breakpoints.xl) {
        setCurrentBreakpoint("lg")
      } else if (width < breakpoints["2xl"]) {
        setCurrentBreakpoint("xl")
      } else {
        setCurrentBreakpoint("2xl")
      }

      // Set device type
      setIsMobile(width < breakpoints.md)
      setIsTablet(width >= breakpoints.md && width < breakpoints.lg)
      setIsDesktop(width >= breakpoints.lg)

      // Set orientation
      setOrientation(width > height ? "landscape" : "portrait")
    }

    // Initial update
    updateResponsiveState()

    // Add event listener for resize
    window.addEventListener("resize", updateResponsiveState)

    // Add event listener for orientation change (mobile devices)
    window.addEventListener("orientationchange", updateResponsiveState)

    // Cleanup
    return () => {
      window.removeEventListener("resize", updateResponsiveState)
      window.removeEventListener("orientationchange", updateResponsiveState)
    }
  }, [])

  // Helper functions to check breakpoints
  const isBreakpoint = (bp: Breakpoint) => currentBreakpoint === bp
  const isAtLeastBreakpoint = (bp: Breakpoint) => {
    const order: Breakpoint[] = ["xs", "sm", "md", "lg", "xl", "2xl"]
    return order.indexOf(currentBreakpoint) >= order.indexOf(bp)
  }
  const isAtMostBreakpoint = (bp: Breakpoint) => {
    const order: Breakpoint[] = ["xs", "sm", "md", "lg", "xl", "2xl"]
    return order.indexOf(currentBreakpoint) <= order.indexOf(bp)
  }

  return {
    currentBreakpoint,
    isMobile,
    isTablet,
    isDesktop,
    orientation,
    isBreakpoint,
    isAtLeastBreakpoint,
    isAtMostBreakpoint,
  }
}
