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
