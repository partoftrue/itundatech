"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { useThemePreference } from "@/hooks/use-theme-preference"

export function ThemeTransition() {
  const { resolvedTheme, theme, mounted } = useThemePreference()
  const [transitioning, setTransitioning] = useState(false)
  const [prevTheme, setPrevTheme] = useState<string | undefined>(undefined)

  // Handle theme changes
  useEffect(() => {
    if (!mounted) return

    if (prevTheme && prevTheme !== theme) {
      setTransitioning(true)
      const timer = setTimeout(() => {
        setTransitioning(false)
      }, 500) // Match this with the CSS transition duration
      return () => clearTimeout(timer)
    }

    setPrevTheme(theme)
  }, [theme, prevTheme, mounted])

  if (!mounted) return null

  const isDark = resolvedTheme === "dark"

  return (
    <div
      className={cn(
        "fixed inset-0 z-[100] pointer-events-none transition-opacity duration-500",
        transitioning ? "opacity-100" : "opacity-0",
        isDark ? "bg-gray-900" : "bg-white",
      )}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Electric Bolt SVG */}
        <svg
          viewBox="0 0 24 24"
          className={cn(
            "h-16 w-16 transition-transform duration-500",
            isDark ? "text-white scale-110 rotate-180" : "text-brand scale-100 rotate-0",
          )}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13 3L4 14H12L11 21L20 10H12L13 3Z"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  )
}
