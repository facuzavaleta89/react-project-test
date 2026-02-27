"use client"

import { useState, useEffect } from "react"

const EMPTY_FORM = {
    name: "",
    description: "",
    price: "",
    valoration: "",
    image: "",
}

export default function ProductForm({ initial, onSave, onCancel, loading }) {
    const [form, setForm] = useState(EMPTY_FORM)
    const [errors, setErrors] = useState({})

    useEffect(() => {
        if (initial) {
            setForm({
                name: initial.name ?? "",
                description: initial.description ?? "",
                price: initial.price ?? "",
                valoration: initial.valoration ?? "",
                image: initial.image ?? "",
            })
        } else {
            setForm(EMPTY_FORM)
        }
        setErrors({})
    }, [initial])

    const validate = () => {
        const errs = {}
        if (!form.name.trim()) errs.name = "El nombre es requerido."
        if (!form.price || isNaN(Number(form.price)) || Number(form.price) < 0)
            errs.price = "Ingresá un precio válido."
        if (
            form.valoration !== "" &&
            (isNaN(Number(form.valoration)) ||
                Number(form.valoration) < 0 ||
                Number(form.valoration) > 5)
        )
            errs.valoration = "La valoración debe ser entre 0 y 5."
        return errs
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setForm((prev) => ({ ...prev, [name]: value }))
        if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const errs = validate()
        if (Object.keys(errs).length > 0) {
            setErrors(errs)
            return
        }
        onSave({
            name: form.name.trim(),
            description: form.description.trim(),
            price: Number(form.price),
            valoration: form.valoration !== "" ? Number(form.valoration) : null,
            image: form.image.trim() || null,
        })
    }

    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
            <div
                className="bg-white dark:bg-zinc-900 rounded-lg w-full max-w-lg shadow-xl border border-gray-200 dark:border-zinc-800 transition-colors"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-zinc-800">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-zinc-100">
                        {initial ? "Editar Producto" : "Nuevo Producto"}
                    </h2>
                    <button
                        onClick={onCancel}
                        className="text-gray-500 hover:text-gray-700 dark:text-zinc-400 dark:hover:text-zinc-200 transition"
                    >
                        ✕
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-4 flex flex-col gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-1">
                            Nombre *
                        </label>
                        <input
                            name="name"
                            type="text"
                            className={`w-full bg-white dark:bg-zinc-950 border rounded p-2 text-gray-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${errors.name ? "border-red-500" : "border-gray-300 dark:border-zinc-700"
                                }`}
                            value={form.name}
                            onChange={handleChange}
                            placeholder="Nombre del producto"
                            autoFocus
                        />
                        {errors.name && <span className="text-red-500 text-sm mt-1">{errors.name}</span>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-1">
                            Descripción
                        </label>
                        <textarea
                            name="description"
                            className="w-full bg-white dark:bg-zinc-950 border border-gray-300 dark:border-zinc-700 rounded p-2 text-gray-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors resize-y min-h-[80px]"
                            value={form.description}
                            onChange={handleChange}
                            placeholder="Descripción del producto (opcional)"
                            rows={3}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-1">
                                Precio *
                            </label>
                            <div className="relative">
                                <span className="absolute left-3 top-2 text-gray-500 dark:text-zinc-500">$</span>
                                <input
                                    name="price"
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    className={`w-full bg-white dark:bg-zinc-950 border rounded py-2 pl-8 pr-2 text-gray-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${errors.price ? "border-red-500" : "border-gray-300 dark:border-zinc-700"
                                        }`}
                                    value={form.price}
                                    onChange={handleChange}
                                    placeholder="0.00"
                                />
                            </div>
                            {errors.price && <span className="text-red-500 text-sm mt-1">{errors.price}</span>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-1">
                                Valoración (0-5)
                            </label>
                            <input
                                name="valoration"
                                type="number"
                                min="0"
                                max="5"
                                step="0.1"
                                className={`w-full bg-white dark:bg-zinc-950 border rounded p-2 text-gray-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${errors.valoration ? "border-red-500" : "border-gray-300 dark:border-zinc-700"
                                    }`}
                                value={form.valoration}
                                onChange={handleChange}
                                placeholder="4.5"
                            />
                            {errors.valoration && (
                                <span className="text-red-500 text-sm mt-1">{errors.valoration}</span>
                            )}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-1">
                            URL de imagen
                        </label>
                        <input
                            name="image"
                            type="url"
                            className="w-full bg-white dark:bg-zinc-950 border border-gray-300 dark:border-zinc-700 rounded p-2 text-gray-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                            value={form.image}
                            onChange={handleChange}
                            placeholder="https://ejemplo.com/imagen.jpg"
                        />
                        {form.image && (
                            <div className="mt-2 h-32 rounded border border-gray-200 dark:border-zinc-700 bg-gray-100 dark:bg-zinc-800 overflow-hidden">
                                <img
                                    src={form.image}
                                    alt="Preview"
                                    onError={(e) => { e.target.style.display = "none" }}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        )}
                    </div>

                    <div className="flex justify-end gap-2 pt-4 border-t border-gray-200 dark:border-zinc-800 mt-2">
                        <button
                            type="button"
                            className="px-4 py-2 border border-gray-300 dark:border-zinc-700 rounded font-medium text-gray-700 dark:text-zinc-300 bg-white dark:bg-zinc-800 hover:bg-gray-50 dark:hover:bg-zinc-700 transition"
                            onClick={onCancel}
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 rounded font-medium text-white bg-blue-600 hover:bg-blue-700 transition disabled:opacity-50"
                            disabled={loading}
                        >
                            {loading ? "Guardando..." : initial ? "Actualizar" : "Crear"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
