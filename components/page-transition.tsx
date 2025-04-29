"use client"

import type React from "react"

import { motion } from "framer-motion"
import { pageTransition } from "@/lib/animations"

interface PageTransitionProps {
  children: React.ReactNode
}

export function PageTransition({ children }: PageTransitionProps) {
  return (
    <motion.div variants={pageTransition} initial="hidden" animate="visible" exit="exit">
      {children}
    </motion.div>
  )
}
