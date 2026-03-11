"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

const SearchBox = () => {
    const [searchQuery, setSearchQuery] = useState("")
    const router = useRouter()

    const handleSearch = (e) => {
        e.preventDefault()
        if (searchQuery.trim()) {
            router.push(`/productos?search=${encodeURIComponent(searchQuery)}`)
        }
    }

    return (
        <section className="bg-linear-to-br from-blue-600 via-blue-500 to-indigo-600 py-12 px-6 rounded-2xl shadow-lg">
            <div className="max-w-2xl mx-auto">
                <h3 className="text-2xl font-bold text-white mb-2 text-center">
                    Encuentra lo que buscas
                </h3>
                <p className="text-blue-100 text-center mb-6">
                    Buscá entre miles de productos disponibles
                </p>

                <form onSubmit={handleSearch} className="flex gap-3">
                    <div className="relative flex-1">
                        <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-blue-300">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="11" cy="11" r="8" />
                                <line x1="21" y1="21" x2="16.65" y2="16.65" />
                            </svg>
                        </span>
                        <input
                            type="text"
                            placeholder="Ej: zapatillas, camisetas, accesorios..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-11 pr-4 py-3.5 bg-white text-gray-900 rounded-xl placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-500 transition-all shadow-md"
                        />
                    </div>
                    <button
                        type="submit"
                        className="px-6 py-3.5 bg-white text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-colors shadow-md hover:shadow-lg whitespace-nowrap"
                    >
                        Buscar
                    </button>
                </form>
            </div>
        </section>
    )
}

export default SearchBox
