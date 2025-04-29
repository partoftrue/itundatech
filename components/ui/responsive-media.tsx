"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useDevice } from "@/hooks/use-device"

interface ResponsiveMediaProps {
  mobileSrc: string
  tabletSrc?: string
  desktopSrc: string
  alt: string
  className?: string
  width?: number
  height?: number
  priority?: boolean
}

export function ResponsiveMedia({
  mobileSrc,
  tabletSrc,
  desktopSrc,
  alt,
  className = "",
  width,
  height,
  priority = false,
}: ResponsiveMediaProps) {
  const { deviceType } = useDevice()
  const [src, setSrc] = useState(desktopSrc)

  useEffect(() => {
    if (deviceType === "mobile") {
      setSrc(mobileSrc)
    } else if (deviceType === "tablet" && tabletSrc) {
      setSrc(tabletSrc)
    } else {
      setSrc(desktopSrc)
    }
  }, [deviceType, mobileSrc, tabletSrc, desktopSrc])

  return (
    <div className={`relative ${className}`}>
      <Image
        src={src || "/placeholder.svg"}
        alt={alt}
        width={width}
        height={height}
        className="w-full h-auto object-cover"
        priority={priority}
      />
    </div>
  )
}
