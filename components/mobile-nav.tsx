"use client"

import { useState } from "react"
import Link from "next/link"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { Logo } from "@/components/logo"
import { motion } from "framer-motion"

const navItems = [
  { name: "홈", href: "/" },
  { name: "개발", href: "/category/development" },
  { name: "데이터/ML", href: "/category/data" },
  { name: "디자인", href: "/category/design" },
]

export function MobileNav() {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">메뉴</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[400px]">
        <div className="flex flex-col h-full">
          <div className="py-4">
            <Logo size={40} />
          </div>
          <nav className="flex-1">
            <ul className="space-y-2">
              {navItems.map((item, i) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: i * 0.1 }}
                >
                  <Link
                    href={item.href}
                    className="flex items-center py-3 px-2 rounded-md hover:bg-muted transition-colors"
                    onClick={() => setOpen(false)}
                  >
                    <span className="text-lg">{item.name}</span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </nav>
          <div className="py-4 border-t">
            <div className="flex flex-col space-y-3">
              <Link
                href="/about"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setOpen(false)}
              >
                소개
              </Link>
              <Link
                href="/contact"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setOpen(false)}
              >
                문의하기
              </Link>
              <Link
                href="/privacy"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setOpen(false)}
              >
                개인정보처리방침
              </Link>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
