import { NextResponse } from "next/server"
import sharp from "sharp"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const size = Number.parseInt(searchParams.get("size") || "512")
  const isDark = searchParams.get("dark") === "true"

  // Create SVG with the electric bolt
  const color = isDark ? "#ffffff" : "#1f78ff"
  const bgColor = isDark ? "#1b1e3d" : "transparent"

  const svgContent = `
    <svg width="${size}" height="${size}" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" fill="${bgColor}" />
      <path d="M13 2L4.09344 12.6879C3.74463 13.1064 3.57023 13.3157 3.57078 13.4925C3.57126 13.6461 3.63788 13.7923 3.75203 13.8897C3.88385 14 4.1505 14 4.68385 14H12L11 22L19.9065 11.3121C20.2553 10.8936 20.4297 10.6843 20.4292 10.5075C20.4287 10.3539 20.3621 10.2077 20.248 10.1103C20.1161 10 19.8495 10 19.3161 10H12L13 2Z" fill="${color}" />
    </svg>
  `

  // Convert SVG to PNG
  const pngBuffer = await sharp(Buffer.from(svgContent)).resize(size, size).png().toBuffer()

  return new NextResponse(pngBuffer, {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  })
}
