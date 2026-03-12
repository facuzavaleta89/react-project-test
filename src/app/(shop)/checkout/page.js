"use client"

import { useState } from "react"
import { useCart } from "@/context/CartContext"
import { useRouter } from "next/navigation"

export default function CheckoutPage() {
    const { cart, cartTotal } = useCart()
    const router = useRouter()

    const [formData, setFormData] = useState({
        email: "",
        firstName: "",
        lastName: "",
        address: "",
        city: "",
        postalCode: "",
    })

    const [loadingPayment, setLoadingPayment] = useState(false)
    const [errorMsg, setErrorMsg] = useState("")

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleGeneratePayment = async (e) => {
        e.preventDefault()
        setLoadingPayment(true)
        setErrorMsg("")

        try {
            // Convert Cart items to MP format
            const items = cart.map(item => ({
                id: item.id.toString(),
                title: item.name,
                description: item.description || "Producto de la tienda",
                picture_url: item.image,
                category_id: "electronics", // Default category, can be changed
                quantity: item.quantity,
                currency_id: "ARS",
                unit_price: Number(item.price)
            }))

            const response = await fetch("/api/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ items })
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || "Error al conectar con Mercado Pago")
            }

            // Abrir nueva ventana con la URL del pago
            if (data.sandbox_init_point) {
                window.open(data.sandbox_init_point, "_blank", "width=800,height=600")
            } else {
                throw new Error("No se pudo obtener el link de pago.")
            }

        } catch (error) {
            console.error("Payment error:", error)
            setErrorMsg("Ocurrió un error al generar el pago. Por favor, intenta nuevamente.")
        } finally {
            setLoadingPayment(false)
        }
    }

    if (cart.length === 0) {
        return (
            <div className="min-h-[calc(100vh-80px)] bg-[#fafafa] dark:bg-zinc-950 flex flex-col items-center justify-center p-4 transition-colors">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-zinc-50 mb-4 tracking-tight">
                    Tu carrito está vacío
                </h2>
                <button
                    onClick={() => router.push("/productos")}
                    className="bg-blue-600 text-white px-8 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors shadow-sm"
                >
                    Volver a la tienda
                </button>
            </div>
        )
    }

    return (
        <div className="min-h-[calc(100vh-80px)] bg-[#fafafa] dark:bg-zinc-950 py-8 px-4 sm:px-6 lg:px-8 transition-colors">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-zinc-50 mb-8 tracking-tight">
                    Finalizar Compra
                </h1>

                <div className="flex flex-col lg:flex-row gap-8">

                    {/* LEFTSIDE: Form */}
                    <div className="flex-1 order-2 lg:order-1">
                        <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-sm border border-gray-200 dark:border-zinc-800 p-6 sm:p-8 transition-colors">
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-zinc-100 mb-6">
                                Información de Envío
                            </h2>

                            <form onSubmit={handleGeneratePayment} className="space-y-6">
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-1">
                                        Correo electrónico
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        disabled={loadingPayment}
                                        className="w-full px-4 py-2 bg-gray-50 dark:bg-zinc-950 border border-gray-300 dark:border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-gray-900 dark:text-zinc-100 disabled:opacity-50"
                                    />
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-1">
                                            Nombre
                                        </label>
                                        <input
                                            type="text"
                                            id="firstName"
                                            name="firstName"
                                            required
                                            value={formData.firstName}
                                            onChange={handleInputChange}
                                            disabled={loadingPayment}
                                            className="w-full px-4 py-2 bg-gray-50 dark:bg-zinc-950 border border-gray-300 dark:border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors text-gray-900 dark:text-zinc-100 disabled:opacity-50"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-1">
                                            Apellido
                                        </label>
                                        <input
                                            type="text"
                                            id="lastName"
                                            name="lastName"
                                            required
                                            value={formData.lastName}
                                            onChange={handleInputChange}
                                            disabled={loadingPayment}
                                            className="w-full px-4 py-2 bg-gray-50 dark:bg-zinc-950 border border-gray-300 dark:border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors text-gray-900 dark:text-zinc-100 disabled:opacity-50"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-1">
                                        Dirección
                                    </label>
                                    <input
                                        type="text"
                                        id="address"
                                        name="address"
                                        required
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        disabled={loadingPayment}
                                        className="w-full px-4 py-2 bg-gray-50 dark:bg-zinc-950 border border-gray-300 dark:border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors text-gray-900 dark:text-zinc-100 disabled:opacity-50"
                                    />
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="city" className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-1">
                                            Ciudad
                                        </label>
                                        <input
                                            type="text"
                                            id="city"
                                            name="city"
                                            required
                                            value={formData.city}
                                            onChange={handleInputChange}
                                            disabled={loadingPayment}
                                            className="w-full px-4 py-2 bg-gray-50 dark:bg-zinc-950 border border-gray-300 dark:border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors text-gray-900 dark:text-zinc-100 disabled:opacity-50"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-1">
                                            Código Postal
                                        </label>
                                        <input
                                            type="text"
                                            id="postalCode"
                                            name="postalCode"
                                            required
                                            value={formData.postalCode}
                                            onChange={handleInputChange}
                                            disabled={loadingPayment}
                                            className="w-full px-4 py-2 bg-gray-50 dark:bg-zinc-950 border border-gray-300 dark:border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors text-gray-900 dark:text-zinc-100 disabled:opacity-50"
                                        />
                                    </div>
                                </div>

                                <hr className="border-gray-200 dark:border-zinc-800 my-8" />

                                {errorMsg && (
                                    <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-red-900/30 dark:text-red-300" role="alert">
                                        {errorMsg}
                                    </div>
                                )}

                                <div className="mt-4">
                                    <button
                                        type="submit"
                                        disabled={loadingPayment}
                                        className="w-full bg-[#009ee3] hover:bg-[#008bca] text-white font-bold text-lg py-4 rounded-md shadow-md transition-colors flex justify-center items-center gap-2 disabled:opacity-70"
                                    >
                                        {loadingPayment ? (
                                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                        ) : (
                                            <>
                                                <svg viewBox="0 0 100 100" className="w-6 h-6 fill-current" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M50 0a50 50 0 1 0 0 100A50 50 0 0 0 50 0zm0 82.5A32.5 32.5 0 1 1 82.5 50 32.54 32.54 0 0 1 50 82.5zm19.33-41L54.12 56.68a5.75 5.75 0 0 1-8.15 0L30.67 41.5a1.8 1.8 0 0 1 0-2.54l4.24-4.24a1.8 1.8 0 0 1 2.54 0L50 49.38l12.55-14.66a1.8 1.8 0 0 1 2.54 0l4.24 4.24a1.8 1.8 0 0 1 0 2.54z" />
                                                </svg>
                                                Continuar al Pago
                                            </>
                                        )}
                                    </button>
                                </div>

                                <p className="text-center text-xs text-gray-500 dark:text-zinc-500 mt-2">
                                    Serás redirigido a una plataforma segura de pagos para completar tu transacción.
                                </p>
                            </form>
                        </div>
                    </div>

                    {/* RIGHTSIDE: Order Summary */}
                    <div className="lg:w-96 order-1 lg:order-2">
                        <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-sm border border-gray-200 dark:border-zinc-800 p-6 sticky top-24 transition-colors">
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-zinc-100 mb-6">
                                Resumen del pedido
                            </h2>

                            <div className="space-y-4 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
                                {cart.map((item) => (
                                    <div key={item.id} className="flex gap-4 items-start">
                                        <div className="w-16 h-16 bg-gray-100 dark:bg-zinc-800 rounded flex-shrink-0 border border-gray-200 dark:border-zinc-700 overflow-hidden relative">
                                            {item.image ? (
                                                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                            ) : (
                                                <span className="w-full h-full flex items-center justify-center text-[10px] text-gray-400">Sin img</span>
                                            )}
                                            <span className="absolute -top-1 -right-1 bg-gray-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border border-white dark:border-zinc-900">
                                                {item.quantity}
                                            </span>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="text-sm font-medium text-gray-900 dark:text-zinc-100 truncate">
                                                {item.name}
                                            </h4>
                                            <p className="text-sm text-gray-500 dark:text-zinc-400">
                                                ${Number(item.price).toLocaleString("es-AR", { minimumFractionDigits: 2 })}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <hr className="border-gray-200 dark:border-zinc-800 my-6" />

                            <div className="flex justify-between items-center mb-2">
                                <span className="text-gray-600 dark:text-zinc-400">Subtotal</span>
                                <span className="text-gray-900 dark:text-zinc-100 font-medium">
                                    ${Number(cartTotal).toLocaleString("es-AR", { minimumFractionDigits: 2 })}
                                </span>
                            </div>
                            <div className="flex justify-between items-center mb-6">
                                <span className="text-gray-600 dark:text-zinc-400">Envío</span>
                                <span className="text-green-600 dark:text-green-400 font-medium text-sm">Gratis</span>
                            </div>

                            <div className="flex justify-between items-center border-t border-gray-200 dark:border-zinc-800 pt-4">
                                <span className="text-lg font-bold text-gray-900 dark:text-zinc-50">Total</span>
                                <span className="text-2xl font-bold text-blue-600 dark:text-blue-500">
                                    ${Number(cartTotal).toLocaleString("es-AR", { minimumFractionDigits: 2 })}
                                </span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}