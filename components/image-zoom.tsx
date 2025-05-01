"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

interface ImageZoomProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
}

export function ImageZoom({ src, alt, width, height, className, priority = false }: ImageZoomProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Basic image without zoom functionality on server
  if (!isMounted) {
    return (
      <div className={cn("relative overflow-hidden rounded-lg", className)}>
        <Image
          src={src || "/placeholder.svg"}
          alt={alt}
          width={width}
          height={height}
          className="transition-transform duration-300"
          priority={priority}
        />
      </div>
    )
  }

  return (
    <>
      <div
        className={cn("relative overflow-hidden rounded-lg cursor-zoom-in", className)}
        onClick={() => setIsOpen(true)}
      >
        <Image
          src={src || "/placeholder.svg"}
          alt={alt}
          width={width}
          height={height}
          className="transition-transform duration-300 hover:scale-105"
          priority={priority}
        />
        <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors flex items-center justify-center">
          <span className="sr-only">확대하기</span>
        </div>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-screen-lg p-0 bg-transparent border-none">
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ type: "spring", damping: 20 }}
                className="relative w-full h-full flex items-center justify-center"
              >
                <Image
                  src={src || "/placeholder.svg"}
                  alt={alt}
                  width={1200}
                  height={800}
                  className="object-contain max-h-[80vh]"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </DialogContent>
      </Dialog>
    </>
  )
}
