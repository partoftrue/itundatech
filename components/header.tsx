"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/components/auth/auth-provider"
import { Search, Menu, X } from "lucide-react"
import { SearchDialog } from "./search-dialog"
import { cn } from "@/lib/utils"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Logo } from "./logo"
import Link from "next/link"
import { ThemeToggle } from "./theme-toggle"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Image from "next/image"
import { MainNav } from "./main-nav"
import type { Category } from "@/lib/categories"

interface HeaderProps {
  categories: Category[]
}

const navigationItems = [
  { label: "Home", href: "/" },
  { label: "Features", href: "/features" },
  { label: "Pricing", href: "/pricing" },
  { label: "Resources", href: "/resources" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
]

export default function Header({ categories }: HeaderProps) {
  const pathname = usePathname()
  const { user, signOut } = useAuth()
  const [isScrolled, setIsScrolled] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

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
          "sticky top-0 z-50 w-full transition-all duration-300",
          isScrolled ? "bg-background/90 backdrop-blur-md shadow-sm border-b" : "bg-background",
        )}
      >
        <div className="max-w-screen-xl mx-auto px-6">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <Logo linkProps={{ href: "/" }} />

              {/* Desktop Navigation */}
              <div className="hidden md:ml-10 md:flex">
                <MainNav categories={categories} />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <ThemeToggle />

              <Button
                variant="ghost"
                size="icon"
                className="rounded-full hover:bg-muted transition-colors"
                onClick={() => setSearchOpen(true)}
                aria-label="Search"
              >
                <Search className="h-5 w-5" />
              </Button>

              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full overflow-hidden hover:bg-muted transition-colors"
                    >
                      <Image
                        src={user.avatar_url || "/placeholder.svg?height=40&width=40&query=user avatar"}
                        alt={user.name || "User"}
                        width={32}
                        height={32}
                        className="rounded-full"
                      />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 rounded-xl p-2">
                    <div className="flex items-center justify-start p-2">
                      <div className="flex flex-col space-y-1 leading-none">
                        <p className="font-medium">{user.name}</p>
                        <p className="w-[200px] truncate text-sm text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild className="rounded-lg cursor-pointer">
                      <Link href="/dashboard" className="flex items-center">
                        <span>Dashboard</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="rounded-lg cursor-pointer">
                      <Link href="/dashboard/bookmarks" className="flex items-center">
                        <span>Bookmarks</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="rounded-lg cursor-pointer">
                      <Link href="/dashboard/profile" className="flex items-center">
                        <span>Profile</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="rounded-lg cursor-pointer text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20"
                      onClick={() => signOut()}
                    >
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div className="hidden lg:flex items-center gap-4">
                  <Button variant="ghost" className="font-medium hover:text-primary transition-colors" asChild>
                    <Link href="/auth">Sign in</Link>
                  </Button>
                  <Button className="rounded-full font-medium shadow-sm hover:shadow-md transition-all" asChild>
                    <Link href="/auth?register=true">Create account</Link>
                  </Button>
                </div>
              )}

              {/* Mobile Menu */}
              <Sheet>
                <SheetTrigger asChild className="md:hidden">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full hover:bg-muted transition-colors"
                    aria-label="Menu"
                  >
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] p-6">
                  <div className="flex flex-col gap-6 mt-8">
                    <Link href="/" className="text-lg font-medium hover:text-brand transition-colors">
                      Home
                    </Link>

                    <Link href="/authors" className="text-lg font-medium hover:text-brand transition-colors">
                      Authors
                    </Link>
                    <Link href="/about" className="text-lg font-medium hover:text-brand transition-colors">
                      About
                    </Link>
                    <Link href="/contact" className="text-lg font-medium hover:text-brand transition-colors">
                      Contact
                    </Link>

                    {user ? (
                      <>
                        <div className="h-px bg-muted my-2"></div>
                        <Link href="/dashboard" className="text-lg font-medium hover:text-brand transition-colors">
                          Dashboard
                        </Link>
                        <Link
                          href="/dashboard/bookmarks"
                          className="text-lg font-medium hover:text-brand transition-colors"
                        >
                          Bookmarks
                        </Link>
                        <Link
                          href="/dashboard/profile"
                          className="text-lg font-medium hover:text-brand transition-colors"
                        >
                          Profile
                        </Link>
                        <button
                          onClick={() => signOut()}
                          className="text-lg font-medium text-left text-red-500 hover:text-red-600 transition-colors"
                        >
                          Log out
                        </button>
                      </>
                    ) : (
                      <Link href="/auth" className="text-lg font-medium hover:text-brand transition-colors">
                        Login
                      </Link>
                    )}

                    <div className="flex items-center gap-2 pt-4 border-t">
                      <ThemeToggle />
                      <span className="text-sm text-muted-foreground">Theme</span>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>

              {/* Mobile Menu Button */}
              <button
                onClick={toggleMobileMenu}
                className="lg:hidden p-2 rounded-md hover:bg-muted transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-menu"
              >
                <span className="sr-only">{mobileMenuOpen ? "Close menu" : "Open menu"}</span>
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  )
}
