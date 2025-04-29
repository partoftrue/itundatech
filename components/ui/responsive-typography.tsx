import type React from "react"
import { cn } from "@/lib/utils"

interface ResponsiveTypographyProps {
  as?: React.ElementType
  variant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "small" | "large"
  children: React.ReactNode
  className?: string
}

export function ResponsiveTypography({
  as: Component = "p",
  variant = "p",
  children,
  className,
  ...props
}: ResponsiveTypographyProps & React.HTMLAttributes<HTMLElement>) {
  const variantClasses = {
    h1: "text-responsive-5xl font-bold tracking-tight",
    h2: "text-responsive-4xl font-semibold tracking-tight",
    h3: "text-responsive-3xl font-semibold tracking-tight",
    h4: "text-responsive-2xl font-semibold tracking-tight",
    h5: "text-responsive-xl font-semibold tracking-tight",
    h6: "text-responsive-lg font-semibold tracking-tight",
    p: "text-responsive-base",
    small: "text-responsive-sm",
    large: "text-responsive-lg",
  }

  return (
    <Component className={cn(variantClasses[variant], className)} {...props}>
      {children}
    </Component>
  )
}
