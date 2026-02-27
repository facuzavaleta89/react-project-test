"use client"

import { useEffect, useState, useCallback } from "react"
import { supabase } from "@/lib/supabaseClient"
import ProductCard from "@/components/ui/ProductCard"
import ProductForm from "@/components/ui/ProductForm"

export default function ProductosPage() {
    const [products, setProducts] = useState([])
    const [userRole, setUserRole] = useState(null) // null = loading, "guest" | "user" | "admin"
    const [loadingProducts, setLoadingProducts] = useState(true)
    const [formOpen, setFormOpen] = useState(false)
    const [editingProduct, setEditingProduct] = useState(null)
    const [saving, setSaving] = useState(false)
    const [toast, setToast] = useState(null) // { type: "success"|"error", msg }
    const [search, setSearch] = useState("")

    // ── Cargar usuario y su rol ──────────────────────────────────────────────
    useEffect(() => {
        const loadUser = async () => {
            const { data: { user } } = await supabase.auth.getUser()
            if (!user) {
                setUserRole("guest")
                return
            }
            const { data: profile } = await supabase
                .from("profiles")
                .select("role")
                .eq("id", user.id)
                .single()
            setUserRole(profile?.role ?? "user")
        }

        loadUser()

        const { data: listener } = supabase.auth.onAuthStateChange(() => {
            loadUser()
        })
        return () => listener.subscription.unsubscribe()
    }, [])

    // ── Cargar productos ─────────────────────────────────────────────────────
    const fetchProducts = useCallback(async () => {
        setLoadingProducts(true)
        const { data, error } = await supabase
            .from("products")
            .select("*")
            .order("created_at", { ascending: false })
        if (!error) setProducts(data ?? [])
        setLoadingProducts(false)
    }, [])

    useEffect(() => {
        fetchProducts()
    }, [fetchProducts])

    // ── Toast helper ─────────────────────────────────────────────────────────
    const showToast = (type, msg) => {
        setToast({ type, msg })
        setTimeout(() => setToast(null), 3500)
    }

    // ── CRUD ─────────────────────────────────────────────────────────────────
    const handleSave = async (formData) => {
        setSaving(true)
        if (editingProduct) {
            const { error } = await supabase
                .from("products")
                .update(formData)
                .eq("id", editingProduct.id)
            if (error) {
                showToast("error", "Error al actualizar el producto.")
            } else {
                showToast("success", "Producto actualizado correctamente.")
                setFormOpen(false)
                setEditingProduct(null)
                fetchProducts()
            }
        } else {
            const { error } = await supabase.from("products").insert([formData])
            if (error) {
                showToast("error", "Error al crear el producto.")
            } else {
                showToast("success", "Producto creado correctamente.")
                setFormOpen(false)
                fetchProducts()
            }
        }
        setSaving(false)
    }

    const handleEdit = (product) => {
        setEditingProduct(product)
        setFormOpen(true)
    }

    const handleDelete = async (id) => {
        const { error } = await supabase.from("products").delete().eq("id", id)
        if (error) {
            showToast("error", "Error al eliminar el producto.")
        } else {
            showToast("success", "Producto eliminado.")
            setProducts((prev) => prev.filter((p) => p.id !== id))
        }
    }

    const handleOpenNew = () => {
        setEditingProduct(null)
        setFormOpen(true)
    }

    const handleCloseForm = () => {
        setFormOpen(false)
        setEditingProduct(null)
    }

    // ── Filtrado por búsqueda ────────────────────────────────────────────────
    const filteredProducts = products.filter((p) =>
        p.name?.toLowerCase().includes(search.toLowerCase()) ||
        p.description?.toLowerCase().includes(search.toLowerCase())
    )

    const isAdmin = userRole === "admin"

    // ── Render ───────────────────────────────────────────────────────────────
    return (
        <div className="min-h-[calc(100vh-80px)] bg-[#fafafa] dark:bg-zinc-950 text-gray-900 dark:text-zinc-100 py-8 px-4 sm:px-6 lg:px-8 transition-colors">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-zinc-50 tracking-tight">Productos</h1>
                        <p className="text-gray-500 dark:text-zinc-400 mt-1">
                            {loadingProducts
                                ? "Cargando…"
                                : `${filteredProducts.length} producto${filteredProducts.length !== 1 ? "s" : ""
                                } disponible${filteredProducts.length !== 1 ? "s" : ""}`}
                        </p>
                    </div>
                    {isAdmin && (
                        <button
                            onClick={handleOpenNew}
                            className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        >
                            + Nuevo Producto
                        </button>
                    )}
                </div>

                {/* Toolbar (Search) */}
                <div className="mb-6">
                    <div className="relative max-w-md">
                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 dark:text-zinc-500">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="11" cy="11" r="8" />
                                <line x1="21" y1="21" x2="16.65" y2="16.65" />
                            </svg>
                        </span>
                        <input
                            type="text"
                            placeholder="Buscar productos..."
                            className="w-full pl-10 pr-4 py-2 bg-white dark:bg-zinc-900 border border-gray-300 dark:border-zinc-800 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors dark:placeholder-zinc-500"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>

                {/* Info Banners */}
                {userRole === "user" && (
                    <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 border-l-4 border-blue-600 rounded-md shadow-sm">
                        Estás navegando como usuario. Solo los administradores pueden crear, editar o eliminar productos.
                    </div>
                )}
                {userRole === "guest" && (
                    <div className="mb-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-300 border-l-4 border-yellow-600 rounded-md shadow-sm">
                        Iniciá sesión para acceder a más funciones. Los administradores pueden gestionar el catálogo.
                    </div>
                )}

                {/* Contenido Principal */}
                {loadingProducts ? (
                    <div className="flex justify-center items-center py-24">
                        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 dark:border-blue-500"></div>
                    </div>
                ) : filteredProducts.length === 0 ? (
                    <div className="text-center py-20 bg-white dark:bg-zinc-900 rounded-lg border border-gray-200 dark:border-zinc-800 shadow-sm transition-colors">
                        <svg className="mx-auto h-12 w-12 text-gray-400 dark:text-zinc-600 mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                            <line x1="3" y1="9" x2="21" y2="9" />
                            <line x1="9" y1="21" x2="9" y2="9" />
                        </svg>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-zinc-100 mb-1">
                            {search ? "No se encontraron resultados" : "No hay productos"}
                        </h3>
                        <p className="text-gray-500 dark:text-zinc-400 max-w-sm mx-auto">
                            {search
                                ? `No hay productos que coincidan con "${search}".`
                                : isAdmin
                                    ? "Comenzá creando tu primer producto con el botón de arriba."
                                    : "El catálogo está vacío por el momento."}
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredProducts.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                isAdmin={isAdmin}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                            />
                        ))}
                    </div>
                )}

            </div>

            {/* Modal Form */}
            {formOpen && (
                <ProductForm
                    initial={editingProduct}
                    onSave={handleSave}
                    onCancel={handleCloseForm}
                    loading={saving}
                />
            )}

            {/* Toast Notification */}
            {toast && (
                <div
                    className={`fixed bottom-4 right-4 px-4 py-3 rounded-md shadow-lg flex items-center gap-3 text-sm font-medium border z-50 animate-bounce transition-colors ${toast.type === "success"
                            ? "bg-green-50 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800"
                            : "bg-red-50 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800"
                        }`}
                >
                    {toast.type === "success" ? "✓" : "✕"}
                    {toast.msg}
                </div>
            )}
        </div>
    )
}