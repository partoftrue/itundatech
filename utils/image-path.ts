/**
 * Ensures image paths are correctly formatted for Vercel deployment
 */
export function getImagePath(path: string): string {
  // If the path is already a URL, return it as is
  if (path.startsWith("http")) {
    return path
  }

  // If it's a data URL, return it as is
  if (path.startsWith("data:")) {
    return path
  }

  // For local images, ensure they start with a slash
  if (!path.startsWith("/")) {
    path = `/${path}`
  }

  return path
}
