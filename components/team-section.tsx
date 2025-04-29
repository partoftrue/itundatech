"use client"

import { motion } from "framer-motion"
import { TeamMemberCard } from "@/components/team-member-card"
import { staggerContainer, staggerItem } from "@/lib/animations"

interface TeamMember {
  id: string
  name: string
  role: string
  bio?: string
  imageUrl: string
  socialLinks?: {
    platform: "twitter" | "linkedin" | "github"
    url: string
  }[]
}

interface TeamSectionProps {
  members: TeamMember[]
  title?: string
  subtitle?: string
}

export function TeamSection({ members, title = "Our Team", subtitle }: TeamSectionProps) {
  return (
    <div className="py-16 md:py-24">
      <div className="max-w-screen-xl mx-auto px-6">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-12"
        >
          <motion.h2 variants={staggerItem} className="text-3xl md:text-4xl font-bold mb-4">
            {title}
          </motion.h2>
          {subtitle && (
            <motion.p variants={staggerItem} className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {subtitle}
            </motion.p>
          )}
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {members.map((member, index) => (
            <motion.div key={member.id} variants={staggerItem} custom={index}>
              <TeamMemberCard
                name={member.name}
                role={member.role}
                bio={member.bio}
                imageUrl={member.imageUrl}
                socialLinks={member.socialLinks}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
