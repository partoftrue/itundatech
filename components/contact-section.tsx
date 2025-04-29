"use client"

import { motion } from "framer-motion"
import { ContactForm } from "@/components/contact-form"
import { fadeInLeft, fadeInRight } from "@/lib/animations"
import { Mail, MapPin, Phone } from "lucide-react"
import { cn } from "@/lib/utils"

interface ContactInfo {
  email: string
  phone: string
  address: string
}

interface ContactSectionProps {
  title?: string
  subtitle?: string
  contactInfo: ContactInfo
  className?: string
}

export function ContactSection({ title = "Get in Touch", subtitle, contactInfo, className }: ContactSectionProps) {
  return (
    <div className={cn("py-16 md:py-24", className)}>
      <div className="max-w-screen-xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
          {subtitle && <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>}
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <motion.div
            variants={fadeInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-card border rounded-2xl p-8 shadow-sm"
          >
            <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>

            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-primary/10 p-3 rounded-full mr-4">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="font-medium mb-1">Email</p>
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {contactInfo.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-primary/10 p-3 rounded-full mr-4">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="font-medium mb-1">Phone</p>
                  <a
                    href={`tel:${contactInfo.phone}`}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {contactInfo.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-primary/10 p-3 rounded-full mr-4">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="font-medium mb-1">Address</p>
                  <p className="text-muted-foreground">{contactInfo.address}</p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t">
              <h4 className="font-medium mb-4">Connect With Us</h4>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="bg-muted hover:bg-muted/80 transition-colors p-3 rounded-full"
                  aria-label="Twitter"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-twitter"
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="bg-muted hover:bg-muted/80 transition-colors p-3 rounded-full"
                  aria-label="LinkedIn"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-linkedin"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect width="4" height="12" x="2" y="9" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="bg-muted hover:bg-muted/80 transition-colors p-3 rounded-full"
                  aria-label="GitHub"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-github"
                  >
                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                    <path d="M9 18c-4.51 2-5-2-7-2" />
                  </svg>
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div variants={fadeInRight} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <div className="bg-card border rounded-2xl p-8 shadow-sm">
              <h3 className="text-2xl font-semibold mb-6">Send Us a Message</h3>
              <ContactForm />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
