import { cn } from "@/lib/utils"

interface ResponsiveSpacingProps {
  size?: "xs" | "sm" | "md" | "lg" | "xl"
  direction?: "horizontal" | "vertical"
  className?: string
}

export function ResponsiveSpacing({ size = "md", direction = "vertical", className }: ResponsiveSpacingProps) {
  const sizeClasses = {
    xs: direction === "vertical" ? "h-[clamp(0.5rem,2vw,1rem)]" : "w-[clamp(0.5rem,2vw,1rem)]",
    sm: direction === "vertical" ? "h-[clamp(1rem,3vw,1.5rem)]" : "w-[clamp(1rem,3vw,1.5rem)]",
    md: direction === "vertical" ? "h-[clamp(1.5rem,4vw,2.5rem)]" : "w-[clamp(1.5rem,4vw,2.5rem)]",
    lg: direction === "vertical" ? "h-[clamp(2.5rem,6vw,4rem)]" : "w-[clamp(2.5rem,6vw,4rem)]",
    xl: direction === "vertical" ? "h-[clamp(4rem,8vw,6rem)]" : "w-[clamp(4rem,8vw,6rem)]",
  }

  return <div className={cn(sizeClasses[size], className)} aria-hidden="true" />
}
