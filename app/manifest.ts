import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "ItundaTech",
    short_name: "ItundaTech",
    description: "Technology News and Insights",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#1f78ff",
    orientation: "portrait",
    scope: "/",
    id: "/",
    categories: ["news", "technology", "education"],
    lang: "en",
    dir: "ltr",
    prefer_related_applications: false,
    icons: [
      {
        src: "/app-icon-light-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/app-icon-light-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/app-icon-light-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/app-icon-light-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    screenshots: [
      {
        src: "/screenshot-1.png",
        sizes: "1280x720",
        type: "image/png",
        label: "ItundaTech Home Screen",
      },
      {
        src: "/screenshot-2.png",
        sizes: "1280x720",
        type: "image/png",
        label: "ItundaTech Article View",
      },
    ],
    shortcuts: [
      {
        name: "Latest Articles",
        url: "/",
        description: "View the latest technology articles",
      },
      {
        name: "Development",
        url: "/category/development",
        description: "View development articles",
      },
      {
        name: "Design",
        url: "/category/design",
        description: "View design articles",
      },
    ],
  }
}
