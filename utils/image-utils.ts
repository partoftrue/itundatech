/**
 * Ensures an image URL is absolute, handling both local and remote images
 */
export function getImageUrl(path: string): string {
  if (!path) return ""
  if (path.startsWith("http")) return path
  if (path.startsWith("data:")) return path

  // For local images, ensure they have the correct base URL in production
  return `${process.env.NEXT_PUBLIC_BASE_URL || ""}${path}`
}

/**
 * Gets a placeholder image URL with specified dimensions and query
 */
export function getPlaceholderImage(width: number, height: number, query: string): string {
  return `/placeholder.svg?height=${height}&width=${width}&query=${encodeURIComponent(query)}`
}
