"use client"

import { useCart } from "@/context/CartContext"
import Link from "next/link"

export default function CarritoPage() {
    const { cart, updateQuantity, removeFromCart, clearCart, cartTotal } = useCart()

    if (cart.length === 0) {
        return (
            <div className="min-h-[calc(100vh-80px)] bg-[#fafafa] dark:bg-zinc-950 flex flex-col items-center justify-center p-4 transition-colors">
                <svg
                    className="w-16 h-16 text-gray-400 dark:text-zinc-600 mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-zinc-50 mb-2 tracking-tight">
                    Tu carrito está vacío
                </h2>
                <p className="text-gray-500 dark:text-zinc-400 mb-8 max-w-sm text-center">
                    Parece que todavía no agregaste ningún producto al carrito.
                </p>
                <Link
                    href="/productos"
                    className="bg-blue-600 text-white px-8 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors shadow-sm"
                >
                    Ver productos
                </Link>
            </div>
        )
    }

    return (
        <div className="min-h-[calc(100vh-80px)] bg-[#fafafa] dark:bg-zinc-950 py-8 px-4 sm:px-6 lg:px-8 transition-colors">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-zinc-50 mb-8 tracking-tight">Tu Carrito</h1>

                <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-sm border border-gray-200 dark:border-zinc-800 overflow-hidden transition-colors">
                    <ul className="divide-y divide-gray-200 dark:divide-zinc-800">
                        {cart.map((item) => (
                            <li key={item.id} className="p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-100 dark:bg-zinc-800 rounded-md overflow-hidden flex-shrink-0 border border-gray-200 dark:border-zinc-700">
                                    {item.image ? (
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-400 dark:text-zinc-500 text-xs">
                                            Sin imagen
                                        </div>
                                    )}
                                </div>

                                <div className="flex-1 min-w-0 w-full sm:w-auto">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-zinc-100 truncate">
                                        <Link href={`/productos/${item.id}`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                            {item.name}
                                        </Link>
                                    </h3>
                                    <p className="text-xl font-bold text-gray-900 dark:text-zinc-50 mt-1">
                                        ${Number(item.price).toLocaleString("es-AR", { minimumFractionDigits: 2 })}
                                    </p>
                                </div>

                                <div className="flex w-full sm:w-auto items-center justify-between sm:justify-end gap-4 sm:gap-6 mt-2 sm:mt-0">
                                    <div className="flex items-center border border-gray-300 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-950 overflow-hidden">
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                            className="w-10 h-10 flex items-center justify-center text-gray-600 dark:text-zinc-400 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors disabled:opacity-50"
                                            disabled={item.quantity <= 1}
                                            aria-label="Disminuir cantidad"
                                        >
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                                        </button>
                                        <span className="w-12 text-center font-medium text-gray-900 dark:text-zinc-100 border-x border-gray-300 dark:border-zinc-700 h-10 flex items-center justify-center">
                                            {item.quantity}
                                        </span>
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            className="w-10 h-10 flex items-center justify-center text-gray-600 dark:text-zinc-400 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
                                            aria-label="Aumentar cantidad"
                                        >
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                                        </button>
                                    </div>

                                    <button
                                        onClick={() => removeFromCart(item.id)}
                                        className="p-2 text-gray-400 hover:text-red-500 dark:text-zinc-500 dark:hover:text-red-400 transition-colors rounded-md hover:bg-red-50 dark:hover:bg-red-900/20"
                                        title="Eliminar producto"
                                        aria-label="Eliminar producto"
                                    >
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="mt-8 bg-white dark:bg-zinc-900 p-6 sm:p-8 rounded-lg shadow-sm border border-gray-200 dark:border-zinc-800 transition-colors">
                    <div className="flex justify-between items-end mb-6 pb-6 border-b border-gray-200 dark:border-zinc-800">
                        <span className="text-gray-600 dark:text-zinc-400 font-medium text-lg">Subtotal</span>
                        <span className="text-3xl font-bold text-gray-900 dark:text-zinc-50 tracking-tight">
                            ${Number(cartTotal).toLocaleString("es-AR", { minimumFractionDigits: 2 })}
                        </span>
                    </div>

                    <div className="flex flex-col-reverse sm:flex-row gap-4 justify-between">
                        <button
                            onClick={clearCart}
                            className="px-6 py-3 border border-gray-300 dark:border-zinc-700 text-gray-700 dark:text-zinc-300 rounded-md font-medium hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors w-full sm:w-auto"
                        >
                            Vaciar carrito
                        </button>
                        <button
                            className="px-8 py-3 bg-blue-600 text-white rounded-md font-bold hover:bg-blue-700 transition-colors shadow-sm w-full sm:w-auto"
                            onClick={() => alert("Función de checkout configurada pronto.")}
                        >
                            Finalizar compra
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}