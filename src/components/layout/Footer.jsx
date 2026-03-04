<<<<<<< HEAD
import React from 'react';
import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-white dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800/80 transition-colors">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">

                    {/* Brand Section */}
                    <div className="md:col-span-1">
                        <Link href="/" className="flex items-center gap-2 group">
                            <div className="w-10 h-10 bg-violet-600 rounded-xl flex items-center justify-center text-white shadow-lg group-hover:bg-violet-700 transition-all">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                </svg>
                            </div>
                            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-zinc-900 to-zinc-600 dark:from-zinc-50 dark:to-zinc-400">
                                E-Shop
                            </span>
                        </Link>
                        <p className="mt-4 text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                            La mejor experiencia de compra online con los productos más exclusivos y envíos a todo el país.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50 uppercase tracking-wider mb-4">Tienda</h3>
                        <ul className="space-y-3">
                            <li><Link href="/productos" className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors">Todos los Productos</Link></li>
                            <li><Link href="/productos?category=Moda" className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors">Moda</Link></li>
                            <li><Link href="/productos?category=Electrónica" className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors">Electrónica</Link></li>
                            <li><Link href="/productos?category=Deportes" className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors">Deportes</Link></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50 uppercase tracking-wider mb-4">Soporte</h3>
                        <ul className="space-y-3">
                            <li><Link href="/contacto" className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors">Contacto</Link></li>
                            <li><Link href="#" className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors">Preguntas Frecuentes</Link></li>
                            <li><Link href="#" className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors">Envíos y devoluciones</Link></li>
                        </ul>
                    </div>

                    {/* Social/Newsletter */}
                    <div>
                        <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50 uppercase tracking-wider mb-4">Síguenos</h3>
                        <div className="flex gap-4">
                            <a href="#" className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center text-zinc-600 dark:text-zinc-400 hover:bg-violet-600 hover:text-white dark:hover:bg-violet-600 transition-all shadow-sm">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" /></svg>
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center text-zinc-600 dark:text-zinc-400 hover:bg-violet-600 hover:text-white dark:hover:bg-violet-600 transition-all shadow-sm">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-zinc-200 dark:border-zinc-800 text-center">
                    <p className="text-sm text-zinc-500 dark:text-zinc-500">
                        &copy; {new Date().getFullYear()} E-Shop. Todos los derechos reservados.
                    </p>
                </div>
            </div>
        </footer>
    );
}
=======
"use client"

import Link from "next/link"

const Footer = () => {
    const year = new Date().getFullYear()

    return (
        <footer className="
      mt-16
      bg-zinc-900 dark:bg-zinc-950
      text-zinc-400
      border-t border-zinc-800 dark:border-zinc-800
    ">
            {/* Main grid */}
            <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

                {/* Brand */}
                <div className="flex flex-col gap-4">
                    <Link
                        href="/"
                        className="text-white text-2xl font-bold tracking-tight hover:text-zinc-300 transition-colors"
                    >
                        E‑Commerce
                    </Link>
                    <p className="text-sm leading-relaxed">
                        Tu destino de compras online. Encontrá los mejores productos al mejor precio con envío rápido y seguro.
                    </p>

                    {/* Social icons */}
                    <div className="flex gap-3 mt-2">
                        {/* Twitter / X */}
                        <a
                            href="#"
                            aria-label="Twitter"
                            className="w-9 h-9 flex items-center justify-center rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-all duration-200"
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.259 5.629L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
                            </svg>
                        </a>

                        {/* Instagram */}
                        <a
                            href="#"
                            aria-label="Instagram"
                            className="w-9 h-9 flex items-center justify-center rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-all duration-200"
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                                <circle cx="12" cy="12" r="4" />
                                <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
                            </svg>
                        </a>

                        {/* Facebook */}
                        <a
                            href="#"
                            aria-label="Facebook"
                            className="w-9 h-9 flex items-center justify-center rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-all duration-200"
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                            </svg>
                        </a>
                    </div>
                </div>

                {/* Navegación */}
                <div>
                    <h3 className="text-white text-sm font-semibold uppercase tracking-wider mb-5">
                        Tienda
                    </h3>
                    <ul className="space-y-3 text-sm">
                        <li>
                            <Link href="/" className="hover:text-white transition-colors duration-150">
                                Inicio
                            </Link>
                        </li>
                        <li>
                            <Link href="/productos" className="hover:text-white transition-colors duration-150">
                                Productos
                            </Link>
                        </li>
                        <li>
                            <Link href="/carrito" className="hover:text-white transition-colors duration-150">
                                Carrito
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Cuenta */}
                <div>
                    <h3 className="text-white text-sm font-semibold uppercase tracking-wider mb-5">
                        Mi Cuenta
                    </h3>
                    <ul className="space-y-3 text-sm">
                        <li>
                            <Link href="/mi-cuenta" className="hover:text-white transition-colors duration-150">
                                Perfil
                            </Link>
                        </li>
                        <li>
                            <Link href="/carrito" className="hover:text-white transition-colors duration-150">
                                Mis pedidos
                            </Link>
                        </li>
                        <li>
                            <Link href="/contacto" className="hover:text-white transition-colors duration-150">
                                Contacto
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Métodos de pago */}
                <div>
                    <h3 className="text-white text-sm font-semibold uppercase tracking-wider mb-5">
                        Medios de pago
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {["Visa", "MasterCard", "Amex", "PayPal", "Stripe"].map((brand) => (
                            <span
                                key={brand}
                                className="px-3 py-1.5 rounded-md bg-zinc-800 text-zinc-300 text-xs font-medium border border-zinc-700"
                            >
                                {brand}
                            </span>
                        ))}
                    </div>

                    <div className="mt-6">
                        <h4 className="text-white text-xs font-semibold uppercase tracking-wider mb-3">
                            Compra segura
                        </h4>
                        <div className="flex items-center gap-2 text-xs">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-500 flex-shrink-0" aria-hidden="true">
                                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                            </svg>
                            <span>Pagos encriptados SSL</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs mt-2">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-500 flex-shrink-0" aria-hidden="true">
                                <polyline points="20 6 9 17 4 12" />
                            </svg>
                            <span>Devoluciones sin cargo por 30 días</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Divider + bottom bar */}
            <div className="border-t border-zinc-800">
                <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-500">
                    <span>© {year} E‑Commerce. Todos los derechos reservados.</span>
                    <div className="flex gap-5">
                        <Link href="/politica-privacidad" className="hover:text-zinc-300 transition-colors duration-150">
                            Política de privacidad
                        </Link>
                        <Link href="/terminos" className="hover:text-zinc-300 transition-colors duration-150">
                            Términos y condiciones
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
>>>>>>> main
