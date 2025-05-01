"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Monitor, Moon, Sun } from "lucide-react"
import { useThemePreference } from "@/hooks/use-theme-preference"
import { cn } from "@/lib/utils"

export function ThemePreferences() {
  const { theme, setTheme, hasStoredPreference, resetToSystemPreference, mounted } = useThemePreference()

  if (!mounted) return null

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full relative overflow-hidden group"
          aria-label="Theme preferences"
        >
          <div className="absolute inset-0 bg-brand/10 dark:bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-full" />

          {/* Electric Bolt SVG */}
          <svg
            viewBox="0 0 24 24"
            className={cn(
              "h-5 w-5 transition-all duration-300",
              theme === "dark" ? "text-white rotate-180" : "text-brand rotate-0",
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
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")} className={theme === "light" ? "bg-muted" : ""}>
          <Sun className="mr-2 h-4 w-4" />
          <span>Light</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")} className={theme === "dark" ? "bg-muted" : ""}>
          <Moon className="mr-2 h-4 w-4" />
          <span>Dark</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")} className={theme === "system" ? "bg-muted" : ""}>
          <Monitor className="mr-2 h-4 w-4" />
          <span>System</span>
        </DropdownMenuItem>

        {hasStoredPreference && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={resetToSystemPreference}>
              <Monitor className="mr-2 h-4 w-4" />
              <span>Reset to system preference</span>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
