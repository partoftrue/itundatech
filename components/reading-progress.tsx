"use client"

import { useState, useEffect } from "react"
import { motion, useScroll } from "framer-motion"

export function ReadingProgress() {
  const { scrollYProgress } = useScroll()
  const [isVisible, setIsVisible] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)

    const handleScroll = () => {
      // Show progress bar after scrolling down a bit
      if (window.scrollY > 150) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Don't render anything on server
  if (!isMounted) return null

  if (!isVisible) return null

  return (
    <motion.div
      className="fixed top-16 left-0 right-0 h-1 bg-primary z-50"
      style={{ scaleX: scrollYProgress, transformOrigin: "0%" }}
    />
  )
}
