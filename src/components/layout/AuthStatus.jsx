"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function AuthStatus() {
  const [user, setUser] = useState(null)
  const router = useRouter()

  useEffect(() => {
    const getUserAndProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser()

      if (user) {
        setUser(user)

        // Verificar si existe profile
        const { data: profile } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single()

        if (!profile) {
          await supabase.from("profiles").insert([
            {
              id: user.id,
              full_name: user.user_metadata?.full_name || "",
              role: "user"
            }
          ])
        }
      }
    }

    getUserAndProfile()

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null)
      }
    )

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push("/")
  }

  return (
    <div style={{ position: "absolute", top: 10, right: 10 }}>
      {!user ? (
        <Link href="/login">Login</Link>
      ) : (
        <>
          <Link href="/mi-cuenta">
            {user.user_metadata?.full_name || user.email}
          </Link>
          {" | "}
          <button onClick={handleLogout}>
            Logout
          </button>
        </>
      )}
    </div>
  )
}