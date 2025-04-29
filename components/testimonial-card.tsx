"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { Quote } from "lucide-react"

interface TestimonialCardProps {
  quote: string
  author: string
  role: string
  company?: string
  avatarUrl?: string
  index?: number
}

export function TestimonialCard({ quote, author, role, company, avatarUrl, index = 0 }: TestimonialCardProps) {
  // Array of background colors for testimonials
  const bgColors = [
    "bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-900/50",
    "bg-purple-50 dark:bg-purple-950/30 border-purple-200 dark:border-purple-900/50",
    "bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-900/50",
  ]

  // Array of accent colors for testimonials
  const accentColors = [
    "text-blue-600 dark:text-blue-400",
    "text-purple-600 dark:text-purple-400",
    "text-amber-600 dark:text-amber-400",
  ]

  // Get color based on index
  const colorIndex = index % bgColors.length
  const bgColor = bgColors[colorIndex]
  const accentColor = accentColors[colorIndex]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={cn("p-4 sm:p-6 rounded-xl border shadow-sm hover:shadow-md transition-all duration-300", bgColor)}
    >
      <div className={cn("mb-3 sm:mb-4", accentColor)}>
        <Quote className="h-5 w-5 sm:h-6 sm:w-6" />
      </div>
      <p className="text-sm sm:text-base mb-4 sm:mb-6 line-clamp-4">{quote}</p>
      <div className="flex items-center">
        {avatarUrl && (
          <div className="mr-3 sm:mr-4 flex-shrink-0">
            <Image
              src={avatarUrl || "/placeholder.svg"}
              alt={author}
              width={40}
              height={40}
              className="rounded-full w-8 h-8 sm:w-10 sm:h-10 object-cover"
            />
          </div>
        )}
        <div>
          <p className="font-medium text-sm sm:text-base">{author}</p>
          <p className="text-xs sm:text-sm text-muted-foreground">
            {role}
            {company ? `, ${company}` : ""}
          </p>
        </div>
      </div>
    </motion.div>
  )
}
