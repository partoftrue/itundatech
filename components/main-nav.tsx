"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { MobileMenu } from "@/components/mobile-menu"

const navItems = [
  {
    title: "Home",
    href: "/",
    description: "Return to the homepage",
  },
  {
    title: "About",
    href: "/about",
    description: "Learn more about us",
  },
  {
    title: "Contact",
    href: "/contact",
    description: "Get in touch with our team",
  },
  {
    title: "Developer",
    href: "/developer",
    description: "Resources for developers",
  },
  {
    title: "Designer",
    href: "/designer",
    description: "Resources for designers",
  },
]

export function MainNav() {
  const pathname = usePathname()

  return (
    <div className="flex items-center">
      <MobileMenu items={navItems} />

      <nav className="hidden md:flex items-center gap-6">
        {navItems.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              pathname === item.href ? "text-primary" : "text-muted-foreground",
            )}
          >
            {item.title}
          </Link>
        ))}
      </nav>
    </div>
  )
}
