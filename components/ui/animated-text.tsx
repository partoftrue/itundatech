"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface AnimatedTextProps {
  text: string
  className?: string
  once?: boolean
  highlightColor?: string
  highlightWords?: string[]
  delay?: number
  speed?: number
  type?: "word" | "character" | "line"
}

export function AnimatedText({
  text,
  className,
  once = true,
  highlightColor = "text-primary",
  highlightWords = [],
  delay = 0,
  speed = 0.05,
  type = "word",
}: AnimatedTextProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return <div className={className}>{text}</div>

  // Split text into lines, words, or characters
  let items: string[] = []
  if (type === "line") {
    items = text.split("\n")
  } else if (type === "word") {
    items = text.split(" ")
  } else {
    items = text.split("")
  }

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: speed, delayChildren: delay * i },
    }),
  }

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  }

  return (
    <motion.div
      className={cn("overflow-hidden", className)}
      variants={container}
      initial="hidden"
      animate="visible"
      viewport={{ once }}
    >
      {type === "line" ? (
        items.map((line, index) => (
          <motion.p key={index} variants={child} className="mb-2">
            {line}
          </motion.p>
        ))
      ) : (
        <span className="inline-block whitespace-pre-wrap">
          {items.map((item, index) => {
            const word = type === "word" ? item : item
            const isHighlighted = highlightWords.includes(word.replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, ""))

            return (
              <motion.span
                key={index}
                variants={child}
                className={cn("inline-block", type === "word" && "mr-1", isHighlighted && highlightColor)}
              >
                {item}
                {type === "word" && index < items.length - 1 ? " " : ""}
              </motion.span>
            )
          })}
        </span>
      )}
    </motion.div>
  )
}
