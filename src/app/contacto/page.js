"use client"

import { useState } from "react"
import { useToast } from "@/context/ToastContext"

const contactInfo = [
    {
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
            </svg>
        ),
        label: "Email",
        value: "contacto@ecommerce.com",
        href: "mailto:contacto@ecommerce.com",
    },
    {
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6 6l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.91 16.9z" />
            </svg>
        ),
        label: "Teléfono",
        value: "+54 11 4000-0000",
        href: "tel:+541140000000",
    },
    {
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
            </svg>
        ),
        label: "Dirección",
        value: "Av. Corrientes 1234, Buenos Aires, Argentina",
        href: "https://maps.google.com?q=Av+Corrientes+1234+Buenos+Aires",
    },
    {
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
            </svg>
        ),
        label: "Horario",
        value: "Lunes a viernes, 9:00 – 18:00 hs",
        href: null,
    },
]

const topics = [
    "Consulta sobre un pedido",
    "Problema con un producto",
    "Devolución o reembolso",
    "Pregunta sobre envíos",
    "Cambio de datos de cuenta",
    "Otro",
]

export default function ContactoPage() {
    const { showToast } = useToast()
    const [form, setForm] = useState({ name: "", email: "", topic: "", message: "" })
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target
        setForm((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        // Simulación de envío
        await new Promise((r) => setTimeout(r, 1200))
        setLoading(false)
        setForm({ name: "", email: "", topic: "", message: "" })
        showToast("¡Mensaje enviado! Te responderemos a la brevedad. ✉️", "success")
    }

    const inputClass =
        "w-full bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg px-4 py-2.5 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-400 dark:focus:ring-zinc-500 transition text-sm"

    return (
        <main className="min-h-[calc(100vh-80px)] bg-[#fafafa] dark:bg-zinc-950 transition-colors">

            {/* Hero */}
            <div className="bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 py-14 px-6">
                <div className="max-w-3xl mx-auto text-center">
                    <span className="inline-block text-xs font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-400 mb-3">
                        Soporte
                    </span>
                    <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-white mb-4">
                        Contacto
                    </h1>
                    <p className="text-zinc-500 dark:text-zinc-400 text-lg max-w-xl mx-auto">
                        ¿Tenés alguna pregunta, problema o sugerencia? Estamos para ayudarte. Respondemos en menos de 24 horas hábiles.
                    </p>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-5 gap-12">

                {/* Info lateral */}
                <aside className="lg:col-span-2 flex flex-col gap-6">
                    <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">Información de contacto</h2>

                    <div className="flex flex-col gap-4">
                        {contactInfo.map((item) => (
                            <div key={item.label} className="flex items-start gap-4 p-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors">
                                <span className="flex-shrink-0 mt-0.5 text-zinc-500 dark:text-zinc-400">
                                    {item.icon}
                                </span>
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-0.5">
                                        {item.label}
                                    </p>
                                    {item.href ? (
                                        <a
                                            href={item.href}
                                            target={item.href.startsWith("http") ? "_blank" : undefined}
                                            rel="noopener noreferrer"
                                            className="text-sm text-zinc-800 dark:text-zinc-200 hover:text-zinc-500 dark:hover:text-zinc-400 transition-colors"
                                        >
                                            {item.value}
                                        </a>
                                    ) : (
                                        <p className="text-sm text-zinc-800 dark:text-zinc-200">{item.value}</p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Social */}
                    <div className="mt-2">
                        <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-3">Seguinos</p>
                        <div className="flex gap-3">
                            {[
                                { label: "Twitter", href: "#", icon: <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.259 5.629L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />, fill: true },
                                { label: "Instagram", href: "#", icon: <><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" /></>, fill: false },
                            ].map((s) => (
                                <a
                                    key={s.label}
                                    href={s.href}
                                    aria-label={s.label}
                                    className="w-9 h-9 flex items-center justify-center rounded-full border border-zinc-200 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400 hover:bg-zinc-900 hover:text-white dark:hover:bg-white dark:hover:text-zinc-900 transition-all duration-200"
                                >
                                    <svg width="15" height="15" viewBox="0 0 24 24" fill={s.fill ? "currentColor" : "none"} stroke={s.fill ? "none" : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        {s.icon}
                                    </svg>
                                </a>
                            ))}
                        </div>
                    </div>
                </aside>

                {/* Formulario */}
                <section className="lg:col-span-3">
                    <h2 className="text-lg font-semibold text-zinc-900 dark:text-white mb-6">Envianos un mensaje</h2>

                    <form onSubmit={handleSubmit} className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-7 flex flex-col gap-5 shadow-sm">

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                                    Nombre completo *
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Juan Pérez"
                                    value={form.name}
                                    onChange={handleChange}
                                    required
                                    className={inputClass}
                                />
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                                    Email *
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="juan@ejemplo.com"
                                    value={form.email}
                                    onChange={handleChange}
                                    required
                                    className={inputClass}
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                                Motivo de contacto *
                            </label>
                            <select
                                name="topic"
                                value={form.topic}
                                onChange={handleChange}
                                required
                                className={inputClass}
                            >
                                <option value="">Seleccioná un motivo...</option>
                                {topics.map((t) => (
                                    <option key={t} value={t}>{t}</option>
                                ))}
                            </select>
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                                Mensaje *
                            </label>
                            <textarea
                                name="message"
                                placeholder="Contanos en detalle cómo podemos ayudarte..."
                                value={form.message}
                                onChange={handleChange}
                                required
                                rows={5}
                                className={`${inputClass} resize-y min-h-[120px]`}
                            />
                        </div>

                        <div className="flex items-center justify-between pt-2">
                            <p className="text-xs text-zinc-400 dark:text-zinc-500">* Campos obligatorios</p>
                            <button
                                type="submit"
                                disabled={loading}
                                className="px-6 py-2.5 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-lg font-semibold text-sm hover:bg-zinc-700 dark:hover:bg-zinc-200 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                            >
                                {loading ? (
                                    <>
                                        <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <circle cx="12" cy="12" r="10" className="opacity-25" />
                                            <path d="M12 2a10 10 0 0 1 10 10" className="opacity-75" />
                                        </svg>
                                        Enviando...
                                    </>
                                ) : (
                                    "Enviar mensaje"
                                )}
                            </button>
                        </div>
                    </form>
                </section>
            </div>
        </main>
    )
}