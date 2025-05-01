"use client"

import { useState } from "react"
import { VercelImage } from "@/components/vercel-image"

// List of all images used in the app
const images = [
  { path: "/logo-white.png", alt: "Logo White" },
  { path: "/tech-conference.png", alt: "Tech Conference" },
  { path: "/tech-advertising.png", alt: "Tech Advertising" },
  { path: "/ai-development-tools.png", alt: "AI Development Tools" },
  { path: "/cloud-native-architecture.png", alt: "Cloud Native Architecture" },
  { path: "/design-system-abstract.png", alt: "Design System" },
  { path: "/ux-research-concept.png", alt: "UX Research" },
  { path: "/accessible-web-design.png", alt: "Accessible Web Design" },
  { path: "/author-avatar.png", alt: "Author Avatar" },
  { path: "/diverse-group-avatars.png", alt: "Diverse Group Avatars" },
  { path: "/abstract-geometric-shapes.png", alt: "Abstract Geometric Shapes" },
]

export default function ImageDebugPage() {
  const [loadStatus, setLoadStatus] = useState<Record<string, boolean>>({})

  const handleImageLoad = (path: string) => {
    setLoadStatus((prev) => ({ ...prev, [path]: true }))
  }

  const handleImageError = (path: string) => {
    setLoadStatus((prev) => ({ ...prev, [path]: false }))
    console.error(`Failed to load image: ${path}`)
  }

  return (
    <div className="container py-8">
      <h1 className="text-2xl font-bold mb-6">Image Debug Page</h1>
      <p className="mb-4">This page shows all images used in the app to help debug loading issues.</p>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image) => (
          <div key={image.path} className="border rounded-lg p-4 flex flex-col items-center">
            <div className="relative w-full aspect-square mb-2">
              <VercelImage
                src={image.path}
                alt={image.alt}
                fill
                className="object-contain"
                onLoadingComplete={() => handleImageLoad(image.path)}
                onError={() => handleImageError(image.path)}
              />
            </div>
            <p className="text-sm font-medium">{image.path}</p>
            <p className="text-xs text-gray-500">{image.alt}</p>
            {loadStatus[image.path] !== undefined && (
              <div className={`mt-2 text-xs ${loadStatus[image.path] ? "text-green-500" : "text-red-500"}`}>
                {loadStatus[image.path] ? "Loaded successfully" : "Failed to load"}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
