"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/components/auth/auth-provider"
import { Search, Menu } from "lucide-react"
import { SearchDialog } from "./search-dialog"
import { cn } from "@/lib/utils"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Logo } from "./logo"
import Link from "next/link"
import { ThemePreferences } from "./theme-preferences"
import { ThemeToggle } from "./theme-toggle"

export default function Header() {
  const pathname = usePathname()
  const { user } = useAuth()
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
          "sticky top-0 z-50 w-full transition-all duration-200 border-b",
          isScrolled ? "bg-background/95 backdrop-blur-md" : "bg-background",
        )}
      >
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <Logo linkProps={{ href: "/" }} />
            </div>

            <div className="flex items-center space-x-2">
              <ThemePreferences />

              <Button
                variant="ghost"
                size="icon"
                className="rounded-full"
                onClick={() => setSearchOpen(true)}
                aria-label="Search"
              >
                <Search className="h-5 w-5" />
              </Button>

              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full" aria-label="Menu">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[250px] sm:w-[300px]">
                  <div className="flex flex-col gap-6 mt-8">
                    <Link href="/articles" className="text-lg font-medium hover:text-brand">
                      Articles
                    </Link>
                    <Link href="/developer" className="text-lg font-medium hover:text-brand">
                      Developer
                    </Link>
                    <Link href="/designer" className="text-lg font-medium hover:text-brand">
                      Designer
                    </Link>
                    <Link href="/case-studies" className="text-lg font-medium hover:text-brand">
                      Case Studies
                    </Link>
                    {user ? (
                      <Link href="/dashboard" className="text-lg font-medium hover:text-brand">
                        Dashboard
                      </Link>
                    ) : (
                      <Link href="/auth" className="text-lg font-medium hover:text-brand">
                        Login
                      </Link>
                    )}

                    <div className="flex items-center gap-2 pt-4 border-t">
                      <ThemeToggle />
                      <span className="text-sm text-muted-foreground">Toggle theme</span>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  )
}
