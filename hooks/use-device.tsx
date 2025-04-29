"use client"

import { useState, useEffect } from "react"
import {
  type DeviceType,
  getDeviceType,
  isTouchDevice,
  isLandscape,
  getViewportDimensions,
} from "@/lib/device-detection"

export function useDevice() {
  const [deviceType, setDeviceType] = useState<DeviceType>("desktop")
  const [isTouch, setIsTouch] = useState(false)
  const [orientation, setOrientation] = useState<"portrait" | "landscape">("landscape")
  const [viewport, setViewport] = useState({ width: 1200, height: 800 })

  useEffect(() => {
    // Set initial values
    setDeviceType(getDeviceType())
    setIsTouch(isTouchDevice())
    setOrientation(isLandscape() ? "landscape" : "portrait")
    setViewport(getViewportDimensions())

    // Update on resize
    const handleResize = () => {
      setDeviceType(getDeviceType())
      setOrientation(isLandscape() ? "landscape" : "portrait")
      setViewport(getViewportDimensions())
    }

    window.addEventListener("resize", handleResize)
    window.addEventListener("orientationchange", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("orientationchange", handleResize)
    }
  }, [])

  return {
    deviceType,
    isTouch,
    orientation,
    viewport,
    isMobile: deviceType === "mobile",
    isTablet: deviceType === "tablet",
    isDesktop: deviceType === "desktop",
  }
}
