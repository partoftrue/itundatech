import type React from "react"
import { cn } from "@/lib/utils"

interface ResponsiveLayoutProps {
  children: React.ReactNode
  className?: string
  variant?: "default" | "narrow" | "wide" | "full"
  as?: React.ElementType
}

export function ResponsiveLayout({
  children,
  className,
  variant = "default",
  as: Component = "div",
  ...props
}: ResponsiveLayoutProps & React.HTMLAttributes<HTMLElement>) {
  const variantClasses = {
    default: "w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
    narrow: "w-full max-w-3xl mx-auto px-4 sm:px-6",
    wide: "w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8",
    full: "w-full",
  }

  return (
    <Component className={cn(variantClasses[variant], className)} {...props}>
      {children}
    </Component>
  )
}
