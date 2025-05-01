"use client"

import { useState, useEffect, useCallback } from "react"

export type ResourceType = "image" | "font" | "data" | "script" | "other"

export interface Resource {
  id: string
  url: string
  type: ResourceType
  weight: number // Relative importance/size of the resource (1-10)
}

interface UseLoadingProgressOptions {
  resources: Resource[]
  initialProgress?: number
  simulateMinimumTime?: number // Minimum loading time in ms (for UX purposes)
}

export function useLoadingProgress({
  resources,
  initialProgress = 0,
  simulateMinimumTime = 1000,
}: UseLoadingProgressOptions) {
  const [progress, setProgress] = useState(initialProgress)
  const [loaded, setLoaded] = useState<Record<string, boolean>>({})
  const [isComplete, setIsComplete] = useState(false)
  const [startTime] = useState(Date.now())

  // Calculate total weight of all resources
  const totalWeight = resources.reduce((sum, resource) => sum + resource.weight, 0)

  // Update progress when a resource is loaded
  const updateProgress = useCallback(
    (resourceId: string, isLoaded: boolean) => {
      setLoaded((prev) => ({ ...prev, [resourceId]: isLoaded }))

      // Calculate new progress based on loaded resources and their weights
      const loadedResources = resources.filter((r) => loaded[r.id] || r.id === resourceId)
      const loadedWeight = loadedResources.reduce((sum, r) => sum + r.weight, 0)
      const newProgress = Math.min(Math.round((loadedWeight / totalWeight) * 100), 100)

      setProgress(newProgress)
    },
    [resources, loaded, totalWeight],
  )

  // Load a single resource
  const loadResource = useCallback(
    async (resource: Resource) => {
      try {
        switch (resource.type) {
          case "image":
            await new Promise<void>((resolve, reject) => {
              const img = new Image()
              img.onload = () => {
                updateProgress(resource.id, true)
                resolve()
              }
              img.onerror = () => {
                console.error(`Failed to load image: ${resource.url}`)
                updateProgress(resource.id, false)
                // Still resolve to continue loading other resources
                resolve()
              }
              img.src = resource.url
            })
            break

          case "font":
            try {
              await document.fonts.load(`1em ${resource.url}`)
              updateProgress(resource.id, true)
            } catch (err) {
              console.error(`Failed to load font: ${resource.url}`, err)
              updateProgress(resource.id, false)
            }
            break

          case "data":
            try {
              await fetch(resource.url)
              updateProgress(resource.id, true)
            } catch (err) {
              console.error(`Failed to load data: ${resource.url}`, err)
              updateProgress(resource.id, false)
            }
            break

          case "script":
            await new Promise<void>((resolve) => {
              const script = document.createElement("script")
              script.src = resource.url
              script.onload = () => {
                updateProgress(resource.id, true)
                resolve()
              }
              script.onerror = () => {
                console.error(`Failed to load script: ${resource.url}`)
                updateProgress(resource.id, false)
                resolve()
              }
              document.head.appendChild(script)
            })
            break

          default:
            // For other types, simulate loading with a small delay
            await new Promise((resolve) => setTimeout(resolve, 300))
            updateProgress(resource.id, true)
        }
      } catch (error) {
        console.error(`Error loading resource ${resource.id}:`, error)
        updateProgress(resource.id, false)
      }
    },
    [updateProgress],
  )

  // Start loading all resources
  useEffect(() => {
    const loadAllResources = async () => {
      // Load all resources in parallel
      await Promise.all(resources.map((resource) => loadResource(resource)))

      // Ensure minimum loading time for better UX
      const elapsedTime = Date.now() - startTime
      if (elapsedTime < simulateMinimumTime) {
        await new Promise((resolve) => setTimeout(resolve, simulateMinimumTime - elapsedTime))
      }

      setIsComplete(true)
    }

    loadAllResources()
  }, [resources, loadResource, simulateMinimumTime, startTime])

  return { progress, isComplete }
}
