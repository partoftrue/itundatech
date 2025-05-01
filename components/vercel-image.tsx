"use client"

import Image, { type ImageProps } from "next/image"
import { useState } from "react"

interface VercelImageProps extends Omit<ImageProps, "src"> {
  src: string
  fallbackSrc?: string
}

export function VercelImage({ src, fallbackSrc = "/abstract-colorful-swirls.png", alt = "", ...props }: VercelImageProps) {
  const [imgSrc, setImgSrc] = useState(src)
  const [hasError, setHasError] = useState(false)

  // Handle image load error
  const handleError = () => {
    if (!hasError) {
      setImgSrc(fallbackSrc)
      setHasError(true)
    }
  }

  return <Image {...props} src={imgSrc || "/placeholder.svg"} alt={alt} onError={handleError} />
}
