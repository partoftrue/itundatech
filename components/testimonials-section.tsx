"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { TestimonialCard } from "@/components/testimonial-card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { staggerContainer, staggerItem } from "@/lib/animations"
import { ResponsiveContainer } from "./ui/responsive-container"
import { useResponsive } from "@/hooks/use-responsive"

interface Testimonial {
  id: string
  quote: string
  author: string
  role: string
  company?: string
  avatarUrl?: string
}

interface TestimonialsSectionProps {
  testimonials: Testimonial[]
  title?: string
  subtitle?: string
}

export function TestimonialsSection({ testimonials, title = "What People Say", subtitle }: TestimonialsSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [visibleTestimonials, setVisibleTestimonials] = useState<Testimonial[]>([])
  const containerRef = useRef<HTMLDivElement>(null)
  const { isMobile, isTablet, isDesktop } = useResponsive()

  // Determine how many testimonials to show based on screen width
  useEffect(() => {
    let itemsToShow = 1
    if (isDesktop) {
      itemsToShow = 3
    } else if (isTablet) {
      itemsToShow = 2
    }

    const endIndex = Math.min(currentIndex + itemsToShow, testimonials.length)
    setVisibleTestimonials(testimonials.slice(currentIndex, endIndex))
  }, [currentIndex, testimonials, isMobile, isTablet, isDesktop])

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(testimonials.length - 1, prev + 1))
  }

  return (
    <section className="py-16 md:py-24">
      <ResponsiveContainer>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-10 sm:mb-12"
        >
          <motion.h2 variants={staggerItem} className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
            {title}
          </motion.h2>
          {subtitle && (
            <motion.p
              variants={staggerItem}
              className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-4 sm:px-0"
            >
              {subtitle}
            </motion.p>
          )}
        </motion.div>

        <div className="relative">
          <div ref={containerRef} className="overflow-hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
            >
              {visibleTestimonials.map((testimonial, index) => (
                <TestimonialCard
                  key={testimonial.id}
                  quote={testimonial.quote}
                  author={testimonial.author}
                  role={testimonial.role}
                  company={testimonial.company}
                  avatarUrl={testimonial.avatarUrl}
                  index={index + currentIndex}
                />
              ))}
            </motion.div>
          </div>

          {/* Navigation buttons */}
          <div className="flex justify-center mt-6 sm:mt-8 gap-2">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full"
              onClick={handlePrev}
              disabled={currentIndex === 0}
            >
              <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="sr-only">Previous</span>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full"
              onClick={handleNext}
              disabled={currentIndex >= testimonials.length - visibleTestimonials.length}
            >
              <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="sr-only">Next</span>
            </Button>
          </div>
        </div>
      </ResponsiveContainer>
    </section>
  )
}
