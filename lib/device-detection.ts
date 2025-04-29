export type DeviceType = "mobile" | "tablet" | "desktop"

export function getDeviceType(): DeviceType {
  // Only run on client
  if (typeof window === "undefined") return "desktop"

  const width = window.innerWidth

  if (width < 640) return "mobile"
  if (width < 1024) return "tablet"
  return "desktop"
}

export function isTouchDevice(): boolean {
  // Only run on client
  if (typeof window === "undefined") return false

  return "ontouchstart" in window || navigator.maxTouchPoints > 0 || (navigator as any).msMaxTouchPoints > 0
}

export function isLandscape(): boolean {
  // Only run on client
  if (typeof window === "undefined") return true

  return window.innerWidth > window.innerHeight
}

export function getViewportDimensions() {
  // Only run on client
  if (typeof window === "undefined") return { width: 1200, height: 800 }

  return {
    width: window.innerWidth,
    height: window.innerHeight,
  }
}
