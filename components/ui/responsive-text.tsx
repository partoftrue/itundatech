import type React from "react"

interface ResponsiveTextProps {
  as?: React.ElementType
  size?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl"
  children: React.ReactNode
  className?: string
}

export function ResponsiveText({
  as: Component = "span",
  size = "base",
  children,
  className,
  ...props
}: ResponsiveTextProps & React.HTMLAttributes<HTMLElement>) {
  const sizeClasses = {
    xs: "text-responsive-xs",
    sm: "text-responsive-sm",
    base: "text-responsive-base",
    lg: "text-responsive-lg",
    xl: "text-responsive-xl",
    "2xl": "text-responsive-2xl",
    "3xl": "text-responsive-3xl",
    "4xl": "text-responsive-4xl",
    "5xl": "text-responsive-5xl",
  }

  return (
    <Component className={`${sizeClasses[size]} ${className || ""}`} {...props}>
      {children}
    </Component>
  )
}
