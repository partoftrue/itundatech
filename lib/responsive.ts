// Breakpoint values that match Tailwind's default breakpoints
export const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
}

// Media query strings for use with CSS-in-JS libraries
export const mediaQueries = {
  sm: `(min-width: ${breakpoints.sm}px)`,
  md: `(min-width: ${breakpoints.md}px)`,
  lg: `(min-width: ${breakpoints.lg}px)`,
  xl: `(min-width: ${breakpoints.xl}px)`,
  "2xl": `(min-width: ${breakpoints["2xl"]}px)`,
  // Max-width queries
  maxSm: `(max-width: ${breakpoints.sm - 1}px)`,
  maxMd: `(max-width: ${breakpoints.md - 1}px)`,
  maxLg: `(max-width: ${breakpoints.lg - 1}px)`,
  maxXl: `(max-width: ${breakpoints.xl - 1}px)`,
  max2xl: `(max-width: ${breakpoints["2xl"] - 1}px)`,
  // Device-specific queries
  mobile: `(max-width: ${breakpoints.md - 1}px)`,
  tablet: `(min-width: ${breakpoints.md}px) and (max-width: ${breakpoints.lg - 1}px)`,
  desktop: `(min-width: ${breakpoints.lg}px)`,
  // Orientation
  portrait: "(orientation: portrait)",
  landscape: "(orientation: landscape)",
  // Display features
  retina: "(-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi)",
  touch: "(hover: none) and (pointer: coarse)",
  mouse: "(hover: hover) and (pointer: fine)",
}

// Helper function to get a CSS value that scales between min and max based on viewport width
export function fluidValue(
  minSize: number,
  maxSize: number,
  minScreenWidth: number = breakpoints.sm,
  maxScreenWidth: number = breakpoints.xl,
  unit = "rem",
): string {
  // Calculate the slope
  const slope = (maxSize - minSize) / (maxScreenWidth - minScreenWidth)
  // Calculate the y-intercept
  const yIntercept = -minScreenWidth * slope + minSize

  // Return the CSS clamp function
  return `clamp(${minSize}${unit}, ${yIntercept}${unit} + ${slope * 100}vw, ${maxSize}${unit})`
}

// Responsive spacing values that scale with viewport
export const responsiveSpacing = {
  xs: fluidValue(0.25, 0.5),
  sm: fluidValue(0.5, 0.75),
  md: fluidValue(1, 1.5),
  lg: fluidValue(1.5, 2.5),
  xl: fluidValue(2, 4),
  "2xl": fluidValue(3, 6),
}

// Responsive font sizes that scale with viewport
export const responsiveFontSizes = {
  xs: fluidValue(0.75, 0.875),
  sm: fluidValue(0.875, 1),
  base: fluidValue(1, 1.125),
  lg: fluidValue(1.125, 1.25),
  xl: fluidValue(1.25, 1.5),
  "2xl": fluidValue(1.5, 1.875),
  "3xl": fluidValue(1.875, 2.25),
  "4xl": fluidValue(2.25, 3),
  "5xl": fluidValue(3, 4),
}
