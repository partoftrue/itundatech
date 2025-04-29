"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Check } from "lucide-react"
import type { ThemePreset } from "@/types/theme"
import { cn } from "@/lib/utils"

interface ThemePreviewProps {
  preset: ThemePreset
  isSelected: boolean
  onSelect: () => void
}

export function ThemePreview({ preset, isSelected, onSelect }: ThemePreviewProps) {
  return (
    <Card
      className={cn(
        "overflow-hidden cursor-pointer transition-all hover:scale-105 hover:shadow-md",
        isSelected && "ring-2 ring-primary",
      )}
      onClick={onSelect}
    >
      <div
        className="h-32 relative"
        style={{
          backgroundColor: preset.isDark ? preset.background : preset.background,
          color: preset.isDark ? preset.foreground : preset.foreground,
        }}
      >
        <div className="absolute inset-0 p-4 flex flex-col">
          <div className="flex justify-between items-center mb-2">
            <div className="h-4 w-24 rounded" style={{ backgroundColor: preset.muted }}></div>
            <div
              className="h-6 w-6 rounded-full flex items-center justify-center"
              style={{ backgroundColor: preset.primary[500] }}
            >
              {isSelected && <Check className="h-4 w-4 text-white" />}
            </div>
          </div>
          <div className="h-6 w-32 rounded" style={{ backgroundColor: preset.muted }}></div>
          <div className="mt-auto flex gap-2">
            <div
              className="h-8 w-16 rounded flex items-center justify-center text-xs"
              style={{ backgroundColor: preset.primary[500], color: "#ffffff" }}
            >
              Button
            </div>
            <div
              className="h-8 w-16 rounded flex items-center justify-center text-xs"
              style={{
                backgroundColor: preset.accent,
                color: preset.accentForeground,
              }}
            >
              Button
            </div>
          </div>
        </div>
      </div>
      <CardContent className="p-3">
        <div className="font-medium">{preset.name}</div>
        {preset.description && <div className="text-xs text-muted-foreground">{preset.description}</div>}
      </CardContent>
    </Card>
  )
}
