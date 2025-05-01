"use client"

import { useEffect } from "react"

export function ImageDebug() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return

    // Check all images on the page
    const images = document.querySelectorAll("img")
    let brokenCount = 0

    images.forEach((img) => {
      if (!img.complete || img.naturalHeight === 0) {
        console.error(`Broken image: ${img.src}`)
        brokenCount++

        // Add a red border to broken images
        img.style.border = "2px solid red"

        // Add an error message
        const errorMsg = document.createElement("div")
        errorMsg.textContent = "Image failed to load"
        errorMsg.style.color = "red"
        errorMsg.style.fontSize = "10px"
        img.parentNode?.appendChild(errorMsg)
      }
    })

    if (brokenCount > 0) {
      console.error(`Found ${brokenCount} broken images on the page`)
    } else {
      console.log("All images loaded successfully")
    }
  }, [])

  return null
}
