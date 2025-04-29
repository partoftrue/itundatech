import type React from "react"
import { cn } from "@/lib/utils"

interface ResponsiveContainerProps {
  children: React.ReactNode
  className?: string
  as?: React.ElementType
  fluid?: boolean
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full" | "none"
  padding?: boolean
}

export function ResponsiveContainer({
  children,
  className,
  as: Component = "div",
  fluid = false,
  maxWidth = "xl",
  padding = true,
}: ResponsiveContainerProps) {
  const maxWidthClasses = {
    sm: "max-w-screen-sm",
    md: "max-w-screen-md",
    lg: "max-w-screen-lg",
    xl: "max-w-screen-xl",
    "2xl": "max-w-screen-2xl",
    full: "max-w-full",
    none: "",
  }

  return (
    <Component
      className={cn(
        "w-full mx-auto",
        !fluid && maxWidthClasses[maxWidth],
        padding && "px-4 sm:px-6 md:px-8",
        className,
      )}
    >
      {children}
    </Component>
  )
}
