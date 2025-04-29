"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Search, Menu } from "lucide-react"
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

// Import useAuth with a try/catch to handle cases where AuthProvider isn't available
let useAuth: any = () => ({ user: null, signOut: () => {} })
try {
  useAuth = require("./auth/auth-provider").useAuth
} catch (error) {
  console.warn("Auth provider not available, using fallback")
}

interface HeaderProps {
  categories?: Category[]
}

export default function Header({ categories = [] }: HeaderProps) {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  // Initialize auth state outside the try/catch
  let user = null
  let signOut = () => {}

  // Call useAuth unconditionally
  let auth
  try {
    auth = useAuth()
  } catch (error) {
    console.warn("Error using auth context, falling back to unauthenticated state")
    auth = { user: null, signOut: () => {} } // Provide a default value
  }

  // Destructure auth object to ensure hooks are called unconditionally
  const { user: authUser, signOut: authSignOut } = auth || { user: null, signOut: () => {} }

  user = authUser
  signOut = authSignOut

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
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6">
          <div className="flex h-16 md:h-20 items-center justify-between">
            <div className="flex items-center">
              <Logo linkProps={{ href: "/" }} />

              {/* Desktop Navigation */}
              <div className="hidden md:ml-10 md:flex">
                <MainNav categories={categories} />
              </div>
            </div>

            <div className="flex items-center space-x-2 md:space-x-4">
              {/* Theme Toggle */}
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

              {authUser ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full overflow-hidden hover:bg-muted transition-colors"
                    >
                      <Image
                        src={authUser.avatar_url || "/placeholder.svg?height=40&width=40&query=user avatar"}
                        alt={authUser.name || "User"}
                        width={32}
                        height={32}
                        className="rounded-full"
                      />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 rounded-xl p-2">
                    <div className="flex items-center justify-start p-2">
                      <div className="flex flex-col space-y-1 leading-none">
                        <p className="font-medium">{authUser.name}</p>
                        <p className="w-[200px] truncate text-sm text-muted-foreground">{authUser.email}</p>
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
                    <DropdownMenuItem asChild className="rounded-lg cursor-pointer">
                      <Link href="/settings/theme" className="flex items-center">
                        <span>Theme Settings</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="rounded-lg cursor-pointer text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20"
                      onClick={() => authSignOut()}
                    >
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <>
                  {/* Desktop auth buttons */}
                  <div className="hidden md:flex items-center space-x-2">
                    <Button variant="ghost" size="sm" className="font-medium" asChild>
                      <Link href="/auth">Sign in</Link>
                    </Button>
                    <Button size="sm" className="rounded-full" asChild>
                      <Link href="/auth?register=true">Sign up</Link>
                    </Button>
                  </div>

                  {/* Mobile auth button */}
                  <div className="md:hidden">
                    <Button size="sm" className="rounded-full" asChild>
                      <Link href="/auth">Sign in</Link>
                    </Button>
                  </div>
                </>
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
                <SheetContent side="right" className="w-[85vw] max-w-[300px] p-6">
                  <div className="flex flex-col gap-6 mt-8">
                    <Link href="/" className="text-lg font-medium hover:text-brand transition-colors">
                      Home
                    </Link>

                    <Link href="/about" className="text-lg font-medium hover:text-brand transition-colors">
                      About
                    </Link>
                    <Link href="/contact" className="text-lg font-medium hover:text-brand transition-colors">
                      Contact
                    </Link>
                    <Link href="/settings/theme" className="text-lg font-medium hover:text-brand transition-colors">
                      Theme Settings
                    </Link>

                    {authUser ? (
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
                          onClick={() => authSignOut()}
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
            </div>
          </div>
        </div>
      </header>

      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  )
}
