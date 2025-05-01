"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { TestimonialCard } from "@/components/testimonial-card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { staggerContainer, staggerItem } from "@/lib/animations"

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

  // Determine how many testimonials to show based on screen width
  useEffect(() => {
    const handleResize = () => {
      let itemsToShow = 1
      if (typeof window !== "undefined") {
        if (window.innerWidth >= 1024) {
          itemsToShow = 3
        } else if (window.innerWidth >= 640) {
          itemsToShow = 2
        }
      }

      const endIndex = Math.min(currentIndex + itemsToShow, testimonials.length)
      setVisibleTestimonials(testimonials.slice(currentIndex, endIndex))
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [currentIndex, testimonials])

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(testimonials.length - 1, prev + 1))
  }

  return (
    <div className="py-16 md:py-24">
      <div className="max-w-screen-xl mx-auto px-6">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-12"
        >
          <motion.h2 variants={staggerItem} className="text-3xl md:text-4xl font-bold mb-4">
            {title}
          </motion.h2>
          {subtitle && (
            <motion.p variants={staggerItem} className="text-xl text-muted-foreground max-w-2xl mx-auto">
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
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
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
          <div className="flex justify-center mt-8 gap-2">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full"
              onClick={handlePrev}
              disabled={currentIndex === 0}
            >
              <ChevronLeft className="h-5 w-5" />
              <span className="sr-only">Previous</span>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full"
              onClick={handleNext}
              disabled={currentIndex >= testimonials.length - visibleTestimonials.length}
            >
              <ChevronRight className="h-5 w-5" />
              <span className="sr-only">Next</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
