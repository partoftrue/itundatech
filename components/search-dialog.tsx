"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, X } from "lucide-react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"

// Mock search results
const mockResults = [
  {
    title: "Simplicity 4: 한 번쯤 이상을 꿈꾸본 모두에게",
    slug: "simplicity-4-conference",
    category: "design",
  },
  {
    title: "ItundaTech는 어떻게 광고를 보여줄까?",
    slug: "how-itundatech-shows-ads",
    category: "development",
  },
  {
    title: "AI 개발자를 위한 최신 도구 모음",
    slug: "ai-developer-tools-2025",
    category: "development",
  },
  {
    title: "클라우드 네이티브 애플리케이션 설계 가이드",
    slug: "cloud-native-app-design",
    category: "development",
  },
]

export function SearchDialog() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [results, setResults] = useState<typeof mockResults>([])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return

    setIsSearching(true)

    // Simulate API call
    setTimeout(() => {
      const filteredResults = mockResults.filter((item) => item.title.toLowerCase().includes(query.toLowerCase()))
      setResults(filteredResults)
      setIsSearching(false)
    }, 500)
  }

  const clearSearch = () => {
    setQuery("")
    setResults([])
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Search className="h-5 w-5" />
          <span className="sr-only">Search</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] p-0">
        <DialogHeader className="px-4 pt-4">
          <DialogTitle>검색</DialogTitle>
        </DialogHeader>
        <div className="p-4 space-y-4">
          <form onSubmit={handleSearch} className="flex items-center space-x-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="검색어를 입력하세요..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-10 pr-10"
              />
              {query && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                  <span className="sr-only">Clear search</span>
                </button>
              )}
            </div>
            <Button type="submit">검색</Button>
          </form>

          <div className="min-h-[200px]">
            {isSearching ? (
              <div className="flex items-center justify-center h-[200px]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            ) : results.length > 0 ? (
              <AnimatePresence>
                <div className="space-y-2">
                  {results.map((result, index) => (
                    <motion.div
                      key={result.slug}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2, delay: index * 0.05 }}
                    >
                      <Link
                        href={`/article/${result.slug}`}
                        onClick={() => setOpen(false)}
                        className="block p-3 rounded-md hover:bg-muted transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium">{result.title}</h3>
                          <span className="text-xs text-muted-foreground px-2 py-1 rounded-full bg-muted">
                            {result.category === "development"
                              ? "개발"
                              : result.category === "data"
                                ? "데이터/ML"
                                : "디자인"}
                          </span>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </AnimatePresence>
            ) : query && !isSearching ? (
              <div className="flex flex-col items-center justify-center h-[200px] text-center">
                <p className="text-muted-foreground">검색 결과가 없습니다.</p>
                <p className="text-sm text-muted-foreground">다른 검색어를 시도해보세요.</p>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-[200px] text-center">
                <p className="text-muted-foreground">검색어를 입력하세요.</p>
                <p className="text-sm text-muted-foreground">기사 제목으로 검색할 수 있습니다.</p>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
