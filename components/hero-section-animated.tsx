"use client"

import type React from "react"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { slideUp, slideInLeft, slideInRight } from "@/lib/animations"

interface HeroSectionAnimatedProps {
  title: string
  description: string
  className?: string
  children?: React.ReactNode
}

export function HeroSectionAnimated({ title, description, className, children }: HeroSectionAnimatedProps) {
  return (
    <div className={cn("py-16 md:py-24 bg-muted/30", className)}>
      <div className="max-w-screen-xl mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h1
            className="text-4xl md:text-5xl font-bold mb-6 leading-tight"
            variants={slideUp}
            initial="hidden"
            animate="visible"
          >
            {title}
          </motion.h1>

          <motion.p
            className="text-xl text-muted-foreground mb-8"
            variants={slideUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
          >
            {description}
          </motion.p>

          {children && (
            <motion.div variants={slideUp} initial="hidden" animate="visible" transition={{ delay: 0.4 }}>
              {children}
            </motion.div>
          )}
        </div>
      </div>

      {/* Decorative elements */}
      <motion.div
        className="absolute left-10 top-1/3 w-24 h-24 rounded-full bg-primary/5 hidden lg:block"
        variants={slideInLeft}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.6 }}
      />

      <motion.div
        className="absolute right-10 bottom-1/4 w-32 h-32 rounded-full bg-primary/10 hidden lg:block"
        variants={slideInRight}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.8 }}
      />
    </div>
  )
}
