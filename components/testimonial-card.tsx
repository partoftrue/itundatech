"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Quote } from "lucide-react"

interface TestimonialCardProps {
  quote: string
  author: string
  role: string
  company?: string
  avatarUrl?: string
  className?: string
  index?: number
}

export function TestimonialCard({
  quote,
  author,
  role,
  company,
  avatarUrl,
  className,
  index = 0,
}: TestimonialCardProps) {
  // Array of background colors for testimonials
  const bgColors = [
    "bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-900/50",
    "bg-purple-50 dark:bg-purple-950/30 border-purple-200 dark:border-purple-900/50",
    "bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-900/50",
    "bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-900/50",
    "bg-rose-50 dark:bg-rose-950/30 border-rose-200 dark:border-rose-900/50",
    "bg-cyan-50 dark:bg-cyan-950/30 border-cyan-200 dark:border-cyan-900/50",
  ]

  // Array of quote icon colors
  const quoteColors = [
    "text-blue-300 dark:text-blue-700",
    "text-purple-300 dark:text-purple-700",
    "text-amber-300 dark:text-amber-700",
    "text-emerald-300 dark:text-emerald-700",
    "text-rose-300 dark:text-rose-700",
    "text-cyan-300 dark:text-cyan-700",
  ]

  // Get color based on index
  const colorIndex = index % bgColors.length
  const bgColor = bgColors[colorIndex]
  const quoteColor = quoteColors[colorIndex]

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className={cn("p-6 rounded-2xl border shadow-sm", bgColor, className)}
    >
      <Quote className={cn("h-8 w-8 mb-4", quoteColor)} />
      <p className="text-lg mb-6 leading-relaxed">{quote}</p>
      <div className="flex items-center">
        {avatarUrl ? (
          <img src={avatarUrl || "/placeholder.svg"} alt={author} className="w-10 h-10 rounded-full mr-3" />
        ) : (
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
            <span className="text-primary font-medium">{author.charAt(0)}</span>
          </div>
        )}
        <div>
          <p className="font-medium">{author}</p>
          <p className="text-sm text-muted-foreground">
            {role}
            {company && ` at ${company}`}
          </p>
        </div>
      </div>
    </motion.div>
  )
}
