import { Button } from "@/components/ui/button"
import { EnhancedButton } from "@/components/ui/enhanced-button"

export function ButtonShowcase() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Button Styles</h2>
        <p className="text-muted-foreground">
          Our button system is inspired by Toss, Kakao, and Apple, focusing on clean, accessible designs.
        </p>
      </div>

      <div className="space-y-6">
        <h3 className="text-xl font-semibold">Standard Buttons</h3>
        <div className="flex flex-wrap gap-4">
          <Button variant="default">Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
          <Button variant="destructive">Destructive</Button>
        </div>
      </div>

      <div className="space-y-6">
        <h3 className="text-xl font-semibold">Enhanced Buttons</h3>
        <div className="flex flex-wrap gap-4">
          <EnhancedButton variant="default">Default</EnhancedButton>
          <EnhancedButton variant="gradient">Gradient</EnhancedButton>
          <EnhancedButton variant="subtle">Subtle</EnhancedButton>
          <EnhancedButton variant="outline" rounded="lg">
            Rounded
          </EnhancedButton>
          <EnhancedButton variant="secondary" rounded="full">
            Pill
          </EnhancedButton>
        </div>
      </div>

      <div className="space-y-6">
        <h3 className="text-xl font-semibold">Button Sizes</h3>
        <div className="flex flex-wrap items-center gap-4">
          <Button size="sm">Small</Button>
          <Button size="default">Default</Button>
          <Button size="lg">Large</Button>
          <Button size="xl">Extra Large</Button>
          <Button size="icon">
            <span>Icon</span>
          </Button>
        </div>
      </div>

      <div className="space-y-6">
        <h3 className="text-xl font-semibold">Button States</h3>
        <div className="flex flex-wrap gap-4">
          <Button>Normal</Button>
          <Button disabled>Disabled</Button>
          <EnhancedButton isLoading>Loading</EnhancedButton>
          <EnhancedButton isLoading loadingText="Saving...">
            Save
          </EnhancedButton>
        </div>
      </div>

      <div className="space-y-6">
        <h3 className="text-xl font-semibold">Custom Styles</h3>
        <div className="flex flex-wrap gap-4">
          <button className="btn-primary px-4 py-2 rounded-lg">Toss Style</button>
          <button className="accent-kakao px-4 py-2 rounded-lg">Kakao Style</button>
          <button className="bg-apple-blue text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition-colors">
            Apple Style
          </button>
        </div>
      </div>
    </div>
  )
}
