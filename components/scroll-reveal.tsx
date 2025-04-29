"use client"

import type React from "react"

import { useRef, useEffect, useState } from "react"
import { motion, useAnimation, useInView } from "framer-motion"
import { cn } from "@/lib/utils"

interface ScrollRevealProps {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: "up" | "down" | "left" | "right" | "none"
  distance?: number
  threshold?: number
  duration?: number
  once?: boolean
}

export function ScrollReveal({
  children,
  className,
  delay = 0,
  direction = "up",
  distance = 50,
  threshold = 0.1,
  duration = 0.5,
  once = true,
}: ScrollRevealProps) {
  const controls = useAnimation()
  const ref = useRef(null)
  const inView = useInView(ref, { threshold, once })
  const [hasAnimated, setHasAnimated] = useState(false)

  // Set initial animation properties based on direction
  const getInitialProps = () => {
    switch (direction) {
      case "up":
        return { opacity: 0, y: distance }
      case "down":
        return { opacity: 0, y: -distance }
      case "left":
        return { opacity: 0, x: distance }
      case "right":
        return { opacity: 0, x: -distance }
      case "none":
        return { opacity: 0 }
      default:
        return { opacity: 0, y: distance }
    }
  }

  // Set animation target properties
  const getTargetProps = () => {
    switch (direction) {
      case "up":
      case "down":
        return { opacity: 1, y: 0 }
      case "left":
      case "right":
        return { opacity: 1, x: 0 }
      case "none":
        return { opacity: 1 }
      default:
        return { opacity: 1, y: 0 }
    }
  }

  useEffect(() => {
    if (inView && !hasAnimated) {
      controls.start(getTargetProps())
      if (once) {
        setHasAnimated(true)
      }
    } else if (!inView && !once && hasAnimated) {
      controls.start(getInitialProps())
      setHasAnimated(false)
    }
  }, [inView, controls, hasAnimated, once])

  return (
    <motion.div
      ref={ref}
      initial={getInitialProps()}
      animate={controls}
      transition={{ duration, delay, ease: "easeOut" }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  )
}
