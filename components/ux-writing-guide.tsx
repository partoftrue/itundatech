import { cn } from "@/lib/utils"
import { Check, X } from "lucide-react"

interface ExampleProps {
  good: string
  bad: string
  explanation: string
  className?: string
}

function Example({ good, bad, explanation, className }: ExampleProps) {
  return (
    <div className={cn("space-y-3 p-4 border rounded-lg bg-card", className)}>
      <div className="space-y-2">
        <div className="flex items-start gap-2">
          <div className="flex-shrink-0 mt-0.5">
            <Check className="h-5 w-5 text-green-500" />
          </div>
          <div>
            <p className="font-medium">Good</p>
            <p className="text-muted-foreground">{good}</p>
          </div>
        </div>

        <div className="flex items-start gap-2">
          <div className="flex-shrink-0 mt-0.5">
            <X className="h-5 w-5 text-destructive" />
          </div>
          <div>
            <p className="font-medium">Avoid</p>
            <p className="text-muted-foreground">{bad}</p>
          </div>
        </div>
      </div>

      <div className="pt-2 border-t">
        <p className="text-sm">{explanation}</p>
      </div>
    </div>
  )
}

export function UXWritingGuide() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">UX Writing Principles</h2>
        <p className="text-muted-foreground mb-6">
          Clear, concise, and helpful text that guides users and enhances their experience.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Example
            good="Create your account"
            bad="Sign up now"
            explanation="Be specific about the action and its outcome. 'Create your account' clearly communicates what will happen."
          />

          <Example
            good="Your changes have been saved"
            bad="Success!"
            explanation="Be specific in confirmations. Tell users exactly what happened rather than using vague terms."
          />

          <Example
            good="We couldn't find any results matching 'design'"
            bad="No results found"
            explanation="Explain why something happened and suggest next steps when possible."
          />

          <Example
            good="Continue to payment"
            bad="Next"
            explanation="Use descriptive button labels that explain where they lead or what action they perform."
          />
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Tone & Voice</h2>
        <p className="text-muted-foreground mb-6">Our tone is professional yet approachable, clear, and empowering.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Example
            good="We're updating our system. This might take a few minutes."
            bad="System maintenance in progress. Please wait."
            explanation="Use a conversational, human tone that builds connection with users."
          />

          <Example
            good="Let's set up your profile to help you get started"
            bad="Profile setup required"
            explanation="Frame interactions as collaborative and helpful rather than requirements."
          />
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Error Messages</h2>
        <p className="text-muted-foreground mb-6">
          Error messages should be helpful, not blame the user, and offer solutions.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Example
            good="This email is already registered. Try signing in instead."
            bad="Email already exists in the system."
            explanation="Provide a clear path forward when errors occur."
          />

          <Example
            good="We couldn't connect to the server. Please check your internet connection and try again."
            bad="Connection error. Try again later."
            explanation="Explain what went wrong and how to fix it when possible."
          />
        </div>
      </div>
    </div>
  )
}
