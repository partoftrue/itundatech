"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { cn } from "@/lib/utils"
import { fadeInUp } from "@/lib/animations"

interface Stat {
  value: number
  label: string
  prefix?: string
  suffix?: string
}

interface StatsSectionProps {
  stats: Stat[]
  title?: string
  subtitle?: string
  className?: string
}

export function StatsSection({ stats, title, subtitle, className }: StatsSectionProps) {
  return (
    <div className={cn("py-16 md:py-24", className)}>
      <div className="max-w-screen-xl mx-auto px-6">
        {(title || subtitle) && (
          <div className="text-center mb-12">
            {title && <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>}
            {subtitle && <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>}
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <StatCard key={index} stat={stat} index={index} />
          ))}
        </div>
      </div>
    </div>
  )
}

interface StatCardProps {
  stat: Stat
  index: number
}

function StatCard({ stat, index }: StatCardProps) {
  const [counted, setCounted] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })

  // Colors for stats
  const colors = [
    "text-blue-600 dark:text-blue-400",
    "text-purple-600 dark:text-purple-400",
    "text-amber-600 dark:text-amber-400",
    "text-emerald-600 dark:text-emerald-400",
  ]

  const color = colors[index % colors.length]

  useEffect(() => {
    if (!isInView) return

    let start = 0
    const end = stat.value
    const duration = 2000 // 2 seconds
    const increment = end / (duration / 16) // 60fps

    // Don't run the animation if we've already counted
    if (counted !== 0) return

    const timer = setInterval(() => {
      start += increment
      if (start > end) {
        setCounted(end)
        clearInterval(timer)
      } else {
        setCounted(Math.floor(start))
      }
    }, 16)

    return () => clearInterval(timer)
  }, [isInView, stat.value, counted])

  return (
    <motion.div
      ref={ref}
      variants={fadeInUp}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="text-center"
    >
      <p className={cn("text-4xl md:text-5xl font-bold mb-2", color)}>
        {stat.prefix}
        {counted}
        {stat.suffix}
      </p>
      <p className="text-muted-foreground">{stat.label}</p>
    </motion.div>
  )
}
