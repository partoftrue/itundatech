"use client"

import { useState } from "react"
import { useTheme } from "next-themes"
import { Copy } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ColorSwatch {
  name: string
  variable: string
  tailwind?: string
  description?: string
}

const colorGroups = [
  {
    title: "Base Colors",
    colors: [
      { name: "Background", variable: "--background", tailwind: "bg-background" },
      { name: "Foreground", variable: "--foreground", tailwind: "text-foreground" },
      { name: "Card", variable: "--card", tailwind: "bg-card" },
      { name: "Card Foreground", variable: "--card-foreground", tailwind: "text-card-foreground" },
      { name: "Popover", variable: "--popover", tailwind: "bg-popover" },
      { name: "Popover Foreground", variable: "--popover-foreground", tailwind: "text-popover-foreground" },
      { name: "Border", variable: "--border", tailwind: "border-border" },
      { name: "Input", variable: "--input", tailwind: "border-input" },
    ],
  },
  {
    title: "Primary Colors",
    colors: [
      { name: "Primary", variable: "--primary", tailwind: "bg-primary", description: "Main brand color" },
      { name: "Primary Foreground", variable: "--primary-foreground", tailwind: "text-primary-foreground" },
    ],
  },
  {
    title: "Secondary Colors",
    colors: [
      { name: "Secondary", variable: "--secondary", tailwind: "bg-secondary" },
      { name: "Secondary Foreground", variable: "--secondary-foreground", tailwind: "text-secondary-foreground" },
      { name: "Muted", variable: "--muted", tailwind: "bg-muted" },
      { name: "Muted Foreground", variable: "--muted-foreground", tailwind: "text-muted-foreground" },
      { name: "Accent", variable: "--accent", tailwind: "bg-accent" },
      { name: "Accent Foreground", variable: "--accent-foreground", tailwind: "text-accent-foreground" },
    ],
  },
  {
    title: "Semantic Colors",
    colors: [
      { name: "Destructive", variable: "--destructive", tailwind: "bg-destructive", description: "Error states" },
      { name: "Destructive Foreground", variable: "--destructive-foreground", tailwind: "text-destructive-foreground" },
      { name: "Success", variable: "--success", tailwind: "bg-success", description: "Success states" },
      { name: "Success Foreground", variable: "--success-foreground", tailwind: "text-success-foreground" },
      { name: "Warning", variable: "--warning", tailwind: "bg-warning", description: "Warning states" },
      { name: "Warning Foreground", variable: "--warning-foreground", tailwind: "text-warning-foreground" },
      { name: "Info", variable: "--info", tailwind: "bg-info", description: "Information states" },
      { name: "Info Foreground", variable: "--info-foreground", tailwind: "text-info-foreground" },
    ],
  },
  {
    title: "Surface Colors",
    colors: [
      { name: "Surface 100", variable: "--surface-100", tailwind: "bg-surface-100", description: "Base surface" },
      { name: "Surface 200", variable: "--surface-200", tailwind: "bg-surface-200", description: "Elevated surface" },
      { name: "Surface 300", variable: "--surface-300", tailwind: "bg-surface-300", description: "Higher elevation" },
      { name: "Surface 400", variable: "--surface-400", tailwind: "bg-surface-400", description: "Highest elevation" },
    ],
  },
  {
    title: "Brand Colors",
    colors: [
      { name: "Brand", variable: "--brand", tailwind: "text-brand", description: "Main brand color" },
      { name: "Toss Blue", variable: "--toss-blue", tailwind: "text-toss-blue", description: "Toss-inspired blue" },
      { name: "Toss Navy", variable: "--toss-navy", tailwind: "text-toss-navy", description: "Toss-inspired navy" },
    ],
  },
]

export function ColorShowcase() {
  const { theme } = useTheme()
  const [copiedColor, setCopiedColor] = useState<string | null>(null)

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopiedColor(text)
    setTimeout(() => setCopiedColor(null), 2000)
  }

  const getContrastColor = (variable: string) => {
    // For demonstration, we'll use a simple check
    if (
      variable === "--background" ||
      variable === "--card" ||
      variable === "--popover" ||
      variable === "--secondary" ||
      variable === "--muted" ||
      variable === "--accent" ||
      variable === "--surface-100" ||
      variable === "--surface-200" ||
      variable === "--surface-300" ||
      variable === "--surface-400"
    ) {
      return theme === "dark" ? "text-black" : "text-white"
    }
    return "text-white"
  }

  return (
    <div className="space-y-10">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Color System</h2>
        <p className="text-muted-foreground">
          Our color system is inspired by Toss, Kakao, and Apple, focusing on clean, accessible colors that work well in
          both light and dark modes.
        </p>
      </div>

      {colorGroups.map((group) => (
        <div key={group.title} className="space-y-4">
          <h3 className="text-xl font-semibold">{group.title}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {group.colors.map((color) => (
              <div key={color.variable} className="rounded-lg border overflow-hidden transition-all hover:shadow-md">
                <div className={`h-24 ${color.tailwind} flex items-end p-3 ${getContrastColor(color.variable)}`}>
                  <div className="flex justify-between items-center w-full">
                    <span className="font-medium">{color.name}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-full bg-background/20 hover:bg-background/40"
                      onClick={() => copyToClipboard(color.tailwind || `hsl(var(${color.variable}))`)}
                    >
                      <Copy className="h-4 w-4" />
                      <span className="sr-only">Copy color value</span>
                    </Button>
                  </div>
                </div>
                <div className="p-3 space-y-1 bg-card">
                  {color.description && <p className="text-sm text-muted-foreground">{color.description}</p>}
                  <div className="flex flex-wrap gap-2 text-xs">
                    <code className="px-2 py-1 bg-muted rounded">{color.tailwind}</code>
                    <code className="px-2 py-1 bg-muted rounded">hsl(var({color.variable}))</code>
                  </div>
                  {copiedColor === (color.tailwind || `hsl(var(${color.variable}))`) && (
                    <p className="text-xs text-success">Copied to clipboard!</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="space-y-6">
        <h3 className="text-xl font-semibold">Color Usage Examplesples</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Toss-inspired Card */}
          <div className="card-toss">
            <h4 className="text-lg font-medium mb-2">Toss-inspired Card</h4>
            <p className="text-muted-foreground mb-4">Clean, minimal design with subtle shadows and rounded corners.</p>
            <div className="flex justify-end">
              <button className="btn-primary px-4 py-2 rounded-lg">Learn More</button>
            </div>
          </div>

          {/* Apple-inspired Input */}
          <div className="space-y-2">
            <label htmlFor="apple-input" className="text-sm font-medium">
              Apple-inspired Input
            </label>
            <input type="text" id="apple-input" className="input-apple w-full" placeholder="Enter your name" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Primary Button */}
          <button className="btn-primary px-4 py-2 rounded-lg w-full">Primary Button</button>

          {/* Secondary Button */}
          <button className="btn-secondary px-4 py-2 rounded-lg w-full">Secondary Button</button>

          {/* Kakao-inspired Button */}
          <button className="accent-kakao px-4 py-2 rounded-lg w-full">Kakao-inspired</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Glass Effect */}
          <div className="glass p-6 rounded-xl">
            <h4 className="text-lg font-medium mb-2">Glass Effect</h4>
            <p>Inspired by Apple's frosted glass UI elements.</p>
          </div>

          {/* Badge Examples */}
          <div className="flex flex-wrap gap-2 items-center p-6 border rounded-xl">
            <span className="badge-toss">New</span>
            <span className="inline-flex items-center rounded-full bg-success px-2.5 py-0.5 text-xs font-medium text-success-foreground">
              Success
            </span>
            <span className="inline-flex items-center rounded-full bg-warning px-2.5 py-0.5 text-xs font-medium text-warning-foreground">
              Warning
            </span>
            <span className="inline-flex items-center rounded-full bg-destructive px-2.5 py-0.5 text-xs font-medium text-destructive-foreground">
              Error
            </span>
            <span className="inline-flex items-center rounded-full bg-info px-2.5 py-0.5 text-xs font-medium text-info-foreground">
              Info
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
