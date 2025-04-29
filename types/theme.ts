export type ThemeMode = "light" | "dark" | "system"
export type ThemeAccent = "blue" | "purple" | "green" | "orange" | "pink" | "red"
export type ThemeRadius = "none" | "sm" | "md" | "lg" | "full"
export type ThemeFont = "system" | "sans" | "serif" | "mono"

export interface ThemeSettings {
  mode: ThemeMode
  accent: ThemeAccent
  radius: ThemeRadius
  font: ThemeFont
  preset: string
  isCustom: boolean
}

export interface ThemeColor {
  [key: number]: string
}

export interface ThemePreset {
  id: string
  name: string
  description?: string
  isDark: boolean
  primary: ThemeColor
  secondary?: ThemeColor
  background: string
  foreground: string
  muted: string
  mutedForeground: string
  accent: string
  accentForeground: string
}
