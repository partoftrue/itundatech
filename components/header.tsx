"use client"

import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"
import ThemeFavicon from "@/components/theme-favicon"
import PWARegister from "@/components/pwa-register"
import NotificationManager from "@/components/notification-manager"
import NotificationCenter from "@/components/notification-center"
import { SearchDialog } from "@/components/search-dialog"
import { motion } from "framer-motion"
import { Logo, LogoWithText } from "@/components/logo"
import { MobileNav } from "@/components/mobile-nav"

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-background border-b">
      <ThemeFavicon />
      <PWARegister />
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <motion.div
          className="flex items-center gap-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link href="/" className="flex items-center space-x-2">
            <div className="hidden md:block">
              <LogoWithText size={32} />
            </div>
            <div className="md:hidden">
              <Logo size={32} />
            </div>
          </Link>
        </motion.div>

        <motion.div
          className="flex items-center gap-4"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <NotificationCenter />
          <NotificationManager />
          <ThemeToggle />
          <SearchDialog />
          <MobileNav />
        </motion.div>
      </div>
    </header>
  )
}
