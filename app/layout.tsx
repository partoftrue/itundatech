import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider as NextThemesProvider } from "@/components/theme-provider"
import { ThemeProvider } from "@/contexts/theme-context"
import { ThemeTransition } from "@/components/theme-transition"
import { FloatingThemeToggle } from "@/components/floating-theme-toggle"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { getAllCategories } from "@/lib/categories"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Itunda Tech",
  description: "A community-driven platform for developers, designers, and tech enthusiasts",
    generator: 'v0.dev'
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const categories = await getAllCategories()

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <NextThemesProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <ThemeProvider>
            {/* Theme transition for smooth theme changes */}
            <ThemeTransition />

            <Header categories={categories} />
            <main>{children}</main>
            <Footer />
            <FloatingThemeToggle />
          </ThemeProvider>
        </NextThemesProvider>
      </body>
    </html>
  )
}
