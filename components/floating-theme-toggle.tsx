"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useThemePreference } from "@/hooks/use-theme-preference"

export function FloatingThemeToggle() {
  const { resolvedTheme, toggleTheme, mounted } = useThemePreference()

  if (!mounted) return null

  const isDark = resolvedTheme === "dark"

  return (
    <Button
      variant="outline"
      size="icon"
      className={cn(
        "fixed bottom-20 right-8 z-50 rounded-full shadow-lg transition-all duration-300",
        "bg-background/80 backdrop-blur-sm hover:bg-background",
        "border-2",
        isDark ? "border-white/20" : "border-brand/20",
      )}
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      <div className="relative">
        {/* Electric Bolt SVG */}
        <svg
          viewBox="0 0 24 24"
          className={cn(
            "h-5 w-5 transition-all duration-500",
            isDark ? "text-white rotate-180" : "text-brand rotate-0",
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

        {/* Animated ring */}
        <div
          className={cn(
            "absolute -inset-3 rounded-full border-2 opacity-0",
            "transition-all duration-500 animate-pulse",
            isDark ? "border-white/20" : "border-brand/20",
          )}
        />
      </div>
    </Button>
  )
}
