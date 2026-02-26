"use client"

import Link from "next/link"
import AuthStatus from "./AuthStatus"

const Navbar = () => {
  return (
    <nav
      className="
        fixed top-0 left-0 w-full z-50
        backdrop-blur-xl
        bg-white/10
        border-b border-white/20
        shadow-sm
      "
    >
      <div className="px-12 py-4 flex items-center justify-between">

        {/* IZQUIERDA */}
        <div>
          <Link
            href="/"
            className="text-2xl font-bold text-white hover:text-zinc-200 transition"
          >
            E-Commerce
          </Link>
        </div>

        {/* CENTRO */}
        <div className="flex gap-10 text-white font-medium">
          <Link
            href="/"
            className="hover:text-zinc-200 transition"
          >
            Inicio
          </Link>

          <Link
            href="/productos"
            className="hover:text-zinc-200 transition"
          >
            Productos
          </Link>

          <Link
            href="/carrito"
            className="hover:text-zinc-200 transition"
          >
            Carrito
          </Link>
        </div>

        {/* DERECHA */}
        <div className="flex items-center text-white">
          <AuthStatus />
        </div>

      </div>
    </nav>
  )
}

export default Navbar