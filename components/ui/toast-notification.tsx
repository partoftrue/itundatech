"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, CheckCircle, AlertCircle, Info } from "lucide-react"
import { cn } from "@/lib/utils"

export type ToastType = "success" | "error" | "info" | "warning"

interface ToastProps {
  id: string
  title: string
  description?: string
  type?: ToastType
  duration?: number
  onClose: (id: string) => void
}

export function Toast({ id, title, description, type = "info", duration = 5000, onClose }: ToastProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      setTimeout(() => onClose(id), 300) // Allow exit animation to complete
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, id, onClose])

  const icons = {
    success: <CheckCircle className="h-5 w-5 text-green-500" />,
    error: <AlertCircle className="h-5 w-5 text-red-500" />,
    warning: <AlertCircle className="h-5 w-5 text-amber-500" />,
    info: <Info className="h-5 w-5 text-blue-500" />,
  }

  const bgColors = {
    success: "bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-900",
    error: "bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-900",
    warning: "bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-900",
    info: "bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-900",
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className={cn("rounded-xl border p-4 shadow-md flex items-start gap-3 w-full max-w-md", bgColors[type])}
        >
          <div className="flex-shrink-0 pt-0.5">{icons[type]}</div>
          <div className="flex-1 min-w-0">
            <h4 className="font-medium text-sm">{title}</h4>
            {description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
          </div>
          <button
            onClick={() => {
              setIsVisible(false)
              setTimeout(() => onClose(id), 300)
            }}
            className="flex-shrink-0 rounded-full p-1 hover:bg-muted/20 transition-colors"
          >
            <X className="h-4 w-4 text-muted-foreground" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
