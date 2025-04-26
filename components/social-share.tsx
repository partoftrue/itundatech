"use client"

import { Button } from "@/components/ui/button"
import { Twitter, Facebook, Linkedin, LinkIcon, Copy } from "lucide-react"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

interface SocialShareProps {
  url: string
  title: string
  description?: string
  className?: string
  vertical?: boolean
}

export function SocialShare({ url, title, description = "", className = "", vertical = false }: SocialShareProps) {
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()

  // Ensure we have the full URL
  const fullUrl = url.startsWith("http") ? url : `${window.location.origin}${url}`

  const encodedUrl = encodeURIComponent(fullUrl)
  const encodedTitle = encodeURIComponent(title)
  const encodedDescription = encodeURIComponent(description)

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}&title=${encodedTitle}&summary=${encodedDescription}`,
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(fullUrl)
    setCopied(true)
    toast({
      title: "Link copied",
      description: "The article link has been copied to your clipboard.",
    })

    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className={`flex ${vertical ? "flex-col" : "flex-row"} gap-2 ${className}`}>
      <Button
        variant="outline"
        size="icon"
        className="rounded-full"
        onClick={() => window.open(shareLinks.twitter, "_blank")}
        aria-label="Share on Twitter"
      >
        <Twitter className="h-4 w-4" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        className="rounded-full"
        onClick={() => window.open(shareLinks.facebook, "_blank")}
        aria-label="Share on Facebook"
      >
        <Facebook className="h-4 w-4" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        className="rounded-full"
        onClick={() => window.open(shareLinks.linkedin, "_blank")}
        aria-label="Share on LinkedIn"
      >
        <Linkedin className="h-4 w-4" />
      </Button>

      <Button variant="outline" size="icon" className="rounded-full" onClick={copyToClipboard} aria-label="Copy link">
        {copied ? <Copy className="h-4 w-4" /> : <LinkIcon className="h-4 w-4" />}
      </Button>
    </div>
  )
}
