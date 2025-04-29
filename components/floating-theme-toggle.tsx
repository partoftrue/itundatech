"use client"

import { useThemeContext } from "@/contexts/theme-context"
import { Button } from "@/components/ui/button"
import { Moon, Sun } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState, useEffect } from "react"

export function FloatingThemeToggle() {
  const { mode, toggleMode, isLoaded } = useThemeContext()
  const [showToggle, setShowToggle] = useState(false)
  const [scrollPosition, setScrollPosition] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY
      setScrollPosition(position)
      setShowToggle(position > 200)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (!isLoaded) return null

  return (
    <div
      className={cn(
        "fixed bottom-6 right-6 z-50 transition-transform duration-300",
        showToggle ? "translate-y-0" : "translate-y-20",
      )}
    >
      <Button
        size="icon"
        variant="outline"
        onClick={toggleMode}
        className="h-10 w-10 rounded-full shadow-lg bg-background hover:bg-background"
      >
        <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    </div>
  )
}
