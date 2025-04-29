"use client"

import { useState, useEffect, useCallback } from "react"

interface HistoryItem {
  id: string
  slug: string
  title: string
  coverImage: string
  category: string
  categorySlug: string
  timestamp: number
}

const MAX_HISTORY_ITEMS = 20
const STORAGE_KEY = "reading-history"

export function useReadingHistory() {
  const [history, setHistory] = useState<HistoryItem[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  // Load history from localStorage on mount
  useEffect(() => {
    const loadHistory = () => {
      try {
        const storedHistory = localStorage.getItem(STORAGE_KEY)
        if (storedHistory) {
          setHistory(JSON.parse(storedHistory))
        }
      } catch (error) {
        console.error("Failed to parse reading history:", error)
      } finally {
        setIsLoaded(true)
      }
    }

    loadHistory()
  }, [])

  // Save history to localStorage whenever it changes
  useEffect(() => {
    if (isLoaded && history.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(history))
    }
  }, [history, isLoaded])

  // Add an article to history
  const addToHistory = useCallback((article: Omit<HistoryItem, "timestamp">) => {
    if (!article || !article.id) return // Guard against invalid articles

    setHistory((prevHistory) => {
      // Check if article already exists with the same ID
      const articleExists = prevHistory.some((item) => item.id === article.id)

      // If article already exists with the same timestamp, don't update
      if (articleExists) {
        // Update the timestamp of the existing article instead of adding a new one
        return prevHistory
          .map((item) => (item.id === article.id ? { ...item, timestamp: Date.now() } : item))
          .sort((a, b) => b.timestamp - a.timestamp)
      }

      // Add the article to the beginning of the array
      const newHistory = [
        {
          ...article,
          timestamp: Date.now(),
        },
        ...prevHistory.filter((item) => item.id !== article.id),
      ].slice(0, MAX_HISTORY_ITEMS)

      return newHistory
    })
  }, [])

  // Clear the entire history
  const clearHistory = useCallback(() => {
    setHistory([])
    localStorage.removeItem(STORAGE_KEY)
  }, [])

  // Remove a specific article from history
  const removeFromHistory = useCallback((id: string) => {
    setHistory((prevHistory) => prevHistory.filter((item) => item.id !== id))
  }, [])

  return {
    history,
    addToHistory,
    clearHistory,
    removeFromHistory,
    isLoaded,
  }
}
