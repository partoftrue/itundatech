"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { buttonHover } from "@/lib/animations"
import { Twitter, Linkedin, Github } from "lucide-react"

interface SocialLink {
  platform: "twitter" | "linkedin" | "github"
  url: string
}

interface TeamMemberCardProps {
  name: string
  role: string
  bio?: string
  imageUrl: string
  socialLinks?: SocialLink[]
  className?: string
}

export function TeamMemberCard({ name, role, bio, imageUrl, socialLinks, className }: TeamMemberCardProps) {
  const socialIcons = {
    twitter: <Twitter className="h-4 w-4" />,
    linkedin: <Linkedin className="h-4 w-4" />,
    github: <Github className="h-4 w-4" />,
  }

  return (
    <motion.div
      {...buttonHover}
      className={cn(
        "rounded-2xl border bg-card shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md",
        className,
      )}
    >
      <div className="aspect-[4/5] relative overflow-hidden">
        <img
          src={imageUrl || "/placeholder.svg"}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>

      <div className="p-6">
        <h3 className="text-xl font-semibold mb-1">{name}</h3>
        <p className="text-primary font-medium mb-3">{role}</p>

        {bio && <p className="text-muted-foreground mb-4 text-sm">{bio}</p>}

        {socialLinks && socialLinks.length > 0 && (
          <div className="flex space-x-3">
            {socialLinks.map((link) => (
              <a
                key={link.platform}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label={`${name}'s ${link.platform}`}
              >
                {socialIcons[link.platform]}
              </a>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  )
}
