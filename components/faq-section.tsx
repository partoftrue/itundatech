"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { fadeInUp } from "@/lib/animations"

interface FAQItem {
  question: string
  answer: string
}

interface FAQSectionProps {
  faqs: FAQItem[]
  title?: string
  subtitle?: string
  className?: string
}

export function FAQSection({ faqs, title = "Frequently Asked Questions", subtitle, className }: FAQSectionProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index)
  }

  return (
    <div className={cn("py-16 md:py-24", className)}>
      <div className="max-w-screen-xl mx-auto px-6">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
          {subtitle && <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>}
        </motion.div>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={cn(
                "border rounded-xl mb-4 overflow-hidden",
                expandedIndex === index
                  ? "bg-primary/5 border-primary/20"
                  : "bg-card hover:bg-muted/50 transition-colors",
              )}
            >
              <button
                onClick={() => toggleExpand(index)}
                className="flex justify-between items-center w-full p-6 text-left"
                aria-expanded={expandedIndex === index}
              >
                <span className="font-medium text-lg">{faq.question}</span>
                <ChevronDown
                  className={cn(
                    "h-5 w-5 text-muted-foreground transition-transform duration-200",
                    expandedIndex === index && "rotate-180",
                  )}
                />
              </button>
              <AnimatePresence>
                {expandedIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-6 text-muted-foreground">{faq.answer}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
