"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Loader2, ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"
import { createClientSupabaseClient } from "@/lib/supabase"
import Link from "next/link"

interface SearchResult {
  id: string
  title: string
  slug: string
  excerpt: string
  category: string
}

export function SearchDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const supabase = createClientSupabaseClient()

  useEffect(() => {
    const searchArticles = async () => {
      if (!query.trim() || query.length < 2) {
        setResults([])
        return
      }

      setIsLoading(true)

      try {
        const { data, error } = await supabase
          .from("articles")
          .select(`
            id,
            title,
            slug,
            excerpt,
            categories (
              name
            )
          `)
          .or(`title.ilike.%${query}%, excerpt.ilike.%${query}%`)
          .eq("published", true)
          .order("created_at", { ascending: false })
          .limit(5)

        if (error) throw error

        const formattedResults = data.map((item) => ({
          id: item.id,
          title: item.title,
          slug: item.slug,
          excerpt: item.excerpt,
          category: item.categories?.name || "Uncategorized",
        }))

        setResults(formattedResults)
      } catch (error) {
        console.error("Error searching:", error)
        setResults([])
      } finally {
        setIsLoading(false)
      }
    }

    const debounce = setTimeout(() => {
      searchArticles()
    }, 300)

    return () => clearTimeout(debounce)
  }, [query, supabase])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      onOpenChange(false)
      router.push(`/search?q=${encodeURIComponent(query.trim())}`)
    }
  }

  const handleResultClick = () => {
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>Search Articles</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="relative">
          <Input
            placeholder="Search for articles..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pr-10 rounded-lg"
            autoFocus
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
            ) : (
              <Search className="h-4 w-4 text-muted-foreground" />
            )}
          </div>
        </form>

        <div className="mt-4 max-h-[300px] overflow-auto">
          {results.length > 0 ? (
            <div className="space-y-4">
              {results.map((result) => (
                <div key={result.id} className="p-3 hover:bg-muted rounded-lg transition-colors">
                  <Link href={`/articles/${result.slug}`} className="block" onClick={handleResultClick}>
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">{result.category}</div>
                        <h3 className="font-medium mb-1">{result.title}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">{result.excerpt}</p>
                      </div>
                      <ArrowRight className="h-4 w-4 mt-1 text-muted-foreground" />
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          ) : query.length > 0 && !isLoading ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No results found for "{query}"</p>
              <Button
                variant="link"
                className="mt-2"
                onClick={() => {
                  onOpenChange(false)
                  router.push(`/search?q=${encodeURIComponent(query.trim())}`)
                }}
              >
                View all search results
              </Button>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">Start typing to search articles</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
