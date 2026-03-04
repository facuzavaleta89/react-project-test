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
