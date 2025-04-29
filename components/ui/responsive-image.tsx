"use client"

import { useState, useEffect } from "react"
import Image, { type ImageProps } from "next/image"
import { cn } from "@/lib/utils"

interface ResponsiveImageProps extends Omit<ImageProps, "src"> {
  src: {
    mobile?: string
    tablet?: string
    desktop: string
  }
  aspectRatio?: {
    mobile?: string
    tablet?: string
    desktop?: string
  }
  className?: string
  containerClassName?: string
}

export function ResponsiveImage({
  src,
  aspectRatio = {
    mobile: "4/3",
    tablet: "16/9",
    desktop: "16/9",
  },
  alt,
  className,
  containerClassName,
  fill = false,
  ...props
}: ResponsiveImageProps) {
  const [currentSrc, setCurrentSrc] = useState<string>(src.desktop)
  const [currentAspectRatio, setCurrentAspectRatio] = useState<string>(aspectRatio.desktop || "16/9")

  useEffect(() => {
    const updateImageSource = () => {
      const width = window.innerWidth

      if (width < 768 && src.mobile) {
        setCurrentSrc(src.mobile)
        setCurrentAspectRatio(aspectRatio.mobile || aspectRatio.desktop || "16/9")
      } else if (width < 1024 && src.tablet) {
        setCurrentSrc(src.tablet)
        setCurrentAspectRatio(aspectRatio.tablet || aspectRatio.desktop || "16/9")
      } else {
        setCurrentSrc(src.desktop)
        setCurrentAspectRatio(aspectRatio.desktop || "16/9")
      }
    }

    // Initial update
    updateImageSource()

    // Add event listener for resize
    window.addEventListener("resize", updateImageSource)

    // Cleanup
    return () => {
      window.removeEventListener("resize", updateImageSource)
    }
  }, [src, aspectRatio])

  // Calculate aspect ratio style
  const aspectRatioStyle = !fill
    ? {
        aspectRatio: currentAspectRatio,
      }
    : {}

  return (
    <div className={cn("relative overflow-hidden", containerClassName)} style={aspectRatioStyle}>
      <Image
        src={currentSrc || "/placeholder.svg"}
        alt={alt}
        className={cn("object-cover", fill ? "absolute inset-0" : "w-full h-full", className)}
        fill={fill}
        {...props}
      />
    </div>
  )
}
