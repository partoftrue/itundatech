import type React from "react"
import { cn } from "@/lib/utils"

interface ResponsiveColumnsProps {
  children: React.ReactNode
  className?: string
  columns?: 1 | 2 | 3 | 4 | "auto"
  gap?: "xs" | "sm" | "md" | "lg"
  breakAt?: "sm" | "md" | "lg" | "never"
}

export function ResponsiveColumns({
  children,
  className,
  columns = 2,
  gap = "md",
  breakAt = "md",
  ...props
}: ResponsiveColumnsProps & React.HTMLAttributes<HTMLDivElement>) {
  const columnsClasses = {
    1: "grid-cols-1",
    2: `grid-cols-1 ${breakAt !== "never" ? `${breakAt}:grid-cols-2` : "grid-cols-2"}`,
    3: `grid-cols-1 ${breakAt === "sm" ? "sm:grid-cols-3" : breakAt === "md" ? "md:grid-cols-3" : breakAt === "lg" ? "lg:grid-cols-3" : "grid-cols-3"}`,
    4: `grid-cols-1 ${breakAt === "sm" ? "sm:grid-cols-2 md:grid-cols-4" : breakAt === "md" ? "md:grid-cols-2 lg:grid-cols-4" : breakAt === "lg" ? "lg:grid-cols-4" : "grid-cols-4"}`,
    auto: "grid-cols-responsive-3",
  }

  const gapClasses = {
    xs: "gap-2 sm:gap-3",
    sm: "gap-3 sm:gap-4",
    md: "gap-4 sm:gap-6",
    lg: "gap-6 sm:gap-8",
  }

  return (
    <div className={cn("grid", columnsClasses[columns], gapClasses[gap], className)} {...props}>
      {children}
    </div>
  )
}
