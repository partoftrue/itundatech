"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { fadeInLeft, fadeInRight, staggerContainer, staggerItem } from "@/lib/animations"
import { cn } from "@/lib/utils"

interface HeroSectionEnhancedProps {
  title: string
  subtitle: string
  description?: string
  ctaText: string
  ctaLink: string
  secondaryCtaText?: string
  secondaryCtaLink?: string
  className?: string
}

export function HeroSectionEnhanced({
  title,
  subtitle,
  description,
  ctaText,
  ctaLink,
  secondaryCtaText,
  secondaryCtaLink,
  className,
}: HeroSectionEnhancedProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div
      className={cn("relative overflow-hidden bg-gradient-to-br from-background to-muted/30 py-20 md:py-28", className)}
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 1.5 }}
          className="absolute top-10 left-10 w-64 h-64 rounded-full bg-primary/5 blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ duration: 1.5, delay: 0.3 }}
          className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-primary/10 blur-3xl"
        />
      </div>

      <div className="relative z-10 max-w-screen-xl mx-auto px-6">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-3xl mx-auto text-center"
        >
          <motion.span
            variants={staggerItem}
            className="inline-block px-4 py-1.5 mb-6 text-sm font-medium rounded-full bg-primary/10 text-primary"
          >
            {subtitle}
          </motion.span>

          <motion.h1
            variants={staggerItem}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight tracking-tight"
          >
            {title}
          </motion.h1>

          {description && (
            <motion.p variants={staggerItem} className="text-xl text-muted-foreground mb-8 leading-relaxed">
              {description}
            </motion.p>
          )}

          <motion.div variants={staggerItem} className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="rounded-full" asChild>
              <Link href={ctaLink}>
                {ctaText} <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>

            {secondaryCtaText && secondaryCtaLink && (
              <Button size="lg" variant="outline" className="rounded-full" asChild>
                <Link href={secondaryCtaLink}>{secondaryCtaText}</Link>
              </Button>
            )}
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative elements */}
      <motion.div
        variants={fadeInLeft}
        initial="hidden"
        animate="visible"
        className="absolute left-10 top-1/3 w-24 h-24 rounded-full bg-primary/5 hidden lg:block"
      />

      <motion.div
        variants={fadeInRight}
        initial="hidden"
        animate="visible"
        className="absolute right-10 bottom-1/4 w-32 h-32 rounded-full bg-primary/10 hidden lg:block"
      />
    </div>
  )
}
