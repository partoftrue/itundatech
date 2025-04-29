import type React from "react"
import { cn } from "@/lib/utils"

type Columns = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12

interface ResponsiveGridProps {
  children: React.ReactNode
  className?: string
  cols?: {
    xs?: Columns
    sm?: Columns
    md?: Columns
    lg?: Columns
    xl?: Columns
    "2xl"?: Columns
  }
  gap?: {
    xs?: number
    sm?: number
    md?: number
    lg?: number
    xl?: number
    "2xl"?: number
  }
  as?: React.ElementType
}

export function ResponsiveGrid({
  children,
  className,
  cols = { xs: 1, sm: 2, md: 3, lg: 4 },
  gap = { xs: 4, sm: 6, md: 8 },
  as: Component = "div",
}: ResponsiveGridProps) {
  // Map columns to Tailwind classes
  const colClasses = {
    1: "grid-cols-1",
    2: "grid-cols-2",
    3: "grid-cols-3",
    4: "grid-cols-4",
    5: "grid-cols-5",
    6: "grid-cols-6",
    7: "grid-cols-7",
    8: "grid-cols-8",
    9: "grid-cols-9",
    10: "grid-cols-10",
    11: "grid-cols-11",
    12: "grid-cols-12",
  }

  // Map gap to Tailwind classes
  const gapClasses = {
    0: "gap-0",
    1: "gap-1",
    2: "gap-2",
    3: "gap-3",
    4: "gap-4",
    5: "gap-5",
    6: "gap-6",
    8: "gap-8",
    10: "gap-10",
    12: "gap-12",
    16: "gap-16",
  }

  // Build responsive column classes
  const columnClasses = [
    cols.xs && colClasses[cols.xs],
    cols.sm && `sm:${colClasses[cols.sm]}`,
    cols.md && `md:${colClasses[cols.md]}`,
    cols.lg && `lg:${colClasses[cols.lg]}`,
    cols.xl && `xl:${colClasses[cols.xl]}`,
    cols["2xl"] && `2xl:${colClasses[cols["2xl"]]}`,
  ].filter(Boolean)

  // Build responsive gap classes
  const gapValues = [
    gap.xs !== undefined && gapClasses[gap.xs as keyof typeof gapClasses],
    gap.sm !== undefined && `sm:${gapClasses[gap.sm as keyof typeof gapClasses]}`,
    gap.md !== undefined && `md:${gapClasses[gap.md as keyof typeof gapClasses]}`,
    gap.lg !== undefined && `lg:${gapClasses[gap.lg as keyof typeof gapClasses]}`,
    gap.xl !== undefined && `xl:${gapClasses[gap.xl as keyof typeof gapClasses]}`,
    gap["2xl"] !== undefined && `2xl:${gapClasses[gap["2xl"] as keyof typeof gapClasses]}`,
  ].filter(Boolean)

  return <Component className={cn("grid", ...columnClasses, ...gapValues, className)}>{children}</Component>
}
