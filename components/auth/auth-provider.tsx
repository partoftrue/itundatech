"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { createClientSupabaseClient } from "@/lib/supabase"
import type { Session, User } from "@supabase/supabase-js"

type AuthContextType = {
  user: User | null
  session: Session | null
  isLoading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string, name: string) => Promise<{ user: User | null; session: Session | null }>
  signOut: () => Promise<void>
  refreshUser: () => Promise<void>
  resendVerificationEmail: (email: string) => Promise<void>
  resetPassword: (email: string) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [supabase, setSupabase] = useState<any>(null)

  // Initialize Supabase client only on the client side
  useEffect(() => {
    const client = createClientSupabaseClient()
    setSupabase(client)
  }, [])

  useEffect(() => {
    if (!supabase) return

    const getSession = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession()
        setSession(session)
        setUser(session?.user ?? null)
      } catch (error) {
        console.error("Error getting session:", error)
      } finally {
        setIsLoading(false)
      }
    }

    getSession()

    try {
      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session)
        setUser(session?.user ?? null)
        setIsLoading(false)
      })

      return () => {
        subscription?.unsubscribe()
      }
    } catch (error) {
      console.error("Error setting up auth state change listener:", error)
      setIsLoading(false)
    }
  }, [supabase])

  const refreshUser = async () => {
    if (!supabase) return

    try {
      const {
        data: { session },
      } = await supabase.auth.getSession()
      setSession(session)
      setUser(session?.user ?? null)
    } catch (error) {
      console.error("Error refreshing user:", error)
    }
  }

  const signIn = async (email: string, password: string) => {
    if (!supabase) throw new Error("Supabase client not initialized")

    const { error, data } = await supabase.auth.signInWithPassword({ email, password })

    if (error) throw error

    // Check if email is verified - only if we have a user and the provider is email
    if (data.user && data.user.app_metadata.provider === "email" && !data.user.email_confirmed_at) {
      throw new Error("Please verify your email before signing in")
    }
  }

  const signUp = async (email: string, password: string, name: string) => {
    if (!supabase) throw new Error("Supabase client not initialized")

    const { error, data } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name },
        emailRedirectTo: `${window.location.origin}/auth/callback?verification=true`,
      },
    })

    if (error) throw error

    // If sign up is successful, create a user record
    if (data.user) {
      const { error: profileError } = await supabase.from("users").insert({
        id: data.user.id,
        email: data.user.email!,
        name: name,
      })

      if (profileError) throw profileError
    }

    return data
  }

  const signOut = async () => {
    if (!supabase) throw new Error("Supabase client not initialized")

    const { error } = await supabase.auth.signOut()
    if (error) throw error
  }

  const resendVerificationEmail = async (email: string) => {
    if (!supabase) throw new Error("Supabase client not initialized")

    const { error } = await supabase.auth.resend({
      type: "signup",
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback?verification=true`,
      },
    })

    if (error) throw error
  }

  const resetPassword = async (email: string) => {
    if (!supabase) throw new Error("Supabase client not initialized")

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/update-password`,
    })

    if (error) throw error
  }

  const value = {
    user,
    session,
    isLoading,
    signIn,
    signUp,
    signOut,
    refreshUser,
    resendVerificationEmail,
    resetPassword,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
