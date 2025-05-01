import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"
import { Footer } from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { ClientOnly } from "@/components/client-only"
import { ToastInitializer } from "@/components/toast-initializer"
import { FloatingActionButton } from "@/components/floating-action-button"
import { ScrollToTop } from "@/components/scroll-to-top"
import { ImageDebug } from "@/components/image-debug"
import { FaviconDebug } from "@/components/favicon-debug"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "ItundaTech - Technology News and Insights",
  description: "Latest news, articles and resources on technology, development, data science and design",
  applicationName: "ItundaTech",
  appleWebApp: {
    capable: true,
    title: "ItundaTech",
    statusBarStyle: "default",
  },
  formatDetection: {
    telephone: false,
  },
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#1f78ff" },
    { media: "(prefers-color-scheme: dark)", color: "#1b1e3d" },
  ],
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    other: [
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.png",
        color: "#1f78ff",
      },
    ],
  },
  manifest: "/manifest.json",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <ClientOnly>
            <PWAAndNetworkComponents />
            <ImageDebug />
          </ClientOnly>
          <Toaster />
          <ToastInitializer />
        </ThemeProvider>
      </body>
    </html>
  )
}

// Separate component for browser-only features
function PWAAndNetworkComponents() {
  return (
    <>
      <FloatingActionButton />
      <ScrollToTop />
      <FaviconDebug />
    </>
  )
}
