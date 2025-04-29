import { cn } from "@/lib/utils"

interface ColorSwatchProps {
  color: string
  name: string
  hex: string
  className?: string
}

function ColorSwatch({ color, name, hex, className }: ColorSwatchProps) {
  return (
    <div className={cn("flex flex-col", className)}>
      <div className="h-16 w-full rounded-md mb-2" style={{ backgroundColor: hex }} />
      <div className="text-sm font-medium">{name}</div>
      <div className="text-xs text-muted-foreground">{hex}</div>
    </div>
  )
}

export function ColorPalette() {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-medium mb-4">Primary Colors</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          <ColorSwatch color="primary-50" name="Primary 50" hex="#f0f7ff" />
          <ColorSwatch color="primary-100" name="Primary 100" hex="#e0eefe" />
          <ColorSwatch color="primary-200" name="Primary 200" hex="#bae0fd" />
          <ColorSwatch color="primary-400" name="Primary 400" hex="#36aaf5" />
          <ColorSwatch color="primary-600" name="Brand Blue" hex="#1873ff" />
          <ColorSwatch color="primary-700" name="Primary 700" hex="#0e59c7" />
          <ColorSwatch color="primary-900" name="Primary 900" hex="#153d85" />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">Accent Colors</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          <ColorSwatch color="itunda-purple" name="Purple" hex="#6C3CE9" />
          <ColorSwatch color="itunda-darkPurple" name="Dark Purple" hex="#4A2899" />
          <ColorSwatch color="itunda-lightPurple" name="Light Purple" hex="#9B7AFF" />
          <ColorSwatch color="itunda-navy" name="Navy" hex="#1A2542" />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">Neutral Colors</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          <ColorSwatch color="itunda-gray-50" name="Gray 50" hex="#f9fafb" />
          <ColorSwatch color="itunda-gray-200" name="Gray 200" hex="#e5e7eb" />
          <ColorSwatch color="itunda-gray-400" name="Gray 400" hex="#9ca3af" />
          <ColorSwatch color="itunda-gray-600" name="Gray 600" hex="#4b5563" />
          <ColorSwatch color="itunda-gray-900" name="Gray 900" hex="#111827" />
        </div>
      </div>
    </div>
  )
}
