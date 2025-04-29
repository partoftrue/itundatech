"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowUp, Share2, Bookmark } from "lucide-react"
import { cn } from "@/lib/utils"
import { buttonHover } from "@/lib/animations"

interface FloatingActionButtonProps {
  className?: string
}

export function FloatingActionButton({ className }: FloatingActionButtonProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Show button when user scrolls down 300px
      if (window.scrollY > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
        setIsExpanded(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <div className={cn("fixed bottom-6 right-6 z-40", className)}>
      <AnimatePresence>
        {isVisible && (
          <>
            {/* Secondary buttons */}
            <AnimatePresence>
              {isExpanded && (
                <>
                  <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center justify-center w-10 h-10 mb-3 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                    aria-label="Share"
                    {...buttonHover}
                  >
                    <Share2 className="h-5 w-5" />
                  </motion.button>
                  <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.2, delay: 0.1 }}
                    className="flex items-center justify-center w-10 h-10 mb-3 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                    aria-label="Bookmark"
                    {...buttonHover}
                  >
                    <Bookmark className="h-5 w-5" />
                  </motion.button>
                </>
              )}
            </AnimatePresence>

            {/* Main button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              onClick={() => {
                if (isExpanded) {
                  scrollToTop()
                } else {
                  setIsExpanded(!isExpanded)
                }
              }}
              onDoubleClick={() => scrollToTop()}
              className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-white shadow-lg hover:bg-primary/90 transition-colors"
              aria-label="Scroll to top"
              {...buttonHover}
            >
              <ArrowUp className="h-5 w-5" />
            </motion.button>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
