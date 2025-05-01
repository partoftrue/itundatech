import { NextResponse } from "next/server"

// Reference to the in-memory subscriptions array
// In production, this would be a database query
declare let subscriptions: PushSubscription[]

export async function POST(request: Request) {
  try {
    const { endpoint } = await request.json()

    if (!endpoint) {
      return NextResponse.json({ success: false, message: "Invalid endpoint" }, { status: 400 })
    }

    // Remove the subscription with the matching endpoint
    const initialLength = subscriptions.length
    const filteredSubscriptions = subscriptions.filter((sub) => sub.endpoint !== endpoint)

    // Update the subscriptions array
    // @ts-ignore - This is just for demo purposes
    subscriptions = filteredSubscriptions

    const wasRemoved = initialLength > filteredSubscriptions.length

    return NextResponse.json({
      success: true,
      message: wasRemoved ? "Subscription removed" : "Subscription not found",
    })
  } catch (error) {
    console.error("Error removing subscription:", error)
    return NextResponse.json({ success: false, message: "Failed to remove subscription" }, { status: 500 })
  }
}
