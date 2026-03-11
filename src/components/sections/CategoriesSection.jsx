"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabaseClient"

const CategoriesSection = () => {
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(true)
    const [showAll, setShowAll] = useState(false)
    const router = useRouter()
    const CATEGORIES_LIMIT = 8

    // Cargar categorías
    useEffect(() => {
        const fetchCategories = async () => {
            setLoading(true)
            const { data, error } = await supabase
                .from("categories")
                .select("*")
                .order("name", { ascending: true })
            if (!error) {
                setCategories(data ?? [])
            }
            setLoading(false)
        }

        fetchCategories()

        // Suscribir a cambios en tiempo real
        const subscription = supabase
            .channel("categories_changes")
            .on(
                "postgres_changes",
                { event: "*", schema: "public", table: "categories" },
                (payload) => {
                    fetchCategories()
                }
            )
            .subscribe()

        return () => {
            subscription.unsubscribe()
        }
    }, [])

    const handleCategoryClick = (categoryId) => {
        router.push(`/productos?category=${categoryId}`)
    }

    if (loading) {
        return (
            <section className="py-12 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="animate-pulse flex justify-center items-center h-32">
                        <div className="rounded-full h-8 w-8 bg-linear-to-r from-blue-400 to-blue-600 opacity-50"></div>
                    </div>
                </div>
            </section>
        )
    }

    if (categories.length === 0) {
        return null
    }

    return (
        <section className="py-12 px-6">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 text-center">
                    Explora nuestras categorías
                </h2>
                <p className="text-gray-600 dark:text-zinc-400 text-center mb-8 max-w-2xl mx-auto">
                    Encuentra exactamente lo que buscas navegando entre nuestras categorías disponibles
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {(showAll ? categories : categories.slice(0, CATEGORIES_LIMIT)).map((category) => (
                        <button
                            key={category.id}
                            onClick={() => handleCategoryClick(category.id)}
                            className="group relative overflow-hidden rounded-xl p-6 bg-linear-to-br from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                        >
                            {/* Efecto de fondo */}
                            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>

                            {/* Contenido */}
                            <div className="relative z-10 flex flex-col items-center justify-center min-h-24 gap-3">
                                <div className="w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                                    <svg
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M6 9l6-6 6 6M3 15l9-9 9 9M4 15h16v7a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-7z" />
                                    </svg>
                                </div>
                                <span className="text-lg font-semibold text-center line-clamp-2">
                                    {category.name}
                                </span>
                            </div>

                            {/* Indicador de hover */}
                            <div className="absolute inset-0 rounded-xl border-2 border-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                        </button>
                    ))}
                </div>

                {categories.length > CATEGORIES_LIMIT && (
                    <div className="flex justify-center mt-8">
                        <button
                            onClick={() => setShowAll(!showAll)}
                            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors shadow-md hover:shadow-lg"
                        >
                            {showAll ? "Mostrar menos" : "Ver más categorías"}
                        </button>
                    </div>
                )}
            </div>
        </section>
    )
}

export default CategoriesSection
