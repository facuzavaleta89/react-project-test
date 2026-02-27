"use client"

import { useState } from "react"
import { useCart } from "@/context/CartContext"

export default function ProductCard({ product, isAdmin, onEdit, onDelete }) {
    const { addToCart } = useCart()
    const [deleting, setDeleting] = useState(false)
    const [imgError, setImgError] = useState(false)

    const handleDelete = async () => {
        if (!confirm(`¿Estás seguro de eliminar "${product.name}"?`)) return
        setDeleting(true)
        await onDelete(product.id)
        setDeleting(false)
    }

    const stars = Math.round(product.valoration ?? 0)

    return (
        <div className="border border-gray-200 dark:border-zinc-800 rounded-lg overflow-hidden bg-white dark:bg-zinc-900 shadow-sm hover:shadow-md transition-shadow flex flex-col">
            <div className="relative h-48 bg-gray-100 dark:bg-zinc-800 flex items-center justify-center">
                {product.image && !imgError ? (
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                        onError={() => setImgError(true)}
                    />
                ) : (
                    <span className="text-gray-400 dark:text-gray-500">Sin imagen</span>
                )}
                {isAdmin && (
                    <div className="absolute top-2 right-2 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">
                        Admin
                    </div>
                )}
            </div>

            <div className="p-4 flex flex-col flex-1 gap-2">
                <h3 className="font-semibold text-lg text-gray-900 dark:text-zinc-100 leading-tight">
                    {product.name}
                </h3>

                <p className="text-sm text-gray-600 dark:text-zinc-400 line-clamp-2">
                    {product.description || "Sin descripción disponible."}
                </p>

                <div className="flex items-center gap-1 mt-auto">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <span
                            key={i}
                            className={`text-sm ${i < stars ? "text-yellow-400" : "text-gray-300 dark:text-zinc-700"
                                }`}
                        >
                            ★
                        </span>
                    ))}
                    <span className="text-xs text-gray-500 dark:text-zinc-400 ml-1">
                        ({product.valoration ?? 0})
                    </span>
                </div>

                <div className="flex items-center justify-between border-t border-gray-100 dark:border-zinc-800 pt-3 mt-2">
                    <span className="font-bold text-gray-900 dark:text-zinc-100 text-xl">
                        ${Number(product.price).toLocaleString("es-AR", { minimumFractionDigits: 2 })}
                    </span>

                    <button
                        onClick={() => addToCart(product)}
                        className="text-sm px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded transition-colors shadow-sm"
                    >
                        Añadir
                    </button>
                </div>

                {isAdmin && (
                    <div className="flex gap-2 border-t border-gray-100 dark:border-zinc-800 pt-3 mt-3">
                        <button
                            onClick={() => onEdit(product)}
                            className="flex-1 text-sm px-3 py-1 bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700 text-gray-700 dark:text-zinc-300 rounded transition-colors"
                        >
                            Editar
                        </button>
                        <button
                            onClick={handleDelete}
                            disabled={deleting}
                            className="flex-1 text-sm px-3 py-1 bg-red-100 dark:bg-red-900/30 hover:bg-red-200 dark:hover:bg-red-900/50 text-red-700 dark:text-red-400 rounded transition-colors disabled:opacity-50"
                        >
                            {deleting ? "..." : "Eliminar"}
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}
