"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useThemeContext } from "@/contexts/theme-context"
import { Download, Upload, Copy, Check } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function ThemeExportImport() {
  const { settings, updateSettings } = useThemeContext()
  const { toast } = useToast()
  const [importValue, setImportValue] = useState("")
  const [importDialogOpen, setImportDialogOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  // Export theme settings as JSON
  const exportTheme = () => {
    const themeJson = JSON.stringify(settings, null, 2)

    // Create a blob and download it
    const blob = new Blob([themeJson], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "itunda-theme-settings.json"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    toast({
      title: "Theme exported",
      description: "Your theme settings have been exported as a JSON file.",
    })
  }

  // Copy theme settings to clipboard
  const copyTheme = () => {
    const themeJson = JSON.stringify(settings)
    navigator.clipboard.writeText(themeJson)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)

    toast({
      title: "Copied to clipboard",
      description: "Your theme settings have been copied to clipboard.",
    })
  }

  // Import theme settings from JSON
  const importTheme = () => {
    try {
      const importedSettings = JSON.parse(importValue)
      updateSettings(importedSettings)
      setImportDialogOpen(false)
      setImportValue("")

      toast({
        title: "Theme imported",
        description: "Your theme settings have been successfully imported.",
      })
    } catch (error) {
      toast({
        title: "Import failed",
        description: "The provided JSON is invalid. Please check and try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex flex-col sm:flex-row gap-2">
        <Button onClick={exportTheme} variant="outline" className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Export Theme
        </Button>

        <Button onClick={copyTheme} variant="outline" className="flex items-center gap-2">
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          {copied ? "Copied!" : "Copy Settings"}
        </Button>

        <Dialog open={importDialogOpen} onOpenChange={setImportDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <Upload className="h-4 w-4" />
              Import Theme
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Import Theme Settings</DialogTitle>
              <DialogDescription>Paste your theme settings JSON below to import.</DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <Input
                value={importValue}
                onChange={(e) => setImportValue(e.target.value)}
                placeholder='{"mode":"dark","accent":"blue",...}'
                className="font-mono text-xs h-32"
                multiline
              />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setImportDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={importTheme}>Import</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
