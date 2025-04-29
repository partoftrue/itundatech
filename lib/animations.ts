"use client"

import type { Variants } from "framer-motion"

// Fade animations
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } },
  exit: { opacity: 0, transition: { duration: 0.4 } },
}

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  exit: { opacity: 0, y: 20, transition: { duration: 0.4 } },
}

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.4 } },
}

export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
  exit: { opacity: 0, x: -20, transition: { duration: 0.4 } },
}

export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
  exit: { opacity: 0, x: 20, transition: { duration: 0.4 } },
}

// Slide animations
export const slideUp: Variants = {
  hidden: { y: 100, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.7, ease: "easeOut" } },
  exit: { y: 100, opacity: 0, transition: { duration: 0.5, ease: "easeIn" } },
}

export const slideDown: Variants = {
  hidden: { y: -100, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.7, ease: "easeOut" } },
  exit: { y: -100, opacity: 0, transition: { duration: 0.5, ease: "easeIn" } },
}

export const slideInLeft: Variants = {
  hidden: { x: -100, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.7, ease: "easeOut" } },
  exit: { x: -100, opacity: 0, transition: { duration: 0.5, ease: "easeIn" } },
}

export const slideInRight: Variants = {
  hidden: { x: 100, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.7, ease: "easeOut" } },
  exit: { x: 100, opacity: 0, transition: { duration: 0.5, ease: "easeIn" } },
}

// Scale animations
export const scaleUp: Variants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { duration: 0.6 } },
  exit: { scale: 0.8, opacity: 0, transition: { duration: 0.4 } },
}

export const scaleDown: Variants = {
  hidden: { scale: 1.2, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { duration: 0.6 } },
  exit: { scale: 1.2, opacity: 0, transition: { duration: 0.4 } },
}

// Staggered animations
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

export const staggerItem: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
}

// Button animations
export const buttonHover = {
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.98 },
  transition: { duration: 0.2 },
}

// Card hover animation
export const cardHover = {
  whileHover: { scale: 1.03 },
  whileTap: { scale: 0.98 },
  transition: { duration: 0.2 },
}

// Page transitions
export const pageTransition: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, ease: "easeInOut" } },
  exit: { opacity: 0, transition: { duration: 0.3, ease: "easeInOut" } },
}

// Spinner animation
export const spinTransition = {
  loop: Number.POSITIVE_INFINITY,
  ease: "linear",
  duration: 1,
}

// Pulse animation
export const pulseAnimation: Variants = {
  hidden: { scale: 1 },
  visible: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      ease: "easeInOut",
      repeat: Number.POSITIVE_INFINITY,
      repeatType: "loop",
    },
  },
}

// Bounce animation
export const bounceAnimation: Variants = {
  hidden: { y: 0 },
  visible: {
    y: [0, -10, 0],
    transition: {
      duration: 1.5,
      ease: "easeInOut",
      repeat: Number.POSITIVE_INFINITY,
      repeatType: "loop",
    },
  },
}

// Float animation
export const floatAnimation: Variants = {
  hidden: { y: 0 },
  visible: {
    y: [0, -15, 0],
    transition: {
      duration: 6,
      ease: "easeInOut",
      repeat: Number.POSITIVE_INFINITY,
      repeatType: "loop",
    },
  },
}

// Wave animation
export const waveAnimation: Variants = {
  hidden: { rotate: 0 },
  visible: {
    rotate: [0, 15, 0, -15, 0],
    transition: {
      duration: 2.5,
      ease: "easeInOut",
      repeat: Number.POSITIVE_INFINITY,
      repeatType: "loop",
    },
  },
}
