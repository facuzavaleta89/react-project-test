"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchSection() {
    // State for filters
    const [searchTerm, setSearchTerm] = useState("");
    const [category, setCategory] = useState("");
    const router = useRouter();

    const categories = [
        "Moda",
        "Electrónica",
        "Salud y Cuidado Personal",
        "Hogar, Muebles y Decoración",
        "Alimentos y Bebidas",
        "Deportes",
        "Juguetes",
        "Servicios Digitales"
    ];

    const handleSearch = (e) => {
        if (e) e.preventDefault();

        // Construir la URL con parámetros
        const params = new URLSearchParams();
        if (searchTerm) params.set("search", searchTerm);
        if (category) params.set("category", category);

        const queryString = params.toString();
        const url = `/productos${queryString ? `?${queryString}` : ""}`;

        router.push(url);
    };

    return (
        <section id="search" className="py-12 mt-8 border-t border-zinc-200 dark:border-zinc-800/80">
            <div className="mb-8">
                <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">Explorar Catálogo</h2>
                <p className="mt-2 text-zinc-600 dark:text-zinc-400">Encuentra rápidamente lo que buscas y accede a nuestro catálogo completo.</p>
            </div>

            {/* Formulario de Búsqueda */}
            <form
                onSubmit={handleSearch}
                className="grid grid-cols-1 md:grid-cols-12 gap-4 p-6 bg-white dark:bg-zinc-900 shadow-sm rounded-3xl border border-zinc-200/50 dark:border-zinc-800/50 mb-10 transition-colors items-end"
            >

                {/* Filtro por Nombre */}
                <div className="md:col-span-5">
                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                        Nombre del Producto
                    </label>
                    <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-400">
                            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </span>
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Zapatillas, Auriculares..."
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-all placeholder:text-zinc-400 outline-none"
                        />
                    </div>
                </div>

                {/* Filtro por Categoría */}
                <div className="md:col-span-4">
                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                        Categoría
                    </label>
                    <div className="relative">
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full px-4 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-all outline-none appearance-none cursor-pointer"
                        >
                            <option value="">Todas las categorías</option>
                            {categories.map((cat) => (
                                <option key={cat} value={cat}>
                                    {cat}
                                </option>
                            ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-zinc-500">
                            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Botón de Acción */}
                <div className="md:col-span-3">
                    <button
                        type="submit"
                        className="w-full bg-violet-600 hover:bg-violet-700 text-white font-semibold py-2.5 px-4 rounded-xl shadow-md hover:shadow-lg focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 dark:focus:ring-offset-zinc-900 transition-all flex items-center justify-center gap-2"
                    >
                        <span>Buscar en Catálogo</span>
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </button>
                </div>
            </form>
            {/*
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 opacity-40 pointer-events-none grayscale">
                <div className="h-40 bg-zinc-200 dark:bg-zinc-800 rounded-2xl animate-pulse"></div>
                <div className="h-40 bg-zinc-200 dark:bg-zinc-800 rounded-2xl animate-pulse delay-75"></div>
                <div className="h-40 bg-zinc-200 dark:bg-zinc-800 rounded-2xl animate-pulse delay-150"></div>
                <div className="h-40 bg-zinc-200 dark:bg-zinc-800 rounded-2xl animate-pulse delay-300"></div>
            </div>*/}
        </section>

    );
}
