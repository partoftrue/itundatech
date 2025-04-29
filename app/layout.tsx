import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { AuthProvider } from "@/components/auth/auth-provider"
import { Toaster } from "@/components/ui/toaster"
import { ScrollToTop } from "@/components/scroll-to-top"
import { FloatingThemeToggle } from "@/components/floating-theme-toggle"
import { ThemeTransition } from "@/components/theme-transition"
import { ThemeManifest } from "@/components/theme-manifest"
import { DynamicFavicon } from "@/components/dynamic-favicon"
import { ToastProvider } from "@/components/ui/toast-provider"
import { getAllCategories } from "@/lib/categories"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

export const metadata: Metadata = {
  title: "itunda.tech - Developer & Designer Insights",
  description: "A platform for sharing developer and designer insights",
  // We'll handle the manifest dynamically with ThemeManifest component
  icons: {
    icon: [
      { url: "/icon.png", sizes: "32x32", type: "image/png", media: "(prefers-color-scheme: light)" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png", media: "(prefers-color-scheme: light)" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png", media: "(prefers-color-scheme: light)" },
      { url: "/icon-dark.png", sizes: "32x32", type: "image/png", media: "(prefers-color-scheme: dark)" },
      { url: "/icon-192-dark.png", sizes: "192x192", type: "image/png", media: "(prefers-color-scheme: dark)" },
      { url: "/icon-512-dark.png", sizes: "512x512", type: "image/png", media: "(prefers-color-scheme: dark)" },
    ],
    shortcut: [
      { url: "/favicon.ico", media: "(prefers-color-scheme: light)" },
      { url: "/favicon-dark.ico", media: "(prefers-color-scheme: dark)" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png", media: "(prefers-color-scheme: light)" },
      { url: "/apple-icon-dark.png", sizes: "180x180", type: "image/png", media: "(prefers-color-scheme: dark)" },
    ],
  },
    generator: 'v0.dev'
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#1873ff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const categories = await getAllCategories()

  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <head />
      <body className="font-sans">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <AuthProvider>
            <ToastProvider>
              <ThemeManifest />
              <DynamicFavicon />
              <div className="flex min-h-screen flex-col">
                <Header categories={categories} />
                <main className="flex-1">{children}</main>
                <Footer />
                <ScrollToTop />
                <FloatingThemeToggle />
                <ThemeTransition />
              </div>
              <Toaster />
            </ToastProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
