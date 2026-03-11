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
  const [showPassword, setShowPassword] = useState(false)

  const handleAuth = async (e) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)
    setLoading(true)

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) throw error
        router.push("/")
      } else {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { full_name: fullName } },
        })

        if (error) throw error

        if (data?.user) {
          await supabase.from("profiles").insert([
            { id: data.user.id, full_name: fullName, role: "user" },
          ])
        }

        if (data?.session) {
          setSuccess("Cuenta creada exitosamente. Redirigiendo...")
          setTimeout(() => router.push("/"), 1500)
        } else {
          setSuccess("Cuenta creada. Revisá tu email para confirmar tu cuenta.")
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
      options: { redirectTo: "http://localhost:3000" },
    })
  }

  const inputClass =
    "w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2.5 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:border-transparent transition"

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-4 bg-[#fafafa] dark:bg-zinc-950 transition-colors">

      {/* Card */}
      <div className="w-full max-w-md">

        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
            {isLogin ? "Iniciar sesión" : "Crear cuenta"}
          </h1>
          <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
            {isLogin
              ? "Accedé a tu cuenta para continuar comprando."
              : "Creá tu cuenta para empezar a comprar."}
          </p>
        </div>

        {/* Panel */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xl p-8">

          {/* Tab switcher */}
          <div className="flex mb-7 bg-zinc-100 dark:bg-zinc-800 rounded-lg p-1">
            <button
              type="button"
              onClick={() => { setIsLogin(true); setError(null); setSuccess(null) }}
              className={`flex-1 py-2 text-sm font-medium rounded-md transition-all duration-200 ${isLogin
                  ? "bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white shadow-sm"
                  : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200"
                }`}
            >
              Iniciar sesión
            </button>
            <button
              type="button"
              onClick={() => { setIsLogin(false); setError(null); setSuccess(null) }}
              className={`flex-1 py-2 text-sm font-medium rounded-md transition-all duration-200 ${!isLogin
                  ? "bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white shadow-sm"
                  : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200"
                }`}
            >
              Registrarse
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleAuth} className="flex flex-col gap-4">

            {!isLogin && (
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                  Nombre completo
                </label>
                <input
                  type="text"
                  placeholder="Ej: Juan Pérez"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  className={inputClass}
                />
              </div>
            )}

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                Email
              </label>
              <input
                type="email"
                placeholder="ejemplo@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={inputClass}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                Contraseña
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className={`${inputClass} pr-10`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition"
                  tabIndex={-1}
                  aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                >
                  {showPassword ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Feedback */}
            {error && (
              <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/30 text-red-500 text-sm px-3 py-2.5 rounded-lg">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
                {error}
              </div>
            )}

            {success && (
              <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 text-sm px-3 py-2.5 rounded-lg">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0"><circle cx="12" cy="12" r="10" /><polyline points="9 12 11 14 15 10" /></svg>
                {success}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-1 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 py-2.5 rounded-lg font-semibold hover:bg-zinc-700 dark:hover:bg-zinc-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading
                ? "Procesando..."
                : isLogin
                  ? "Iniciar sesión"
                  : "Crear cuenta"}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <div className="grow h-px bg-zinc-200 dark:bg-zinc-700" />
            <span className="text-xs text-zinc-400 dark:text-zinc-500">o continuá con</span>
            <div className="grow h-px bg-zinc-200 dark:bg-zinc-700" />
          </div>

          {/* Google */}
          <button
            onClick={loginWithGoogle}
            className="w-full flex items-center justify-center gap-3 border border-zinc-200 dark:border-zinc-700 py-2.5 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800 transition text-zinc-800 dark:text-zinc-100 font-medium text-sm"
          >
            <FcGoogle size={20} />
            Google
          </button>

        </div>

        {/* Bottom note */}
        <p className="mt-6 text-center text-xs text-zinc-400 dark:text-zinc-500">
          Al continuar aceptás nuestros{" "}
          <a href="/terminos" className="underline hover:text-zinc-600 dark:hover:text-zinc-300 transition">Términos y condiciones</a>{" "}
          y{" "}
          <a href="/politica-privacidad" className="underline hover:text-zinc-600 dark:hover:text-zinc-300 transition">Política de privacidad</a>.
        </p>
      </div>
    </div>
  )
}