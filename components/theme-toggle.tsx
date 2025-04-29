"use client"

import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useThemeContext } from "@/contexts/theme-context"

export function ThemeToggle() {
  const { mode, toggleMode, isLoaded } = useThemeContext()

  if (!isLoaded) {
    return (
      <Button variant="ghost" size="icon" className="rounded-full">
        <span className="sr-only">Toggle theme</span>
        <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      </Button>
    )
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleMode}
      className="rounded-full relative overflow-hidden group"
      aria-label={`Switch to ${mode === "dark" ? "light" : "dark"} mode`}
    >
      <span className="sr-only">Toggle theme</span>
      <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-full" />
      <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </Button>
  )
}
