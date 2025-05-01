"use client"

import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"
import { SearchDialog } from "@/components/search-dialog"
import { Logo } from "@/components/logo"
import { ClientOnly } from "@/components/client-only"
import { ExternalLink } from "lucide-react"

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur-sm border-b">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center space-x-2">
          <Logo size={28} />
          <span className="font-semibold text-xl">itundatech</span>
        </Link>

        <div className="hidden md:flex items-center space-x-1">
          <Link
            href="/category/development"
            className="px-4 py-2 text-sm font-medium hover:text-primary transition-colors"
          >
            개발
          </Link>
          <Link href="/category/data" className="px-4 py-2 text-sm font-medium hover:text-primary transition-colors">
            데이터/ML
          </Link>
          <Link href="/category/design" className="px-4 py-2 text-sm font-medium hover:text-primary transition-colors">
            디자인
          </Link>
          <div className="mx-2 h-4 border-r border-gray-200 dark:border-gray-700" />
          <Link
            href="/simplicity"
            className="px-4 py-2 text-sm font-medium hover:text-primary transition-colors flex items-center"
          >
            SIMPLICITY <ExternalLink className="ml-1 h-3 w-3" />
          </Link>
          <Link
            href="/slash"
            className="px-4 py-2 text-sm font-medium hover:text-primary transition-colors flex items-center"
          >
            SLASH <ExternalLink className="ml-1 h-3 w-3" />
          </Link>
        </div>

        <div className="flex items-center">
          <ClientOnly>
            <div className="flex items-center">
              <SearchDialog />
              <ThemeToggle />
            </div>
          </ClientOnly>
        </div>
      </div>
    </header>
  )
}
