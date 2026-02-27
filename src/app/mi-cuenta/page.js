"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { useRouter } from "next/navigation"

export default function MiCuenta() {
  const [profile, setProfile] = useState(null)
  const [email, setEmail] = useState("")
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState(null)
  const router = useRouter()

  useEffect(() => {
    const getProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        router.push("/login")
        return
      }

      setEmail(user.email)

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single()

      if (error) {
        console.error(error)
        return
      }

      setProfile(data)
    }

    getProfile()
  }, [router])

  const showToast = (type, msg) => {
    setToast({ type, msg })
    setTimeout(() => setToast(null), 3500)
  }

  const handleSave = async (e) => {
    e.preventDefault()
    setSaving(true)

    const { error } = await supabase
      .from("profiles")
      .update({ full_name: profile.full_name })
      .eq("id", profile.id)

    setSaving(false)

    if (error) {
      console.error(error)
      showToast("error", "Error al actualizar la información.")
    } else {
      showToast("success", "Perfil actualizado correctamente.")
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push("/")
  }

  if (!profile) {
    return (
      <div className="min-h-[calc(100vh-80px)] bg-[#fafafa] dark:bg-zinc-950 flex justify-center items-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 dark:border-blue-500"></div>
      </div>
    )
  }

  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#fafafa] dark:bg-zinc-950 py-10 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-zinc-50 mb-8 tracking-tight">Mi Cuenta</h1>

        <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-sm border border-gray-200 dark:border-zinc-800 overflow-hidden transition-colors">
          {/* Header de la tarjeta */}
          <div className="p-6 sm:px-8 border-b border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-900/50 flex flex-col sm:flex-row items-center sm:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center font-bold text-2xl">
                {(profile.full_name || email)[0].toUpperCase()}
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-zinc-100">
                  {profile.full_name || "Usuario"}
                </h2>
                <p className="text-sm text-gray-500 dark:text-zinc-400">{email}</p>
              </div>
            </div>

            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${profile.role === 'admin'
              ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400'
              : 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
              }`}>
              {profile.role === 'admin' ? 'Administrador' : 'Usuario'}
            </span>
          </div>

          <form onSubmit={handleSave} className="p-6 sm:p-8 flex flex-col gap-6">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-2">
                Nombre Completo
              </label>
              <input
                id="fullName"
                type="text"
                className="w-full bg-white dark:bg-zinc-950 border border-gray-300 dark:border-zinc-700 rounded-md p-2.5 text-gray-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                value={profile.full_name || ""}
                onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
                placeholder="Ingresá tu nombre"
              />
            </div>

            <div className="pt-4 border-t border-gray-200 dark:border-zinc-800 flex justify-between items-center mt-2">
              <button
                type="button"
                onClick={handleLogout}
                className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 text-sm font-medium transition-colors"
              >
                Cerrar sesión
              </button>
              <button
                type="submit"
                disabled={saving}
                className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors shadow-sm disabled:opacity-70 flex items-center justify-center gap-2 min-w-[170px]"
              >
                {saving ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Guardando...
                  </>
                ) : (
                  "Guardar cambios"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Toast Notification */}
      {toast && (
        <div
          className={`fixed bottom-4 right-4 px-4 py-3 rounded-md shadow-lg flex items-center gap-3 text-sm font-medium border z-50 animate-bounce transition-colors ${toast.type === "success"
            ? "bg-green-50 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800"
            : "bg-red-50 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800"
            }`}
        >
          {toast.type === "success" ? "✓" : "✕"}
          {toast.msg}
        </div>
      )}
    </div>
  )
}