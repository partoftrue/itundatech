"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Monitor, Moon, Sun } from "lucide-react"
import { useThemePreference } from "@/hooks/use-theme-preference"
import { useEffect, useState } from "react"

export default function ThemeSettingsPage() {
  const { theme, setTheme, hasStoredPreference, resetToSystemPreference, mounted } = useThemePreference()
  const [selectedTheme, setSelectedTheme] = useState<string>("system")

  // Update selected theme when mounted
  useEffect(() => {
    if (mounted && theme) {
      setSelectedTheme(theme)
    }
  }, [mounted, theme])

  if (!mounted) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Theme Settings</CardTitle>
              <CardDescription>Loading theme preferences...</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-md mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Theme Settings</CardTitle>
            <CardDescription>Customize your theme preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Choose Theme</h3>
              <RadioGroup
                value={selectedTheme}
                onValueChange={(value) => {
                  setSelectedTheme(value)
                  setTheme(value)
                }}
              >
                <div className="flex items-center space-x-2 mb-3">
                  <RadioGroupItem value="light" id="light" />
                  <Label htmlFor="light" className="flex items-center cursor-pointer">
                    <Sun className="mr-2 h-4 w-4" />
                    Light
                  </Label>
                </div>
                <div className="flex items-center space-x-2 mb-3">
                  <RadioGroupItem value="dark" id="dark" />
                  <Label htmlFor="dark" className="flex items-center cursor-pointer">
                    <Moon className="mr-2 h-4 w-4" />
                    Dark
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="system" id="system" />
                  <Label htmlFor="system" className="flex items-center cursor-pointer">
                    <Monitor className="mr-2 h-4 w-4" />
                    System
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {hasStoredPreference && (
              <div className="pt-4 border-t">
                <p className="text-sm text-muted-foreground mb-4">
                  Your theme preference is saved in your browser. It will be remembered the next time you visit.
                </p>
                <Button variant="outline" onClick={resetToSystemPreference}>
                  Reset to System Preference
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
