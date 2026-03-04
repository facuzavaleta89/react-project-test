"use client"

import { useState } from "react"
import { FaPlus, FaTimes, FaCheck } from "react-icons/fa"

export default function CategoryManager({
    categories,
    selectedCategory,
    onSelect,
    isAdmin,
    onAdd,
    onDelete,
}) {
    const [isAdding, setIsAdding] = useState(false)
    const [newCategoryName, setNewCategoryName] = useState("")

    const handleAddSubmit = async (e) => {
        e.preventDefault()
        const trimmed = newCategoryName.trim()
        if (!trimmed) return

        await onAdd(trimmed)
        setNewCategoryName("")
        setIsAdding(false)
    }

    const handleKeyDown = (e) => {
        if (e.key === "Escape") {
            setIsAdding(false)
            setNewCategoryName("")
        }
    }

    return (
        <div className="mb-6 flex flex-wrap items-center gap-2">
            <span className="text-sm font-medium text-gray-500 dark:text-zinc-400 mr-2">
                Categorías:
            </span>

            {/* Pill: Todas */}
            <button
                onClick={() => onSelect(null)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${selectedCategory === null
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
                    }`}
            >
                Todas
            </button>

            {/* Existenes */}
            {categories.map((cat) => (
                <div
                    key={cat.id}
                    className={`group flex items-center rounded-full text-sm font-medium transition-colors border ${selectedCategory === cat.id
                        ? "bg-blue-600 border-blue-600 text-white"
                        : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50 dark:bg-zinc-900 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
                        }`}
                >
                    <button
                        onClick={() => onSelect(cat.id)}
                        className="px-3 py-1.5 rounded-l-full focus:outline-none"
                    >
                        {cat.name}
                    </button>
                    {isAdmin && (
                        <button
                            onClick={() => onDelete(cat.id, cat.name)}
                            className={`pr-3 pl-1 py-1.5 rounded-r-full flex items-center focus:outline-none transition-colors ${selectedCategory === cat.id
                                ? "text-blue-200 hover:text-white"
                                : "text-gray-400 hover:text-red-500 dark:text-zinc-500 dark:hover:text-red-400"
                                } opacity-0 group-hover:opacity-100 focus:opacity-100`}
                            title="Eliminar categoría"
                        >
                            <FaTimes size={12} />
                        </button>
                    )}
                </div>
            ))}

            {/* Botón / Input de + Categoría (Solo Admin) */}
            {isAdmin && (
                <div className="ml-2 flex items-center">
                    {isAdding ? (
                        <form
                            onSubmit={handleAddSubmit}
                            className="flex items-center gap-1 bg-white dark:bg-zinc-900 border border-blue-300 dark:border-blue-700 rounded-full pl-3 pr-1 py-1 shadow-sm"
                        >
                            <input
                                type="text"
                                value={newCategoryName}
                                onChange={(e) => setNewCategoryName(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Nombre..."
                                className="bg-transparent text-sm w-24 sm:w-32 focus:outline-none dark:text-white"
                                autoFocus
                            />
                            <button
                                type="submit"
                                disabled={!newCategoryName.trim()}
                                className="p-1.5 text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/30 rounded-full transition-colors disabled:opacity-50"
                            >
                                <FaCheck size={12} />
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    setIsAdding(false)
                                    setNewCategoryName("")
                                }}
                                className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-zinc-800 rounded-full transition-colors"
                            >
                                <FaTimes size={12} />
                            </button>
                        </form>
                    ) : (
                        <button
                            onClick={() => setIsAdding(true)}
                            className="flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium border border-dashed border-gray-300 text-gray-500 hover:border-gray-400 hover:text-gray-700 dark:border-zinc-700 dark:text-zinc-400 dark:hover:border-zinc-500 dark:hover:text-zinc-300 transition-colors"
                        >
                            <FaPlus size={10} />
                            <span>Categoría</span>
                        </button>
                    )}
                </div>
            )}
        </div>
    )
}
