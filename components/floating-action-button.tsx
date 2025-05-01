"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Plus, X, Share2, Search, Bell } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { toast } from "@/components/ui/use-toast"

export function FloatingActionButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      // Hide when scrolling down, show when scrolling up
      if (window.scrollY > lastScrollY + 10) {
        setIsVisible(false)
        setIsOpen(false)
      } else if (window.scrollY < lastScrollY - 10) {
        setIsVisible(true)
      }
      setLastScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  const handleShare = async () => {
    try {
      if (navigator && typeof navigator.share === "function") {
        try {
          await navigator.share({
            title: document.title,
            url: window.location.href,
          })
          toast({
            title: "공유 성공",
            description: "콘텐츠가 성공적으로 공유되었습니다.",
          })
        } catch (error: any) {
          console.error("Error sharing:", error)

          // If permission denied or other sharing error, fall back to clipboard
          if (error.name === "NotAllowedError" || error.message.includes("Permission")) {
            await copyToClipboard()
          } else {
            toast({
              title: "공유하기 실패",
              description: "공유 중 오류가 발생했습니다. 링크를 복사합니다.",
            })
            await copyToClipboard()
          }
        }
      } else {
        // Fallback for browsers that don't support the Web Share API
        await copyToClipboard()
      }
    } catch (error) {
      console.error("Share error:", error)
      toast({
        title: "공유하기 실패",
        description: "공유 기능을 사용할 수 없습니다.",
      })
    } finally {
      setIsOpen(false)
    }
  }

  // Add this new copyToClipboard function after the handleShare function
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      toast({
        title: "링크 복사됨",
        description: "현재 페이지 링크가 클립보드에 복사되었습니다.",
      })
    } catch (error) {
      console.error("Clipboard error:", error)
      toast({
        title: "복사 실패",
        description: "클립보드에 복사할 수 없습니다.",
      })
    }
  }

  const handleSearch = () => {
    // This would typically open the search dialog
    // For now, we'll just show a toast
    toast({
      title: "검색",
      description: "검색 기능이 열렸습니다.",
    })
    setIsOpen(false)
  }

  const handleNotifications = () => {
    // This would typically open the notifications panel
    // For now, we'll just show a toast
    toast({
      title: "알림",
      description: "알림 센터가 열렸습니다.",
    })
    setIsOpen(false)
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed bottom-6 right-6 z-50 md:hidden"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
        >
          <div className="relative">
            <AnimatePresence>
              {isOpen && (
                <>
                  <motion.div
                    className="absolute bottom-16 right-0 space-y-3"
                    initial={{ opacity: 0, scale: 0.8, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: 10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Button
                      size="icon"
                      className="rounded-full shadow-lg h-12 w-12 bg-primary hover:bg-primary/90"
                      onClick={handleShare}
                    >
                      <Share2 className="h-5 w-5 text-white" />
                      <span className="sr-only">공유하기</span>
                    </Button>
                  </motion.div>
                  <motion.div
                    className="absolute bottom-32 right-0 space-y-3"
                    initial={{ opacity: 0, scale: 0.8, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: 10 }}
                    transition={{ duration: 0.2, delay: 0.05 }}
                  >
                    <Button
                      size="icon"
                      className="rounded-full shadow-lg h-12 w-12 bg-primary hover:bg-primary/90"
                      onClick={handleSearch}
                    >
                      <Search className="h-5 w-5 text-white" />
                      <span className="sr-only">검색</span>
                    </Button>
                  </motion.div>
                  <motion.div
                    className="absolute bottom-48 right-0 space-y-3"
                    initial={{ opacity: 0, scale: 0.8, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: 10 }}
                    transition={{ duration: 0.2, delay: 0.1 }}
                  >
                    <Button
                      size="icon"
                      className="rounded-full shadow-lg h-12 w-12 bg-primary hover:bg-primary/90"
                      onClick={handleNotifications}
                    >
                      <Bell className="h-5 w-5 text-white" />
                      <span className="sr-only">알림</span>
                    </Button>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
            <Button
              size="icon"
              className="rounded-full shadow-lg h-14 w-14 bg-primary hover:bg-primary/90"
              onClick={() => setIsOpen(!isOpen)}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={isOpen ? "close" : "open"}
                  initial={{ rotate: 0, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {isOpen ? <X className="h-6 w-6 text-white" /> : <Plus className="h-6 w-6 text-white" />}
                </motion.div>
              </AnimatePresence>
              <span className="sr-only">{isOpen ? "닫기" : "메뉴"}</span>
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
