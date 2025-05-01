import { NextResponse } from "next/server"
import webpush from "web-push"

// Reference to the in-memory subscriptions array
// In production, this would be a database query
declare const subscriptions: PushSubscription[]

export async function POST(request: Request) {
  try {
    const { title, body, icon, url, tag, category } = await request.json()

    // Validate required fields
    if (!title || !body) {
      return NextResponse.json({ success: false, message: "Title and body are required" }, { status: 400 })
    }

    // Prepare the notification payload
    const payload = JSON.stringify({
      title,
      body,
      icon: icon || "/app-icon-light-192.png",
      badge: "/favicon-32x32.png",
      url: url || "/",
      tag: tag || "default",
      timestamp: Date.now(),
      category: category || "general",
    })

    // Send the notification to all subscriptions
    const sendPromises = subscriptions.map(async (subscription) => {
      try {
        await webpush.sendNotification(subscription, payload)
        return { success: true, endpoint: subscription.endpoint }
      } catch (error) {
        console.error(`Error sending notification to ${subscription.endpoint}:`, error)

        // If the subscription is no longer valid, remove it
        if (error.statusCode === 410) {
          // @ts-ignore - This is just for demo purposes
          const subscriptions = (global as any).subscriptions.filter(
            (sub: any) => sub.endpoint !== subscription.endpoint,
          )
          return { success: false, endpoint: subscription.endpoint, removed: true }
        }

        return { success: false, endpoint: subscription.endpoint, error: error.message }
      }
    })

    const results = await Promise.all(sendPromises)
    const successCount = results.filter((result) => result.success).length

    return NextResponse.json({
      success: true,
      message: `Sent notifications to ${successCount} of ${subscriptions.length} subscriptions`,
      results,
    })
  } catch (error) {
    console.error("Error sending notifications:", error)
    return NextResponse.json({ success: false, message: "Failed to send notifications" }, { status: 500 })
  }
}
