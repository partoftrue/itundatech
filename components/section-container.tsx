import type React from "react"
import { cn } from "@/lib/utils"

interface SectionContainerProps {
  children: React.ReactNode
  className?: string
  as?: React.ElementType
  noPadding?: boolean
}

export function SectionContainer({
  children,
  className,
  as: Component = "section",
  noPadding = false,
}: SectionContainerProps) {
  return (
    <Component className={cn(!noPadding && "py-8 sm:py-12 md:py-16", className)}>
      <div className="toss-container">{children}</div>
    </Component>
  )
}
