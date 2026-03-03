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
