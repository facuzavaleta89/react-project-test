"use client"

import Link from "next/link"
import AuthStatus from "./AuthStatus"
import { useCart } from "@/context/CartContext"
import { useTheme } from "@/context/ThemeContext"
import { useState, useEffect } from "react"

const Navbar = () => {
  const { cartCount } = useCart()
  const { theme, toggleTheme } = useTheme()
  const [menuOpen, setMenuOpen] = useState(false)

  // Close menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false)
    }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  const navLinks = [
    { href: "/", label: "Inicio" },
    { href: "/productos", label: "Productos" },
    { href: "/carrito", label: "Carrito", badge: cartCount > 0 ? cartCount : null },
  ]

  return (
    <>
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
        <div className="px-5 sm:px-8 md:px-12 py-4 flex items-center justify-between">

          {/* Logo */}
          <Link
            href="/"
            onClick={closeMenu}
            className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white hover:text-zinc-600 dark:hover:text-zinc-200 transition flex-shrink-0"
          >
            E-Commerce
          </Link>

          {/* Centro – solo desktop */}
          <div className="hidden md:flex gap-10 text-zinc-800 dark:text-white font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-zinc-500 dark:hover:text-zinc-200 transition flex items-center gap-1"
              >
                {link.label}
                {link.badge && (
                  <span className="bg-blue-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full ml-1 min-w-[18px] text-center">
                    {link.badge}
                  </span>
                )}
              </Link>
            ))}
          </div>

          {/* Derecha – desktop */}
          <div className="hidden md:flex items-center gap-4 text-zinc-800 dark:text-white font-medium">
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-zinc-100 dark:bg-white/10 hover:bg-zinc-200 dark:hover:bg-white/20 transition-colors border border-zinc-200 dark:border-white/20 flex items-center justify-center text-zinc-900 dark:text-white"
              title={theme === "light" ? "Cambiar a modo oscuro" : "Cambiar a modo claro"}
            >
              {theme === "light" ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                  <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </svg>
              )}
            </button>

            <div className="h-6 w-px bg-zinc-300 dark:bg-white/20 transition-colors" />
            <AuthStatus />
          </div>

          {/* Mobile – right side: theme + cart badge + hamburger */}
          <div className="flex md:hidden items-center gap-2">
            {/* Theme toggle mobile */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-zinc-100 dark:bg-white/10 hover:bg-zinc-200 dark:hover:bg-white/20 transition-colors border border-zinc-200 dark:border-white/20 text-zinc-900 dark:text-white"
              title={theme === "light" ? "Modo oscuro" : "Modo claro"}
            >
              {theme === "light" ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                  <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
                </svg>
              )}
            </button>

            {/* Cart icon with badge */}
            <Link
              href="/carrito"
              onClick={closeMenu}
              className="relative p-2 text-zinc-800 dark:text-white"
              aria-label="Carrito"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 01-8 0" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-blue-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full min-w-[17px] text-center leading-none">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
              className="p-2 rounded-md text-zinc-800 dark:text-white hover:bg-zinc-100 dark:hover:bg-white/10 transition-colors"
            >
              <svg
                width="22" height="22" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              >
                {menuOpen ? (
                  <>
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </>
                ) : (
                  <>
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="3" y1="18" x2="21" y2="18" />
                  </>
                )}
              </svg>
            </button>
          </div>

        </div>
      </nav>

      {/* Mobile drawer overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}

      {/* Mobile drawer */}
      <div
        className={`
          fixed top-0 right-0 z-50 h-full w-72 max-w-[85vw]
          bg-white dark:bg-zinc-900
          border-l border-zinc-200 dark:border-zinc-800
          shadow-2xl
          transform transition-transform duration-300 ease-in-out
          md:hidden
          ${menuOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-200 dark:border-zinc-800">
          <span className="text-lg font-bold text-zinc-900 dark:text-white">Menú</span>
          <button
            onClick={closeMenu}
            className="p-1.5 rounded-md text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            aria-label="Cerrar menú"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex flex-col px-3 py-4 gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={closeMenu}
              className="flex items-center justify-between px-4 py-3 rounded-lg text-zinc-800 dark:text-zinc-100 font-medium hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-base"
            >
              <span>{link.label}</span>
              {link.badge && (
                <span className="bg-blue-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  {link.badge}
                </span>
              )}
            </Link>
          ))}
        </nav>

        {/* Divider */}
        <div className="mx-5 h-px bg-zinc-200 dark:bg-zinc-800" />

        {/* Auth section */}
        <div className="px-5 py-5">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-3">
            Cuenta
          </p>
          <AuthStatus enableToast={false} />
        </div>
      </div>
    </>
  )
}

export default Navbar