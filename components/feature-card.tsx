"use client"

import type React from "react"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { buttonHover } from "@/lib/animations"

interface FeatureCardProps {
  title: string
  description: string
  icon: React.ReactNode
  className?: string
  index?: number
}

export function FeatureCard({ title, description, icon, className, index = 0 }: FeatureCardProps) {
  // Array of background colors for features
  const bgColors = [
    "bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-900/50",
    "bg-purple-50 dark:bg-purple-950/30 border-purple-200 dark:border-purple-900/50",
    "bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-900/50",
    "bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-900/50",
    "bg-rose-50 dark:bg-rose-950/30 border-rose-200 dark:border-rose-900/50",
    "bg-cyan-50 dark:bg-cyan-950/30 border-cyan-200 dark:border-cyan-900/50",
  ]

  // Array of icon background colors
  const iconBgColors = [
    "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400",
    "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400",
    "bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400",
    "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400",
    "bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400",
    "bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400",
  ]

  // Get color based on index
  const colorIndex = index % bgColors.length
  const bgColor = bgColors[colorIndex]
  const iconBgColor = iconBgColors[colorIndex]

  return (
    <motion.div
      {...buttonHover}
      className={cn(
        "p-4 sm:p-6 rounded-xl sm:rounded-2xl border shadow-sm transition-all duration-300 hover:shadow-md",
        bgColor,
        className,
      )}
    >
      <div
        className={cn(
          "w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl flex items-center justify-center mb-3 sm:mb-4",
          iconBgColor,
        )}
      >
        {icon}
      </div>
      <h3 className="text-lg sm:text-xl font-semibold mb-2">{title}</h3>
      <p className="text-sm sm:text-base text-muted-foreground">{description}</p>
    </motion.div>
  )
}
