import { cn } from "@/lib/utils"

interface SkeletonProps {
  className?: string
  variant?: "default" | "card" | "text" | "avatar" | "button"
}

export function Skeleton({ className, variant = "default" }: SkeletonProps) {
  const baseClasses = "animate-pulse bg-muted rounded-md"

  const variantClasses = {
    default: "h-4 w-full",
    card: "h-[200px] w-full",
    text: "h-4 w-3/4",
    avatar: "h-10 w-10 rounded-full",
    button: "h-9 w-20",
  }

  return <div className={cn(baseClasses, variantClasses[variant], className)} />
}
