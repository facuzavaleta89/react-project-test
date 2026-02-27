"use client"

import Link from "next/link"
import AuthStatus from "./AuthStatus"
import { useCart } from "@/context/CartContext"
import { useTheme } from "@/context/ThemeContext"

const Navbar = () => {
  const { cartCount } = useCart()
  const { theme, toggleTheme } = useTheme()

  return (
    <nav
      className="
        fixed top-0 left-0 w-full z-50
        backdrop-blur-xl
        bg-white/70 dark:bg-black/20
        border-b border-zinc-200 dark:border-white/10
        shadow-sm
        transition-colors
      "
    >
      <div className="px-12 py-4 flex items-center justify-between">

        {/* IZQUIERDA */}
        <div>
          <Link
            href="/"
            className="text-2xl font-bold text-zinc-900 dark:text-white hover:text-zinc-600 dark:hover:text-zinc-200 transition"
          >
            E-Commerce
          </Link>
        </div>

        {/* CENTRO */}
        <div className="flex gap-10 text-zinc-800 dark:text-white font-medium">
          <Link
            href="/"
            className="hover:text-zinc-500 dark:hover:text-zinc-200 transition"
          >
            Inicio
          </Link>

          <Link
            href="/productos"
            className="hover:text-zinc-500 dark:hover:text-zinc-200 transition"
          >
            Productos
          </Link>

          <Link
            href="/carrito"
            className="hover:text-zinc-500 dark:hover:text-zinc-200 transition flex items-center gap-1"
          >
            Carrito
            {cartCount > 0 && (
              <span className="bg-blue-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full ml-1 min-w-[18px] text-center">
                {cartCount}
              </span>
            )}
          </Link>
        </div>

        {/* DERECHA */}
        <div className="flex items-center gap-4 text-zinc-800 dark:text-white font-medium">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-zinc-100 dark:bg-white/10 hover:bg-zinc-200 dark:hover:bg-white/20 transition-colors border border-zinc-200 dark:border-white/20 flex items-center justify-center text-zinc-900 dark:text-white"
            title={theme === "light" ? "Cambiar a modo oscuro" : "Cambiar a modo claro"}
          >
            {theme === "light" ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
              </svg>
            )}
          </button>

          <div className="h-6 w-px bg-zinc-300 dark:bg-white/20 transition-colors"></div>

          <AuthStatus />
        </div>

      </div>
    </nav>
  )
}

export default Navbar