"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { spinTransition } from "@/lib/animations"

interface SpinnerProps {
  size?: "sm" | "md" | "lg"
  className?: string
}

export function Spinner({ size = "md", className }: SpinnerProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  }

  return (
    <div className={cn("flex items-center justify-center", className)}>
      <motion.div
        className={cn(
          "rounded-full border-2 border-t-primary border-r-primary/30 border-b-primary/10 border-l-primary/60",
          sizeClasses[size],
        )}
        animate={{ rotate: 360 }}
        transition={spinTransition}
      />
    </div>
  )
}
