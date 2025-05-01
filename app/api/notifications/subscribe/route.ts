import { NextResponse } from "next/server"
import webpush from "web-push"

// VAPID keys should be generated using the web-push library and stored securely
// For production, these should be in environment variables
const vapidKeys = {
  publicKey: "BLBz5U9-pZWGWHJQSQ9fukDsOiS0v_S5kLuoLHAYgTSWz7KWTxsVK2fsJiYzUJ1utYUxul5lj5jI6ZPwDHODYIY",
  privateKey: "3KzvKasA2SoCxsp0iIG_o9B0Ozvl1XDwI63JRKNIWBM",
}

// Configure web-push with our VAPID keys
webpush.setVapidDetails(
  "mailto:contact@itundatech.com", // A contact email for your application
  vapidKeys.publicKey,
  vapidKeys.privateKey,
)

// In-memory storage for subscriptions (in production, use a database)
const subscriptions: PushSubscription[] = []

export async function POST(request: Request) {
  try {
    const subscription = await request.json()

    // Validate the subscription object
    if (!subscription || !subscription.endpoint) {
      return NextResponse.json({ success: false, message: "Invalid subscription" }, { status: 400 })
    }

    // Store the subscription (in production, save to database)
    // Check if subscription already exists to avoid duplicates
    const exists = subscriptions.some((sub) => sub.endpoint === subscription.endpoint)
    if (!exists) {
      subscriptions.push(subscription)
    }

    return NextResponse.json({ success: true, message: "Subscription saved" })
  } catch (error) {
    console.error("Error saving subscription:", error)
    return NextResponse.json({ success: false, message: "Failed to save subscription" }, { status: 500 })
  }
}

export async function GET() {
  // Return the VAPID public key for the client to use
  return NextResponse.json({ publicKey: vapidKeys.publicKey })
}
