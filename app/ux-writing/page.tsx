import type { Metadata } from "next"
import { UXWritingGuide } from "@/components/ux-writing-guide"
import { Separator } from "@/components/ui/separator"

export const metadata: Metadata = {
  title: "UX Writing - itunda.tech",
  description: "UX writing principles and guidelines for itunda.tech",
}

export default function UXWritingPage() {
  return (
    <div className="container py-10 max-w-4xl">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-4">UX Writing Guidelines</h1>
          <p className="text-muted-foreground">
            Clear, concise, and helpful text that guides users and enhances their experience.
          </p>
        </div>

        <Separator className="my-8" />

        <UXWritingGuide />

        <Separator className="my-8" />

        <section>
          <h2 className="text-2xl font-bold mb-4">Writing for Different Contexts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <h3 className="text-lg font-medium">Buttons & CTAs</h3>
              <p className="text-muted-foreground">
                Use action verbs that clearly describe what will happen when clicked. Be specific and concise.
              </p>
              <div className="bg-muted p-3 rounded-md">
                <p className="font-medium">Examples:</p>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li>"Create project" (not "Submit")</li>
                  <li>"Save changes" (not "OK")</li>
                  <li>"Add team member" (not "Add")</li>
                </ul>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-medium">Form Labels & Placeholders</h3>
              <p className="text-muted-foreground">
                Labels should be clear and concise. Placeholders should provide helpful examples, not instructions.
              </p>
              <div className="bg-muted p-3 rounded-md">
                <p className="font-medium">Examples:</p>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li>Label: "Email address" with placeholder: "name@example.com"</li>
                  <li>Label: "Phone number" with placeholder: "(555) 123-4567"</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
