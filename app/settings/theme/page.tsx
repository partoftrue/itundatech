"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Monitor, Moon, Sun, ArrowLeft } from "lucide-react"
import { useThemeContext } from "@/contexts/theme-context"
import Link from "next/link"

export default function ThemeSettingsPage() {
  const { mode, setMode, isLoaded } = useThemeContext()

  if (!isLoaded) {
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
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/">
              <ArrowLeft className="h-5 w-5" />
              <span className="sr-only">Back</span>
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">Theme Settings</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Choose Theme</CardTitle>
            <CardDescription>Select your preferred theme mode</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <RadioGroup value={mode} onValueChange={(value) => setMode(value as "light" | "dark" | "system")}>
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

            <div className="pt-4 border-t">
              <p className="text-sm text-muted-foreground mb-4">
                Your theme preference is saved in your browser. It will be remembered the next time you visit.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
