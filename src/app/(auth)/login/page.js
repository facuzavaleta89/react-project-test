"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { useRouter } from "next/navigation"
import { FcGoogle } from "react-icons/fc"

export default function LoginPage() {
  const router = useRouter()

  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [fullName, setFullName] = useState("")
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleAuth = async (e) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)
    setLoading(true)

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })
        if (error) throw error

        router.push("/")
      } else {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: fullName },
          },
        })

        if (error) throw error

        if (data?.user) {
          await supabase.from("profiles").insert([
            {
              id: data.user.id,
              full_name: fullName,
              role: "user",
            },
          ])
        }

        if (data?.session) {
          setSuccess("Cuenta creada exitosamente. Redirigiendo...")
          setTimeout(() => {
            router.push("/")
          }, 1500)
        } else {
          setSuccess("Cuenta creada. Revisa tu email para confirmar tu cuenta.")
        }
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const loginWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "http://localhost:3000",
      },
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900">
      
      <div className="w-full max-w-md p-8 rounded-2xl shadow-2xl bg-white">

        <h1 className="text-2xl font-bold text-center text-zinc-800 mb-6">
          {isLogin ? "Iniciar sesión" : "Crear cuenta"}
        </h1>

        <div className="flex mb-6 border border-zinc-300 rounded-lg overflow-hidden">
          <button
            type="button"
            className={`w-1/2 py-2 text-sm font-medium transition ${
              isLogin
                ? "bg-zinc-900 text-white"
                : "bg-white text-zinc-700 hover:bg-zinc-100"
            }`}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>

          <button
            type="button"
            className={`w-1/2 py-2 text-sm font-medium transition ${
              !isLogin
                ? "bg-zinc-900 text-white"
                : "bg-white text-zinc-700 hover:bg-zinc-100"
            }`}
            onClick={() => setIsLogin(false)}
          >
            Register
          </button>
        </div>

        <form onSubmit={handleAuth} className="flex flex-col gap-4">

          {!isLogin && (
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-zinc-700">
                Nombre completo
              </label>
              <input
                type="text"
                placeholder="Ej: Juan Pérez"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="border border-zinc-300 rounded-lg px-3 py-2 text-zinc-800 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900"
              />
            </div>
          )}

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-zinc-700">
              Email
            </label>
            <input
              type="email"
              placeholder="ejemplo@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border border-zinc-300 rounded-lg px-3 py-2 text-zinc-800 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-zinc-700">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="border border-zinc-300 rounded-lg px-3 py-2 text-zinc-800 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900"
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}

          {success && (
            <p className="text-green-600 text-sm font-medium">
              {success}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="bg-zinc-900 text-white py-2 rounded-lg hover:bg-zinc-800 transition"
          >
            {loading
              ? "Cargando..."
              : isLogin
              ? "Iniciar sesión"
              : "Crear cuenta"}
          </button>
        </form>

        <div className="my-6 flex items-center">
          <div className="flex-grow h-px bg-zinc-300" />
          <span className="px-3 text-sm text-zinc-500">o</span>
          <div className="flex-grow h-px bg-zinc-300" />
        </div>

        <button
          onClick={loginWithGoogle}
          className="w-full flex items-center justify-center gap-3 border border-zinc-300 py-2 rounded-lg hover:bg-zinc-100 transition text-zinc-800 font-medium"
        >
          <FcGoogle size={20} />
          Continuar con Google
        </button>

      </div>
    </div>
  )
}