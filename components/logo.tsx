import { cn } from "@/lib/utils"

interface LogoProps {
  className?: string
  color?: string
  size?: number
}

export function Logo({ className, color = "#1f78ff", size = 48 }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("", className)}
    >
      {/* Electric bolt path */}
      <path
        d="M13 2L4.09344 12.6879C3.74463 13.1064 3.57023 13.3157 3.57078 13.4925C3.57126 13.6461 3.63788 13.7923 3.75203 13.8897C3.88385 14 4.1505 14 4.68385 14H12L11 22L19.9065 11.3121C20.2553 10.8936 20.4297 10.6843 20.4292 10.5075C20.4287 10.3539 20.3621 10.2077 20.248 10.1103C20.1161 10 19.8495 10 19.3161 10H12L13 2Z"
        fill={color}
        strokeWidth="0"
      />
    </svg>
  )
}

export function LogoWithText({ className, color = "#1f78ff", size = 48 }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Logo color={color} size={size} />
      <span className="font-bold text-2xl">itundatech</span>
    </div>
  )
}
