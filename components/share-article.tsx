"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Share2, Copy, Check, Twitter, Facebook, Linkedin } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { toast } from "@/components/ui/use-toast"
import { motion } from "framer-motion"

interface ShareArticleProps {
  title: string
  url: string
}

export function ShareArticle({ title, url }: ShareArticleProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    if (typeof navigator === "undefined" || !navigator.clipboard) {
      toast({
        title: "복사 실패",
        description: "클립보드에 복사할 수 없습니다.",
      })
      return
    }

    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      toast({
        title: "링크가 복사되었습니다",
        description: "클립보드에 복사되었습니다.",
      })
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      toast({
        title: "복사 실패",
        description: "링크를 복사하는데 실패했습니다.",
        variant: "destructive",
      })
    }
  }

  const shareOnTwitter = () => {
    if (typeof window === "undefined") return
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`)
  }

  const shareOnFacebook = () => {
    if (typeof window === "undefined") return
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`)
  }

  const shareOnLinkedIn = () => {
    if (typeof window === "undefined") return
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`)
  }

  return (
    <motion.div
      className="flex items-center gap-2"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Share2 className="h-4 w-4" />
            <span>공유하기</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={copyToClipboard} className="cursor-pointer">
            {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
            <span>링크 복사</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={shareOnTwitter} className="cursor-pointer">
            <Twitter className="h-4 w-4 mr-2" />
            <span>Twitter에 공유</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={shareOnFacebook} className="cursor-pointer">
            <Facebook className="h-4 w-4 mr-2" />
            <span>Facebook에 공유</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={shareOnLinkedIn} className="cursor-pointer">
            <Linkedin className="h-4 w-4 mr-2" />
            <span>LinkedIn에 공유</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </motion.div>
  )
}
