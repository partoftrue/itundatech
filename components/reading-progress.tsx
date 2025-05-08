"use client"

import { useEffect, useState } from "react"

export function ReadingProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const updateProgress = () => {
      // Calculate how far the user has scrolled
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollPercent = scrollTop / docHeight
      setProgress(scrollPercent * 100)
    }

    window.addEventListener("scroll", updateProgress)
    return () => window.removeEventListener("scroll", updateProgress)
  }, [])

  return (
    <div className="fixed top-0 left-0 right-0 h-1 z-50">
      <div className="h-full bg-brand transition-all duration-100 ease-out" style={{ width: `${progress}%` }} />
    </div>
  )
}
