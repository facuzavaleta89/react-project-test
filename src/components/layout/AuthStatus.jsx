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
    <div className="flex items-center gap-3">
      {!user ? (
        <Link href="/login" className="hover:text-zinc-500 dark:hover:text-zinc-300 transition-colors">Login</Link>
      ) : (
        <>
          <Link href="/mi-cuenta" className="hover:text-zinc-500 dark:hover:text-zinc-300 transition-colors max-w-[120px] truncate text-sm" title={user.user_metadata?.full_name || user.email}>
            {user.user_metadata?.full_name || user.email}
          </Link>
          <button
            onClick={handleLogout}
            className="text-xs px-3 py-1.5 bg-zinc-200 dark:bg-white/10 hover:bg-red-100 dark:hover:bg-red-900/30 text-zinc-700 hover:text-red-600 dark:text-zinc-300 dark:hover:text-red-400 rounded-md transition-colors"
          >
            Logout
          </button>
        </>
      )}
    </div>
  )
}