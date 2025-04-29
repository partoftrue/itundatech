"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { fadeInLeft, fadeInRight, staggerContainer, staggerItem } from "@/lib/animations"
import { cn } from "@/lib/utils"
import { ResponsiveContainer } from "./ui/responsive-container"
import { useResponsive } from "@/hooks/use-responsive"

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
  const { isMobile, isTablet } = useResponsive()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div
      className={cn(
        "relative overflow-hidden bg-gradient-to-br from-background to-muted/30 py-16 md:py-24 lg:py-28",
        className,
      )}
    >
      {/* Background elements - only show on larger screens */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 1.5 }}
          className="absolute top-10 left-10 w-32 sm:w-48 md:w-64 h-32 sm:h-48 md:h-64 rounded-full bg-primary/5 blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ duration: 1.5, delay: 0.3 }}
          className="absolute bottom-10 right-10 w-40 sm:w-60 md:w-80 h-40 sm:h-60 md:h-80 rounded-full bg-primary/10 blur-3xl"
        />
      </div>

      <ResponsiveContainer className="relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-3xl mx-auto text-center"
        >
          <motion.span
            variants={staggerItem}
            className="inline-block px-3 sm:px-4 py-1 sm:py-1.5 mb-4 sm:mb-6 text-xs sm:text-sm font-medium rounded-full bg-primary/10 text-primary"
          >
            {subtitle}
          </motion.span>

          <motion.h1
            variants={staggerItem}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight tracking-tight"
          >
            {title}
          </motion.h1>

          {description && (
            <motion.p
              variants={staggerItem}
              className="text-base sm:text-lg md:text-xl text-muted-foreground mb-6 sm:mb-8 leading-relaxed px-4 sm:px-0"
            >
              {description}
            </motion.p>
          )}

          <motion.div
            variants={staggerItem}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 sm:px-0"
          >
            <Button size={isMobile ? "default" : "lg"} className="rounded-full w-full sm:w-auto" asChild>
              <Link href={ctaLink}>
                {ctaText} <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>

            {secondaryCtaText && secondaryCtaLink && (
              <Button
                size={isMobile ? "default" : "lg"}
                variant="outline"
                className="rounded-full w-full sm:w-auto"
                asChild
              >
                <Link href={secondaryCtaLink}>{secondaryCtaText}</Link>
              </Button>
            )}
          </motion.div>
        </motion.div>
      </ResponsiveContainer>

      {/* Decorative elements - only show on larger screens */}
      <motion.div
        variants={fadeInLeft}
        initial="hidden"
        animate="visible"
        className="absolute left-10 top-1/3 w-16 h-16 md:w-24 md:h-24 rounded-full bg-primary/5 hidden lg:block"
      />

      <motion.div
        variants={fadeInRight}
        initial="hidden"
        animate="visible"
        className="absolute right-10 bottom-1/4 w-20 h-20 md:w-32 md:h-32 rounded-full bg-primary/10 hidden lg:block"
      />
    </div>
  )
}
