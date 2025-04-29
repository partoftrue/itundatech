"use client"

import { useState } from "react"
import Link from "next/link"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { Logo } from "@/components/logo"
import { cn } from "@/lib/utils"

interface MobileMenuProps {
  items: {
    title: string
    href: string
    description?: string
  }[]
}

export function MobileMenu({ items }: MobileMenuProps) {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[80vw] max-w-sm p-0">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b">
            <Logo />
            <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
              <X className="h-5 w-5" />
              <span className="sr-only">Close menu</span>
            </Button>
          </div>
          <nav className="flex-1 overflow-auto p-4">
            <ul className="flex flex-col gap-1">
              {items.map((item, index) => (
                <li key={index}>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex flex-col gap-1 p-3 rounded-md hover:bg-muted transition-colors",
                      "touch-target", // Ensure touch-friendly size
                    )}
                    onClick={() => setOpen(false)}
                  >
                    <span className="font-medium">{item.title}</span>
                    {item.description && <span className="text-sm text-muted-foreground">{item.description}</span>}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  )
}
