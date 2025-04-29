import { createServerSupabaseClient } from "@/lib/supabase"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get("code")
  const isVerification = requestUrl.searchParams.get("verification") === "true"

  if (code) {
    const supabase = createServerSupabaseClient()

    // Exchange the code for a session
    const { data, error } = await supabase.auth.exchangeCodeForSession(code)

    if (error) {
      console.error("Error exchanging code for session:", error)
      return NextResponse.redirect(new URL("/auth?error=auth_error", requestUrl.origin))
    }

    if (data.session?.user) {
      const user = data.session.user

      // Check if user exists in our users table
      const { data: existingUser, error: userError } = await supabase
        .from("users")
        .select("id")
        .eq("id", user.id)
        .single()

      if (userError && userError.code !== "PGRST116") {
        console.error("Error checking user existence:", userError)
      }

      // If user doesn't exist, create a new user record
      if (!existingUser) {
        const { error: insertError } = await supabase.from("users").insert({
          id: user.id,
          email: user.email!,
          name: user.user_metadata.name || user.email!.split("@")[0],
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })

        if (insertError) {
          console.error("Error creating user record:", insertError)
        }
      }
    }
  }

  // If this is a verification callback, redirect to verification success page
  if (isVerification) {
    return NextResponse.redirect(new URL("/auth/verification-success", requestUrl.origin))
  }

  // Otherwise redirect to the home page
  return NextResponse.redirect(new URL("/", requestUrl.origin))
}
