"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { fadeInUp } from "@/lib/animations"
import { cn } from "@/lib/utils"

interface CTASectionProps {
  title: string
  description: string
  primaryCta: {
    text: string
    href: string
  }
  secondaryCta?: {
    text: string
    href: string
  }
  className?: string
}

export function CTASection({ title, description, primaryCta, secondaryCta, className }: CTASectionProps) {
  return (
    <div className={cn("relative overflow-hidden py-16 md:py-24", className)}>
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 dark:from-primary/10 dark:via-primary/20 dark:to-primary/10" />

      {/* Content */}
      <div className="relative z-10 max-w-screen-xl mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            {title}
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-muted-foreground mb-8"
          >
            {description}
          </motion.p>

          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button size="lg" className="rounded-full" asChild>
              <Link href={primaryCta.href}>
                {primaryCta.text} <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>

            {secondaryCta && (
              <Button size="lg" variant="outline" className="rounded-full" asChild>
                <Link href={secondaryCta.href}>{secondaryCta.text}</Link>
              </Button>
            )}
          </motion.div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
    </div>
  )
}
