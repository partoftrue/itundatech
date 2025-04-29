"use client"

import type React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { Check, Copy, Info } from "lucide-react"

interface TooltipProps {
  children: React.ReactNode
  content: string
  position?: "top" | "bottom" | "left" | "right"
  className?: string
}

export function Tooltip({ children, content, position = "top", className }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false)

  const positionClasses = {
    top: "bottom-full mb-2",
    bottom: "top-full mt-2",
    left: "right-full mr-2",
    right: "left-full ml-2",
  }

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
    >
      {children}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.15 }}
            className={cn(
              "absolute z-50 px-2 py-1 text-xs font-medium text-white bg-gray-900 rounded whitespace-nowrap",
              positionClasses[position],
              className,
            )}
          >
            {content}
            <div
              className={cn(
                "absolute w-2 h-2 bg-gray-900 rotate-45",
                position === "top" && "top-full -translate-y-1 left-1/2 -translate-x-1/2",
                position === "bottom" && "bottom-full translate-y-1 left-1/2 -translate-x-1/2",
                position === "left" && "left-full -translate-x-1 top-1/2 -translate-y-1/2",
                position === "right" && "right-full translate-x-1 top-1/2 -translate-y-1/2",
              )}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

interface CopyButtonProps {
  text: string
  className?: string
  successText?: string
  size?: "sm" | "md" | "lg"
}

export function CopyButton({ text, className, successText = "Copied!", size = "md" }: CopyButtonProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const sizeClasses = {
    sm: "p-1",
    md: "p-2",
    lg: "p-3",
  }

  return (
    <button
      onClick={handleCopy}
      className={cn(
        "relative inline-flex items-center justify-center rounded-md transition-colors",
        "hover:bg-muted focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
        sizeClasses[size],
        className,
      )}
      aria-label={copied ? successText : "Copy to clipboard"}
    >
      <AnimatePresence initial={false} mode="wait">
        <motion.span
          key={copied ? "check" : "copy"}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          transition={{ duration: 0.15 }}
        >
          {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
        </motion.span>
      </AnimatePresence>

      <AnimatePresence>
        {copied && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="absolute bottom-full mb-2 px-2 py-1 text-xs font-medium text-white bg-gray-900 rounded"
          >
            {successText}
            <div className="absolute w-2 h-2 bg-gray-900 rotate-45 top-full -translate-y-1 left-1/2 -translate-x-1/2" />
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  )
}

interface InfoBadgeProps {
  text: string
  className?: string
}

export function InfoBadge({ text, className }: InfoBadgeProps) {
  const [isVisible, setIsVisible] = useState(false)

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setIsVisible(!isVisible)}
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        className={cn(
          "inline-flex items-center justify-center rounded-full w-5 h-5 text-xs",
          "bg-muted text-muted-foreground hover:bg-muted/80",
          className,
        )}
        aria-label="Information"
      >
        <Info className="h-3 w-3" />
      </button>

      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.15 }}
            className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 text-sm text-white bg-gray-900 rounded max-w-xs"
          >
            {text}
            <div className="absolute w-2 h-2 bg-gray-900 rotate-45 top-full -translate-y-1 left-1/2 -translate-x-1/2" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
