import type { Resource, ResourceType } from "@/hooks/use-loading-progress"

// Helper to create resource objects
export function createResource(id: string, url: string, type: ResourceType, weight = 1): Resource {
  return {
    id,
    url,
    type,
    weight,
  }
}

// Preload common app resources
export function getAppResources(): Resource[] {
  return [
    // Images
    createResource("logo", "/logo.png", "image", 2),
    createResource("banner", "/banner.jpg", "image", 5),
    createResource("tech-conference", "/tech-conference.png", "image", 3),
    createResource("tech-advertising", "/tech-advertising.png", "image", 3),
    createResource("ai-development", "/ai-development-tools.png", "image", 3),
    createResource("cloud-native", "/cloud-native-architecture.png", "image", 3),

    // Fonts (using Google Fonts as an example)
    createResource("inter-font", "Inter", "font", 4),

    // API data
    createResource("articles-data", "/api/articles", "data", 4),

    // Other resources (simulated)
    createResource("config", "app-config", "other", 1),
    createResource("translations", "translations", "other", 2),
  ]
}

// Create a subset of resources for faster loading in development
export function getEssentialResources(): Resource[] {
  return [
    createResource("logo", "/logo.png", "image", 2),
    createResource("banner", "/banner.jpg", "image", 5),
    createResource("inter-font", "Inter", "font", 4),
  ]
}
