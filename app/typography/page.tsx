import type { Metadata } from "next"
import {
  TypographyH1,
  TypographyH2,
  TypographyH3,
  TypographyH4,
  TypographyP,
  TypographyLead,
  TypographyLarge,
  TypographySmall,
  TypographyMuted,
} from "@/components/ui/typography"
import { Separator } from "@/components/ui/separator"

export const metadata: Metadata = {
  title: "Typography - itunda.tech",
  description: "Typography system and text styles for itunda.tech",
}

export default function TypographyPage() {
  return (
    <div className="container py-10 max-w-4xl">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-4">Typography System</h1>
          <p className="text-muted-foreground">
            Our typography system is designed for readability, hierarchy, and visual appeal across all screen sizes.
          </p>
        </div>

        <Separator className="my-8" />

        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-semibold mb-4">Headings</h2>
            <div className="space-y-6">
              <div>
                <div className="text-sm text-muted-foreground mb-2">Heading 1</div>
                <TypographyH1>Clear, readable, and accessible typography</TypographyH1>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-2">Heading 2</div>
                <TypographyH2>Designed for optimal reading experience</TypographyH2>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-2">Heading 3</div>
                <TypographyH3>Consistent visual hierarchy across the platform</TypographyH3>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-2">Heading 4</div>
                <TypographyH4>Supporting content organization and scanability</TypographyH4>
              </div>
            </div>
          </section>

          <Separator />

          <section>
            <h2 className="text-xl font-semibold mb-4">Paragraphs</h2>
            <div className="space-y-6">
              <div>
                <div className="text-sm text-muted-foreground mb-2">Lead Paragraph</div>
                <TypographyLead>
                  Lead paragraphs introduce sections with slightly larger text to draw attention and provide context.
                </TypographyLead>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-2">Regular Paragraph</div>
                <TypographyP>
                  Regular paragraphs use a comfortable font size and line height for extended reading. Good typography
                  is invisible, allowing readers to focus on the content rather than the formatting. We've optimized our
                  paragraph styles for maximum readability across devices.
                </TypographyP>
                <TypographyP>
                  Multiple paragraphs maintain consistent spacing to create a rhythm that guides the reader through the
                  content. This helps maintain focus and improves comprehension of complex information.
                </TypographyP>
              </div>
            </div>
          </section>

          <Separator />

          <section>
            <h2 className="text-xl font-semibold mb-4">Supporting Text Styles</h2>
            <div className="space-y-6">
              <div>
                <div className="text-sm text-muted-foreground mb-2">Large Text</div>
                <TypographyLarge>Used for emphasized text that isn't a heading</TypographyLarge>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-2">Small Text</div>
                <TypographySmall>Used for labels, captions, and supporting information</TypographySmall>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-2">Muted Text</div>
                <TypographyMuted>Used for secondary information, hints, and less important content</TypographyMuted>
              </div>
            </div>
          </section>

          <Separator />

          <section>
            <h2 className="text-xl font-semibold mb-4">Text Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-medium mb-3">Text Balance</h3>
                <div className="p-4 border rounded-lg">
                  <p className="text-balance">
                    This text uses the text-balance utility to create more aesthetically pleasing line breaks for
                    headlines and short text elements.
                  </p>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-3">Text Pretty</h3>
                <div className="p-4 border rounded-lg">
                  <p className="text-pretty">
                    This text uses the text-pretty utility which improves the appearance of text by preventing awkward
                    line breaks and orphaned words in paragraphs.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
