import type { Metadata } from "next"
import { ColorPalette } from "@/components/ui/color-palette"
import { Separator } from "@/components/ui/separator"

export const metadata: Metadata = {
  title: "Colors - itunda.tech",
  description: "Color system and palette for itunda.tech",
}

export default function ColorsPage() {
  return (
    <div className="container py-10 max-w-4xl">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-4">Color System</h1>
          <p className="text-muted-foreground">
            Our color system is designed for accessibility, consistency, and visual appeal across the platform.
          </p>
        </div>

        <Separator className="my-8" />

        <ColorPalette />

        <Separator className="my-8" />

        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-semibold mb-4">Color Usage Guidelines</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <h3 className="text-lg font-medium">Primary Colors</h3>
                <p className="text-muted-foreground">
                  Use our primary blue for key actions, links, and brand elements. Reserve it for elements you want to
                  emphasize.
                </p>
              </div>
              <div className="space-y-3">
                <h3 className="text-lg font-medium">Accent Colors</h3>
                <p className="text-muted-foreground">
                  Use purple accents to add visual interest and highlight secondary elements or features.
                </p>
              </div>
              <div className="space-y-3">
                <h3 className="text-lg font-medium">Neutral Colors</h3>
                <p className="text-muted-foreground">
                  Use our gray scale for text, backgrounds, and UI elements. Maintain sufficient contrast for
                  readability.
                </p>
              </div>
              <div className="space-y-3">
                <h3 className="text-lg font-medium">Semantic Colors</h3>
                <p className="text-muted-foreground">
                  Use green for success, red for errors, and amber for warnings consistently throughout the interface.
                </p>
              </div>
            </div>
          </section>

          <Separator />

          <section>
            <h2 className="text-xl font-semibold mb-4">Accessibility</h2>
            <p className="text-muted-foreground mb-4">
              All color combinations in our system meet WCAG 2.1 AA standards for contrast. When using colors:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Never use color as the only means of conveying information</li>
              <li>Maintain a minimum contrast ratio of 4.5:1 for normal text and 3:1 for large text</li>
              <li>Test your designs in both light and dark modes</li>
              <li>Consider color blindness when designing with multiple colors</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  )
}
