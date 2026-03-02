"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { supabase } from "@/lib/supabaseClient"
import { useCart } from "@/context/CartContext"

export default function ProductDetailPage() {
    const params = useParams()
    const router = useRouter()
    const { addToCart } = useCart()

    const productId = params?.id

    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [imgError, setImgError] = useState(false)
    const [adding, setAdding] = useState(false)

    useEffect(() => {
        if (!productId) return

        const fetchProduct = async () => {
            setLoading(true)
            const { data, error: fetchError } = await supabase
                .from("products")
                .select("*")
                .eq("id", productId)
                .single()

            if (fetchError || !data) {
                setError(true)
            } else {
                setProduct(data)
            }
            setLoading(false)
        }

        fetchProduct()
    }, [productId])

    const handleAddToCart = () => {
        if (!product) return
        setAdding(true)
        addToCart(product)
        setTimeout(() => setAdding(false), 800)
    }

    if (loading) {
        return (
            <div className="min-h-[calc(100vh-80px)] bg-[#fafafa] dark:bg-zinc-950 flex justify-center items-center py-24 transition-colors">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 dark:border-blue-500"></div>
            </div>
        )
    }

    if (error || !product) {
        return (
            <div className="min-h-[calc(100vh-80px)] bg-[#fafafa] dark:bg-zinc-950 text-gray-900 dark:text-zinc-100 py-16 px-4 transition-colors">
                <div className="max-w-3xl mx-auto text-center">
                    <h1 className="text-3xl font-bold mb-4">Producto no encontrado</h1>
                    <p className="text-gray-500 dark:text-zinc-400 mb-8">
                        El producto que estás buscando no existe o fue eliminado.
                    </p>
                    <button
                        onClick={() => router.push("/productos")}
                        className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors"
                    >
                        Volver al catálogo
                    </button>
                </div>
            </div>
        )
    }

    const stars = Math.round(product.valoration ?? 0)

    return (
        <div className="min-h-[calc(100vh-80px)] bg-[#fafafa] dark:bg-zinc-950 text-gray-900 dark:text-zinc-100 py-8 px-4 sm:px-6 lg:px-8 transition-colors">
            <div className="max-w-5xl mx-auto">
                {/* Back button */}
                <button
                    onClick={() => router.back()}
                    className="flex items-center text-gray-500 hover:text-blue-600 dark:text-zinc-400 dark:hover:text-blue-400 font-medium mb-8 transition-colors"
                >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Volver
                </button>

                <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-gray-200 dark:border-zinc-800 overflow-hidden transition-colors">
                    <div className="grid grid-cols-1 md:grid-cols-2">
                        {/* Image Section */}
                        <div className="relative flex-1 bg-gray-100 dark:bg-zinc-800 flex items-center justify-center border-b md:border-b-0 md:border-r border-gray-200 dark:border-zinc-800 aspect-square md:aspect-auto">
                            {product.image && !imgError ? (
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-cover"
                                    onError={() => setImgError(true)}
                                />
                            ) : (
                                <div className="text-gray-400 dark:text-zinc-500 flex flex-col items-center">
                                    <svg className="w-16 h-16 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    <span>Sin imagen disponible</span>
                                </div>
                            )}
                        </div>

                        {/* Info Section */}
                        <div className="p-8 md:p-12 flex flex-col justify-center">
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-zinc-50 tracking-tight mb-4">
                                {product.name}
                            </h1>

                            <div className="flex items-center gap-2 mb-6">
                                <div className="flex">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <span
                                            key={i}
                                            className={`text-lg ${i < stars ? "text-yellow-400" : "text-gray-300 dark:text-zinc-700"}`}
                                        >
                                            ★
                                        </span>
                                    ))}
                                </div>
                                <span className="text-sm font-medium text-gray-500 dark:text-zinc-400">
                                    ({product.valoration ?? 0} valoraciones)
                                </span>
                            </div>

                            <p className="text-gray-600 dark:text-zinc-300 text-lg leading-relaxed mb-8">
                                {product.description || "Este producto no tiene una descripción detallada por el momento."}
                            </p>

                            <div className="mt-auto pt-8 border-t border-gray-100 dark:border-zinc-800">
                                <span className="block text-sm font-medium text-gray-500 dark:text-zinc-400 mb-1">
                                    Precio
                                </span>
                                <div className="flex items-end gap-6 mb-8">
                                    <span className="text-4xl font-bold text-gray-900 dark:text-zinc-100">
                                        ${Number(product.price).toLocaleString("es-AR", { minimumFractionDigits: 2 })}
                                    </span>
                                </div>

                                <button
                                    onClick={handleAddToCart}
                                    disabled={adding}
                                    className={`w-full py-4 rounded-xl font-bold text-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-zinc-900 transition-all ${adding
                                            ? "bg-green-600 hover:bg-green-700 focus:ring-green-500 text-white"
                                            : "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 text-white"
                                        }`}
                                >
                                    {adding ? "¡Añadido al carrito!" : "Añadir al carrito"}
                                </button>

                                {/* Info extra about shipping/etc can go here */}
                                <div className="mt-6 flex flex-col gap-3 text-sm text-gray-500 dark:text-zinc-400">
                                    <div className="flex items-center gap-2">
                                        <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                                        </svg>
                                        Stock disponible garantizado.
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                        </svg>
                                        Pagos seguros con tarjetas de crédito y débito.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}