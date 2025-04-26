"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useThemePreference } from "@/hooks/use-theme-preference"

export function ThemeToggle() {
  const { resolvedTheme, toggleTheme, mounted } = useThemePreference()

  if (!mounted) return null

  const isDark = resolvedTheme === "dark"

  return (
    <Button
      variant="ghost"
      size="icon"
      className="rounded-full relative overflow-hidden group"
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      <div className="absolute inset-0 bg-brand/10 dark:bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-full" />

      {/* Electric Bolt SVG */}
      <svg
        viewBox="0 0 24 24"
        className={cn("h-5 w-5 transition-all duration-300", isDark ? "text-white rotate-180" : "text-brand rotate-0")}
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
    </Button>
  )
}
