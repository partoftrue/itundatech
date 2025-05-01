"use client"

import { useState, useEffect } from "react"
import { Bell, BellOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"

interface NotificationPreferences {
  newArticles: boolean
  comments: boolean
  updates: boolean
}

export default function NotificationManager() {
  const [permission, setPermission] = useState<NotificationPermission | "default">("default")
  const [subscription, setSubscription] = useState<PushSubscription | null>(null)
  const [isSubscribing, setIsSubscribing] = useState(false)
  const [isUnsubscribing, setIsUnsubscribing] = useState(false)
  const [preferences, setPreferences] = useState<NotificationPreferences>({
    newArticles: true,
    comments: true,
    updates: true,
  })

  // Check notification permission and subscription status on mount
  useEffect(() => {
    const checkPermissionAndSubscription = async () => {
      // Check if the browser supports notifications
      if (!("Notification" in window)) {
        console.log("This browser does not support notifications")
        return
      }

      // Check permission status
      setPermission(Notification.permission)

      // Check if service worker is registered and has an active subscription
      if (permission === "granted" && "serviceWorker" in navigator) {
        try {
          const registration = await navigator.serviceWorker.ready
          const existingSubscription = await registration.pushManager.getSubscription()
          setSubscription(existingSubscription)

          // Load preferences from localStorage
          const savedPreferences = localStorage.getItem("notificationPreferences")
          if (savedPreferences) {
            setPreferences(JSON.parse(savedPreferences))
          }
        } catch (error) {
          console.error("Error checking subscription:", error)
        }
      }
    }

    checkPermissionAndSubscription()
  }, [permission])

  // Subscribe to push notifications
  const subscribeToNotifications = async () => {
    try {
      setIsSubscribing(true)

      // Request permission if not already granted
      if (permission !== "granted") {
        const result = await Notification.requestPermission()
        setPermission(result)
        if (result !== "granted") {
          toast({
            title: "Permission denied",
            description: "You need to allow notifications to receive updates.",
            variant: "destructive",
          })
          setIsSubscribing(false)
          return
        }
      }

      // Get the service worker registration
      const registration = await navigator.serviceWorker.ready

      // Get the VAPID public key from the server
      const response = await fetch("/api/notifications/subscribe")
      const { publicKey } = await response.json()

      // Subscribe to push notifications
      const newSubscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicKey),
      })

      // Send the subscription to the server
      const saveResponse = await fetch("/api/notifications/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newSubscription),
      })

      if (saveResponse.ok) {
        setSubscription(newSubscription)
        savePreferences(preferences)
        toast({
          title: "Notifications enabled",
          description: "You will now receive notifications from ItundaTech.",
        })
      } else {
        throw new Error("Failed to save subscription on server")
      }
    } catch (error) {
      console.error("Error subscribing to notifications:", error)
      toast({
        title: "Subscription failed",
        description: "There was an error enabling notifications. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubscribing(false)
    }
  }

  // Unsubscribe from push notifications
  const unsubscribeFromNotifications = async () => {
    if (!subscription) return

    try {
      setIsUnsubscribing(true)

      // Unsubscribe from push manager
      await subscription.unsubscribe()

      // Remove subscription from server
      await fetch("/api/notifications/unsubscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ endpoint: subscription.endpoint }),
      })

      setSubscription(null)
      toast({
        title: "Notifications disabled",
        description: "You will no longer receive notifications from ItundaTech.",
      })
    } catch (error) {
      console.error("Error unsubscribing from notifications:", error)
      toast({
        title: "Error disabling notifications",
        description: "There was an error disabling notifications. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsUnsubscribing(false)
    }
  }

  // Save notification preferences
  const savePreferences = (newPreferences: NotificationPreferences) => {
    localStorage.setItem("notificationPreferences", JSON.stringify(newPreferences))
    setPreferences(newPreferences)
    toast({
      title: "Preferences saved",
      description: "Your notification preferences have been updated.",
    })
  }

  // Test notification
  const sendTestNotification = async () => {
    if (!subscription) return

    try {
      const response = await fetch("/api/notifications/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: "Test Notification",
          body: "This is a test notification from ItundaTech.",
          url: "/",
          tag: "test",
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to send test notification")
      }

      toast({
        title: "Test notification sent",
        description: "If you don't see it, check your browser settings.",
      })
    } catch (error) {
      console.error("Error sending test notification:", error)
      toast({
        title: "Error sending notification",
        description: "There was an error sending the test notification.",
        variant: "destructive",
      })
    }
  }

  // Helper function to convert base64 to Uint8Array for VAPID key
  function urlBase64ToUint8Array(base64String: string) {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4)
    const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/")
    const rawData = window.atob(base64)
    const outputArray = new Uint8Array(rawData.length)
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i)
    }
    return outputArray
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          {subscription ? <Bell className="h-5 w-5" /> : <BellOff className="h-5 w-5" />}
          <span className="sr-only">Notification settings</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Notification Settings</DialogTitle>
          <DialogDescription>Manage your notification preferences for ItundaTech.</DialogDescription>
        </DialogHeader>

        <div className="py-4 space-y-4">
          {!("Notification" in window) ? (
            <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-md">
              <p className="text-sm text-yellow-800 dark:text-yellow-200">
                Your browser doesn't support notifications.
              </p>
            </div>
          ) : subscription ? (
            <>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium">Notifications</h4>
                  <p className="text-sm text-muted-foreground">You are currently subscribed to notifications.</p>
                </div>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={unsubscribeFromNotifications}
                  disabled={isUnsubscribing}
                >
                  {isUnsubscribing ? "Disabling..." : "Disable All"}
                </Button>
              </div>

              <div className="space-y-3 border-t pt-3">
                <h4 className="text-sm font-medium">Notification Categories</h4>

                <div className="flex items-center justify-between">
                  <Label htmlFor="new-articles" className="flex flex-col">
                    <span>New Articles</span>
                    <span className="text-xs text-muted-foreground">Get notified when new articles are published</span>
                  </Label>
                  <Switch
                    id="new-articles"
                    checked={preferences.newArticles}
                    onCheckedChange={(checked) => {
                      const newPrefs = { ...preferences, newArticles: checked }
                      setPreferences(newPrefs)
                      savePreferences(newPrefs)
                    }}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="comments" className="flex flex-col">
                    <span>Comments</span>
                    <span className="text-xs text-muted-foreground">Get notified about replies to your comments</span>
                  </Label>
                  <Switch
                    id="comments"
                    checked={preferences.comments}
                    onCheckedChange={(checked) => {
                      const newPrefs = { ...preferences, comments: checked }
                      setPreferences(newPrefs)
                      savePreferences(newPrefs)
                    }}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="updates" className="flex flex-col">
                    <span>App Updates</span>
                    <span className="text-xs text-muted-foreground">
                      Get notified about app updates and new features
                    </span>
                  </Label>
                  <Switch
                    id="updates"
                    checked={preferences.updates}
                    onCheckedChange={(checked) => {
                      const newPrefs = { ...preferences, updates: checked }
                      setPreferences(newPrefs)
                      savePreferences(newPrefs)
                    }}
                  />
                </div>
              </div>

              <div className="border-t pt-3">
                <Button variant="outline" size="sm" onClick={sendTestNotification}>
                  Send Test Notification
                </Button>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center gap-4 py-4">
              <Bell className="h-12 w-12 text-muted-foreground" />
              <div className="text-center">
                <h4 className="text-base font-medium">Enable Notifications</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Get notified about new articles, comments, and updates.
                </p>
              </div>
              <Button onClick={subscribeToNotifications} disabled={isSubscribing}>
                {isSubscribing ? "Enabling..." : "Enable Notifications"}
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
