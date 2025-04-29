"use client"

import { useState } from "react"
import { Check, Palette } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useThemeContext } from "@/contexts/theme-context"
import type { ThemeAccent, ThemeFont, ThemeMode, ThemeRadius } from "@/types/theme"
import { cn } from "@/lib/utils"

export function ThemeSwitcher() {
  const { settings, updateSettings, presets, applyPreset, isLoaded } = useThemeContext()
  const [open, setOpen] = useState(false)

  if (!isLoaded) return null

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full relative overflow-hidden group">
          <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-full" />
          <Palette className="h-5 w-5" />
          <span className="sr-only">Theme settings</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Theme Settings</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <span>Mode</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuRadioGroup
                  value={settings.mode}
                  onValueChange={(value) => updateSettings({ mode: value as ThemeMode })}
                >
                  <DropdownMenuRadioItem value="light">
                    Light
                    {settings.mode === "light" && <Check className="ml-auto h-4 w-4" />}
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="dark">
                    Dark
                    {settings.mode === "dark" && <Check className="ml-auto h-4 w-4" />}
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="system">
                    System
                    {settings.mode === "system" && <Check className="ml-auto h-4 w-4" />}
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>

          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <span>Accent Color</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <div className="grid grid-cols-3 gap-1 p-1">
                  {["blue", "purple", "green", "orange", "pink", "red"].map((color) => (
                    <button
                      key={color}
                      className={cn(
                        "h-8 w-8 rounded-full flex items-center justify-center",
                        `bg-${color}-600 hover:opacity-90 transition-opacity`,
                        settings.accent === color && "ring-2 ring-primary ring-offset-2",
                      )}
                      onClick={() => {
                        updateSettings({ accent: color as ThemeAccent })
                        setOpen(false)
                      }}
                    >
                      {settings.accent === color && <Check className="h-4 w-4 text-white" />}
                      <span className="sr-only">{color}</span>
                    </button>
                  ))}
                </div>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>

          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <span>Border Radius</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuRadioGroup
                  value={settings.radius}
                  onValueChange={(value) => updateSettings({ radius: value as ThemeRadius })}
                >
                  <DropdownMenuRadioItem value="none">
                    None
                    {settings.radius === "none" && <Check className="ml-auto h-4 w-4" />}
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="sm">
                    Small
                    {settings.radius === "sm" && <Check className="ml-auto h-4 w-4" />}
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="md">
                    Medium
                    {settings.radius === "md" && <Check className="ml-auto h-4 w-4" />}
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="lg">
                    Large
                    {settings.radius === "lg" && <Check className="ml-auto h-4 w-4" />}
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="full">
                    Full
                    {settings.radius === "full" && <Check className="ml-auto h-4 w-4" />}
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>

          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <span>Font</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuRadioGroup
                  value={settings.font}
                  onValueChange={(value) => updateSettings({ font: value as ThemeFont })}
                >
                  <DropdownMenuRadioItem value="system" className="font-sans">
                    System
                    {settings.font === "system" && <Check className="ml-auto h-4 w-4" />}
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="sans" className="font-sans">
                    Sans
                    {settings.font === "sans" && <Check className="ml-auto h-4 w-4" />}
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="serif" className="font-serif">
                    Serif
                    {settings.font === "serif" && <Check className="ml-auto h-4 w-4" />}
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="mono" className="font-mono">
                    Mono
                    {settings.font === "mono" && <Check className="ml-auto h-4 w-4" />}
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />
        <DropdownMenuLabel>Theme Presets</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <div className="max-h-[300px] overflow-y-auto px-1">
          {presets.map((preset) => (
            <DropdownMenuItem
              key={preset.id}
              className={cn("flex items-center gap-2 cursor-pointer", settings.preset === preset.id && "bg-muted")}
              onClick={() => applyPreset(preset.id)}
            >
              <div
                className={cn(
                  "w-4 h-4 rounded-full",
                  preset.isDark ? "border border-white/20" : "border border-black/20",
                )}
                style={{ backgroundColor: preset.primary[600] }}
              />
              <span>{preset.name}</span>
              {settings.preset === preset.id && <Check className="ml-auto h-4 w-4" />}
            </DropdownMenuItem>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
