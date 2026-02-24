"use client"

import { supabase } from "@/lib/supabaseClient"

export default function LoginPage() {

  const loginWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "http://localhost:3000"
      }
    })
  }

  return (
    <div>
      <h1>Login</h1>
      <button onClick={loginWithGoogle}>
        Login con Google
      </button>
    </div>
  )
}