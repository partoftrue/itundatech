"use client"

import NextImage, { type ImageProps as NextImageProps } from "next/image"
import { getImageUrl } from "@/utils/image-utils"
import { useState } from "react"

interface ImageProps extends Omit<NextImageProps, "onError"> {
  fallback?: string
}

export function Image({ src, fallback = "/placeholder.svg", alt, ...props }: ImageProps) {
  const [error, setError] = useState(false)

  const imageSrc = error ? fallback : src ? getImageUrl(src.toString()) : fallback

  return <NextImage src={imageSrc} alt={alt || ""} onError={() => setError(true)} {...props} />
}
