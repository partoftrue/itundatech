import { cn } from "@/lib/utils"
import type React from "react"

interface TypographyProps {
  children: React.ReactNode
  className?: string
}

export function TypographyH1({ children, className }: TypographyProps) {
  return (
    <h1 className={cn("text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance", className)}>
      {children}
    </h1>
  )
}

export function TypographyH2({ children, className }: TypographyProps) {
  return <h2 className={cn("text-3xl md:text-4xl font-bold tracking-tight text-balance", className)}>{children}</h2>
}

export function TypographyH3({ children, className }: TypographyProps) {
  return <h3 className={cn("text-2xl md:text-3xl font-semibold tracking-tight text-balance", className)}>{children}</h3>
}

export function TypographyH4({ children, className }: TypographyProps) {
  return <h4 className={cn("text-xl md:text-2xl font-semibold tracking-tight", className)}>{children}</h4>
}

export function TypographyP({ children, className }: TypographyProps) {
  return <p className={cn("leading-7 text-pretty [&:not(:first-child)]:mt-6", className)}>{children}</p>
}

export function TypographyLead({ children, className }: TypographyProps) {
  return <p className={cn("text-xl text-muted-foreground text-pretty", className)}>{children}</p>
}

export function TypographyLarge({ children, className }: TypographyProps) {
  return <div className={cn("text-lg font-semibold", className)}>{children}</div>
}

export function TypographySmall({ children, className }: TypographyProps) {
  return <small className={cn("text-sm font-medium leading-none", className)}>{children}</small>
}

export function TypographyMuted({ children, className }: TypographyProps) {
  return <p className={cn("text-sm text-muted-foreground", className)}>{children}</p>
}

export function TypographySubtle({ children, className }: TypographyProps) {
  return <p className={cn("text-sm text-muted-foreground/80", className)}>{children}</p>
}
