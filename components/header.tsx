"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/components/auth/auth-provider"
import { Search, Menu, Bookmark, User, Settings, LogOut } from "lucide-react"
import { SearchDialog } from "./search-dialog"
import { cn } from "@/lib/utils"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Logo } from "./logo"
import Link from "next/link"
import { ThemePreferences } from "./theme-preferences"
import { ThemeToggle } from "./theme-toggle"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Image from "next/image"

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
          "sticky top-0 z-50 w-full transition-all duration-200 border-b",
          isScrolled ? "bg-background/95 backdrop-blur-md" : "bg-background",
        )}
      >
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <Logo linkProps={{ href: "/" }} />

              {/* Desktop Navigation */}
              <nav className="hidden md:flex ml-8 space-x-6">
                <Link
                  href="/articles"
                  className={cn("text-sm font-medium hover:text-brand", pathname === "/articles" && "text-brand")}
                >
                  Articles
                </Link>
                <Link
                  href="/developer"
                  className={cn("text-sm font-medium hover:text-brand", pathname === "/developer" && "text-brand")}
                >
                  Developer
                </Link>
                <Link
                  href="/designer"
                  className={cn("text-sm font-medium hover:text-brand", pathname === "/designer" && "text-brand")}
                >
                  Designer
                </Link>
                <Link
                  href="/case-studies"
                  className={cn("text-sm font-medium hover:text-brand", pathname === "/case-studies" && "text-brand")}
                >
                  Case Studies
                </Link>
                <Link
                  href="/about"
                  className={cn("text-sm font-medium hover:text-brand", pathname === "/about" && "text-brand")}
                >
                  About
                </Link>
                <Link
                  href="/contact"
                  className={cn("text-sm font-medium hover:text-brand", pathname === "/contact" && "text-brand")}
                >
                  Contact
                </Link>
              </nav>
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

              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-full overflow-hidden">
                      <Image
                        src={user.avatar_url || "/placeholder.svg?height=40&width=40&query=user avatar"}
                        alt={user.name || "User"}
                        width={32}
                        height={32}
                        className="rounded-full"
                      />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <div className="flex items-center justify-start p-2">
                      <div className="flex flex-col space-y-1 leading-none">
                        <p className="font-medium">{user.name}</p>
                        <p className="w-[200px] truncate text-sm text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard" className="cursor-pointer">
                        <User className="mr-2 h-4 w-4" />
                        <span>Dashboard</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard/bookmarks" className="cursor-pointer">
                        <Bookmark className="mr-2 h-4 w-4" />
                        <span>Bookmarks</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard/profile" className="cursor-pointer">
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="cursor-pointer" onClick={() => signOut()}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button variant="default" size="sm" asChild>
                  <Link href="/auth">Login</Link>
                </Button>
              )}

              {/* Mobile Menu */}
              <Sheet>
                <SheetTrigger asChild className="md:hidden">
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
                    <Link href="/about" className="text-lg font-medium hover:text-brand">
                      About
                    </Link>
                    <Link href="/contact" className="text-lg font-medium hover:text-brand">
                      Contact
                    </Link>

                    {user ? (
                      <>
                        <Link href="/dashboard" className="text-lg font-medium hover:text-brand">
                          Dashboard
                        </Link>
                        <Link href="/dashboard/bookmarks" className="text-lg font-medium hover:text-brand">
                          Bookmarks
                        </Link>
                        <Link href="/dashboard/profile" className="text-lg font-medium hover:text-brand">
                          Profile
                        </Link>
                        <button onClick={() => signOut()} className="text-lg font-medium text-left hover:text-brand">
                          Log out
                        </button>
                      </>
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
