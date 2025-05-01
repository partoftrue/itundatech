/**
 * Utility functions for favicon generation and management
 */

/**
 * Ensures favicon paths are correctly formatted for Vercel deployment
 */
export function getFaviconPath(path: string): string {
  // If the path is already a URL, return it as is
  if (path.startsWith("http")) {
    return path
  }

  // For local images, ensure they start with a slash
  if (!path.startsWith("/")) {
    path = `/${path}`
  }

  return path
}

/**
 * Checks if the favicon is properly loaded
 */
export function checkFaviconLoaded(): boolean {
  if (typeof document === "undefined") return false

  const link = document.querySelector('link[rel="icon"]') as HTMLLinkElement
  return link !== null && link.href !== ""
}
