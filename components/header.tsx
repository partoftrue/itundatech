"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/components/auth/auth-provider"
import { Search, BookOpen, Lightbulb, Users } from "lucide-react"
import { SearchDialog } from "./search-dialog"
import { ModeToggle } from "./mode-toggle"
import { cn } from "@/lib/utils"

export default function Header() {
  const pathname = usePathname()
  const { user, signOut } = useAuth()
  const [isScrolled, setIsScrolled] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-200",
          isScrolled ? "bg-background/95 backdrop-blur-md shadow-sm" : "bg-background",
        )}
      >
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <span className="text-xl font-bold text-itunda-purple">itunda</span>
                <span className="text-xl font-bold text-gray-700">.tech</span>
              </Link>
            </div>

            <div className="hidden md:flex items-center space-x-1">
              <Button variant="ghost" size="sm" className="text-sm font-medium" asChild>
                <Link href="/articles" className={pathname === "/articles" ? "text-itunda-purple" : ""}>
                  <BookOpen className="h-4 w-4 mr-2" />
                  Tutorials
                </Link>
              </Button>
              <Button variant="ghost" size="sm" className="text-sm font-medium" asChild>
                <Link href="/developer" className={pathname === "/developer" ? "text-itunda-purple" : ""}>
                  <Lightbulb className="h-4 w-4 mr-2" />
                  Knowledge Base
                </Link>
              </Button>
              <Button variant="ghost" size="sm" className="text-sm font-medium" asChild>
                <Link href="/designer" className={pathname === "/designer" ? "text-itunda-purple" : ""}>
                  <Users className="h-4 w-4 mr-2" />
                  Affiliates
                </Link>
              </Button>
            </div>

            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full"
                onClick={() => setSearchOpen(true)}
                aria-label="Search"
              >
                <Search className="h-5 w-5" />
              </Button>

              <ModeToggle />

              {user ? (
                <Button variant="default" size="sm" className="bg-itunda-purple hover:bg-itunda-darkPurple">
                  Dashboard
                </Button>
              ) : (
                <Button variant="default" size="sm" className="bg-itunda-purple hover:bg-itunda-darkPurple" asChild>
                  <Link href="/auth">Login</Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  )
}
