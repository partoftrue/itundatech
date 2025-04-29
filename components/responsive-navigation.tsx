"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useResponsive } from "@/hooks/use-responsive"
import { Button } from "@/components/ui/button"
import { Menu, X, ChevronDown } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface NavigationItem {
  label: string
  href: string
  children?: NavigationItem[]
}

interface ResponsiveNavigationProps {
  items: NavigationItem[]
  className?: string
}

export function ResponsiveNavigation({ items, className }: ResponsiveNavigationProps) {
  const pathname = usePathname()
  const { isMobile, isTablet } = useResponsive()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  // Close mobile menu when resizing to desktop
  useEffect(() => {
    if (!isMobile && !isTablet) {
      setMobileMenuOpen(false)
    }
  }, [isMobile, isTablet])

  const toggleDropdown = (label: string) => {
    setActiveDropdown(activeDropdown === label ? null : label)
  }

  return (
    <nav className={cn("relative z-50", className)}>
      {/* Desktop Navigation */}
      <div className="hidden lg:flex items-center space-x-8">
        {items.map((item) => (
          <div key={item.label} className="relative group">
            {item.children ? (
              <>
                <button
                  className={cn(
                    "flex items-center text-base font-medium transition-colors",
                    pathname === item.href ? "text-primary" : "text-foreground hover:text-primary",
                  )}
                  onClick={() => toggleDropdown(item.label)}
                  aria-expanded={activeDropdown === item.label}
                >
                  {item.label}
                  <ChevronDown className="ml-1 h-4 w-4 transition-transform duration-200 group-hover:rotate-180" />
                </button>
                <AnimatePresence>
                  {activeDropdown === item.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute left-0 mt-2 w-48 rounded-md bg-background shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                      onMouseLeave={() => setActiveDropdown(null)}
                    >
                      <div className="py-1">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className={cn(
                              "block px-4 py-2 text-sm transition-colors",
                              pathname === child.href
                                ? "bg-primary/10 text-primary"
                                : "text-foreground hover:bg-muted hover:text-primary",
                            )}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </>
            ) : (
              <Link
                href={item.href}
                className={cn(
                  "text-base font-medium transition-colors",
                  pathname === item.href ? "text-primary" : "text-foreground hover:text-primary",
                )}
              >
                {item.label}
              </Link>
            )}
          </div>
        ))}
      </div>

      {/* Mobile Navigation */}
      <div className="lg:hidden flex items-center">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden absolute top-full left-0 right-0 bg-background border-b shadow-lg"
          >
            <div className="px-4 py-6 space-y-4">
              {items.map((item) => (
                <div key={item.label} className="space-y-2">
                  {item.children ? (
                    <>
                      <button
                        className={cn(
                          "flex items-center justify-between w-full text-left text-base font-medium transition-colors",
                          pathname === item.href ? "text-primary" : "text-foreground",
                        )}
                        onClick={() => toggleDropdown(item.label)}
                        aria-expanded={activeDropdown === item.label}
                      >
                        {item.label}
                        <ChevronDown
                          className={cn(
                            "h-5 w-5 transition-transform duration-200",
                            activeDropdown === item.label && "rotate-180",
                          )}
                        />
                      </button>
                      <AnimatePresence>
                        {activeDropdown === item.label && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="pl-4 space-y-2 border-l-2 border-muted"
                          >
                            {item.children.map((child) => (
                              <Link
                                key={child.href}
                                href={child.href}
                                className={cn(
                                  "block py-2 text-sm transition-colors",
                                  pathname === child.href ? "text-primary" : "text-muted-foreground hover:text-primary",
                                )}
                              >
                                {child.label}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      className={cn(
                        "block py-2 text-base font-medium transition-colors",
                        pathname === item.href ? "text-primary" : "text-foreground hover:text-primary",
                      )}
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
