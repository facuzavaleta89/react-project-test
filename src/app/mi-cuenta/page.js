"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { useRouter } from "next/navigation"

export default function MiCuenta() {
  const [profile, setProfile] = useState(null)
  const [email, setEmail] = useState(null)
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

  if (!profile) return <p>Cargando...</p>

  return (
  <div>
    <h1>Mi Cuenta</h1>

    <label>Nombre:</label>
    <input
      value={profile.full_name || ""}
      onChange={(e) =>
        setProfile({ ...profile, full_name: e.target.value })
      }
    />

    <p><strong>Email:</strong> {email}</p>
    <p><strong>Rol:</strong> {profile.role}</p>

    <button
      onClick={async () => {
        const { error } = await supabase
          .from("profiles")
          .update({ full_name: profile.full_name })
          .eq("id", profile.id)

        if (error) {
          console.error(error)
          alert("Error al actualizar")
        } else {
          alert("Actualizado correctamente")
        }
      }}
    >
      Guardar cambios
    </button>
  </div>
)
}