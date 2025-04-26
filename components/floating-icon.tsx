"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

interface FloatingIconProps {
  src: string
  alt: string
  size: number
  position: {
    top?: string
    bottom?: string
    left?: string
    right?: string
  }
  delay?: number
}

export function FloatingIcon({ src, alt, size, position, delay = 0 }: FloatingIconProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div
      className="absolute"
      style={{
        top: position.top,
        bottom: position.bottom,
        left: position.left,
        right: position.right,
      }}
    >
      <div
        className={`w-${size} h-${size} opacity-70`}
        style={{
          animation: `float 6s ease-in-out infinite ${delay}s`,
        }}
      >
        <Image
          src={src || "/placeholder.svg"}
          alt={alt}
          width={size * 4}
          height={size * 4}
          className="object-contain"
        />
      </div>
    </div>
  )
}
