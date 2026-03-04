<<<<<<< HEAD
import React from 'react';

export default function Hero() {
    return (
        <section className="relative w-full rounded-3xl overflow-hidden bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 px-6 py-24 sm:py-32 lg:px-8 mb-12 shadow-2xl">
            <div className="absolute inset-0 bg-black/10 mix-blend-multiply"></div>
            <div className="relative flex flex-col items-center justify-center text-center z-10">
                <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white mb-6 drop-shadow-md">
                    Todo lo que necesitas, <br className="hidden sm:block" /> a un clic de distancia.
                </h1>
                <p className="mt-4 text-lg sm:text-xl text-white/90 max-w-2xl font-medium drop-shadow-sm">
                    Descubre los mejores productos con la calidad que mereces y envíos a todo el país.
                </p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                    <a href="#products" className="rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-indigo-600 shadow-lg hover:bg-zinc-50 hover:scale-105 transition-transform duration-300">
                        Ver Productos Destacados
                    </a>
                </div>
            </div>
        </section>
    );
}
=======
import Link from "next/link"

const Hero = () => {
    return (
        <section className="bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 py-20 sm:py-28 px-6">
            <div className="max-w-3xl mx-auto text-center">

                <span className="inline-block text-xs font-semibold uppercase tracking-widest text-zinc-400 mb-4">
                    Tu tienda de confianza
                </span>

                <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight mb-6">
                    Los mejores productos, <br className="hidden sm:block" />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">
                        al mejor precio
                    </span>
                </h2>

                <p className="text-zinc-400 text-lg sm:text-xl mb-10 max-w-xl mx-auto leading-relaxed">
                    Explorá nuestro catálogo y encontrá lo que necesitás con envío rápido y pago seguro.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <Link
                        href="/productos"
                        className="w-full sm:w-auto px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors shadow-lg shadow-blue-900/30 text-center"
                    >
                        Ver productos
                    </Link>
                    <Link
                        href="/contacto"
                        className="w-full sm:w-auto px-8 py-3.5 border border-zinc-600 hover:border-zinc-400 text-zinc-300 hover:text-white font-semibold rounded-xl transition-colors text-center"
                    >
                        Contactanos
                    </Link>
                </div>

            </div>
        </section>
    )
}

export default Hero
>>>>>>> main
