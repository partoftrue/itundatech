/**
 * Theme color utility functions for color manipulation
 */

// Convert hex to RGB
export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? {
        r: Number.parseInt(result[1], 16),
        g: Number.parseInt(result[2], 16),
        b: Number.parseInt(result[3], 16),
      }
    : null
}

// Convert RGB to hex
export function rgbToHex(r: number, g: number, b: number): string {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
}

// Convert RGB to HSL
export function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
  r /= 255
  g /= 255
  b /= 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h = 0
  let s = 0
  const l = (max + min) / 2

  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0)
        break
      case g:
        h = (b - r) / d + 2
        break
      case b:
        h = (r - g) / d + 4
        break
    }

    h /= 6
  }

  return { h: h * 360, s: s * 100, l: l * 100 }
}

// Convert HSL to RGB
export function hslToRgb(h: number, s: number, l: number): { r: number; g: number; b: number } {
  h /= 360
  s /= 100
  l /= 100

  let r, g, b

  if (s === 0) {
    r = g = b = l
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1
      if (t > 1) t -= 1
      if (t < 1 / 6) return p + (q - p) * 6 * t
      if (t < 1 / 2) return q
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
      return p
    }

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s
    const p = 2 * l - q

    r = hue2rgb(p, q, h + 1 / 3)
    g = hue2rgb(p, q, h)
    b = hue2rgb(p, q, h - 1 / 3)
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  }
}

// Lighten a color by a percentage
export function lighten(hex: string, amount: number): string {
  const rgb = hexToRgb(hex)
  if (!rgb) return hex

  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b)
  hsl.l += amount
  hsl.l = Math.min(100, Math.max(0, hsl.l))

  const newRgb = hslToRgb(hsl.h, hsl.s, hsl.l)
  return rgbToHex(newRgb.r, newRgb.g, newRgb.b)
}

// Darken a color by a percentage
export function darken(hex: string, amount: number): string {
  return lighten(hex, -amount)
}

// Generate a color palette from a base color
export function generateColorPalette(baseColor: string): Record<number, string> {
  const rgb = hexToRgb(baseColor)
  if (!rgb) return {}

  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b)
  const palette: Record<number, string> = {}

  // Generate lighter shades
  for (let i = 1; i <= 5; i++) {
    const lightness = hsl.l + (100 - hsl.l) * (i / 5) * 0.7
    const rgb = hslToRgb(hsl.h, hsl.s, lightness)
    palette[i * 100] = rgbToHex(rgb.r, rgb.g, rgb.b)
  }

  // Base color
  palette[500] = baseColor

  // Generate darker shades
  for (let i = 1; i <= 5; i++) {
    const lightness = hsl.l * (1 - (i / 5) * 0.7)
    const rgb = hslToRgb(hsl.h, hsl.s, lightness)
    palette[500 + i * 100] = rgbToHex(rgb.r, rgb.g, rgb.b)
  }

  return palette
}

// Check if a color is light or dark
export function isLightColor(hex: string): boolean {
  const rgb = hexToRgb(hex)
  if (!rgb) return true

  // Calculate the perceived brightness using the formula:
  // (0.299*R + 0.587*G + 0.114*B)
  const brightness = (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255
  return brightness > 0.5
}

// Get appropriate text color (black or white) based on background color
export function getContrastTextColor(bgColor: string): string {
  return isLightColor(bgColor) ? "#000000" : "#ffffff"
}
