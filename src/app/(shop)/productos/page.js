"use client"

import { useEffect, useState, useCallback } from "react"
import { useSearchParams } from "next/navigation"
import { supabase } from "@/lib/supabaseClient"
import ProductCard from "@/components/ui/ProductCard"
import ProductForm from "@/components/ui/ProductForm"
import CategoryManager from "@/components/ui/CategoryManager"
import { useToast } from "@/context/ToastContext"

export default function ProductosPage() {
    const searchParams = useSearchParams()
    const initialSearch = searchParams.get("search") || ""
    const initialCategory = searchParams.get("category") || null
    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])
    const [selectedCategory, setSelectedCategory] = useState(initialCategory ? parseInt(initialCategory) : null)
    const [userRole, setUserRole] = useState(null)
    const [loadingProducts, setLoadingProducts] = useState(true)
    const [formOpen, setFormOpen] = useState(false)
    const [editingProduct, setEditingProduct] = useState(null)
    const [saving, setSaving] = useState(false)
    const [search, setSearch] = useState(initialSearch)
    const [sortBy, setSortBy] = useState("newest")
    const [displayedCount, setDisplayedCount] = useState(12)
    const { showToast } = useToast()

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

    // ── Cargar productos y categorías ─────────────────────────────────────────
    const fetchCategories = useCallback(async () => {
        const { data, error } = await supabase
            .from("categories")
            .select("*")
            .order("name", { ascending: true })
        if (!error) setCategories(data ?? [])
    }, [])

    const fetchProducts = useCallback(async () => {
        setLoadingProducts(true)
        const { data, error } = await supabase
            .from("products")
            .select("*, categories(name)")
            .order("created_at", { ascending: false })
        if (!error) setProducts(data ?? [])
        setLoadingProducts(false)
    }, [])

    useEffect(() => {
        fetchCategories()
        fetchProducts()
    }, [fetchCategories, fetchProducts])

    // ── Resetear displayedCount cuando cambian los filtros ──────────────────
    useEffect(() => {
        setDisplayedCount(12)
    }, [search, selectedCategory])

    // ── CRUD Categorías ──────────────────────────────────────────────────────
    const handleAddCategory = async (name) => {
        const { data, error } = await supabase
            .from("categories")
            .insert([{ name }])
            .select()
            .single()

        if (error) {
            showToastLocal("error", "Error al crear categoría. Quizás ya existe.")
        } else {
            showToastLocal("success", `Categoría "${name}" creada.`)
            setCategories((prev) => [...prev, data])
            fetchCategories()
        }
    }

    const handleDeleteCategory = async (id, name) => {
        if (!window.confirm(`¿Seguro que querés eliminar la categoría "${name}"?`)) return
        const { error } = await supabase.from("categories").delete().eq("id", id)

        if (error) {
            showToastLocal("error", "Error al eliminar la categoría.")
        } else {
            showToastLocal("success", `Categoría "${name}" eliminada.`)
            setCategories((prev) => prev.filter((c) => c.id !== id))
            if (selectedCategory === id) setSelectedCategory(null)
        }
    }

    // ── Toast helper ─────────────────────────────────────────────────────────
    const showToastLocal = (type, msg) => showToast(msg, type)

    // ── CRUD ─────────────────────────────────────────────────────────────────
    const handleSave = async (formData) => {
        setSaving(true)
        if (editingProduct) {
            const { error } = await supabase
                .from("products")
                .update(formData)
                .eq("id", editingProduct.id)
            if (error) {
                showToastLocal("error", "Error al actualizar el producto.")
            } else {
                showToastLocal("success", "Producto actualizado correctamente.")
                setFormOpen(false)
                setEditingProduct(null)
                fetchProducts()
            }
        } else {
            const { error } = await supabase.from("products").insert([formData])
            if (error) {
                showToastLocal("error", "Error al crear el producto.")
            } else {
                showToastLocal("success", "Producto creado correctamente.")
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
            showToastLocal("error", "Error al eliminar el producto.")
        } else {
            showToastLocal("success", "Producto eliminado.")
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

    // ── Filtrado y Ordenamiento ──────────────────────────────────────────────
    const filteredProducts = products.filter((p) => {
        const matchesSearch =
            p.name?.toLowerCase().includes(search.toLowerCase()) ||
            p.description?.toLowerCase().includes(search.toLowerCase())
        const matchesCategory = selectedCategory
            ? p.category_id === selectedCategory
            : true
        return matchesSearch && matchesCategory
    })

    const sortedProducts = [...filteredProducts].sort((a, b) => {
        switch (sortBy) {
            case "price-asc":
                return Number(a.price) - Number(b.price)
            case "price-desc":
                return Number(b.price) - Number(a.price)
            case "name-asc":
                return (a.name || "").localeCompare(b.name || "")
            case "name-desc":
                return (b.name || "").localeCompare(a.name || "")
            case "valoration":
                return (b.valoration || 0) - (a.valoration || 0)
            case "newest":
            default:
                // Asumiendo que products ya viene ordenado por fecha de creación DESC desde Supabase,
                // no necesitamos hacer nada complejo, pero si quisiéramos ser explícitos:
                return new Date(b.created_at) - new Date(a.created_at)
        }
    })

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
                                : `${sortedProducts.length} producto${sortedProducts.length !== 1 ? "s" : ""
                                } disponible${sortedProducts.length !== 1 ? "s" : ""}`}
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

                {/* Toolbar (Search & Sort) */}
                <div className="mb-6 flex flex-col md:flex-row md:items-center gap-4">
                    <div className="relative flex-1 max-w-md">
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

                    <div className="flex items-center gap-2">
                        <label htmlFor="sortBy" className="text-sm font-medium text-gray-700 dark:text-zinc-300 whitespace-nowrap">
                            Ordenar por:
                        </label>
                        <select
                            id="sortBy"
                            className="bg-white dark:bg-zinc-900 border border-gray-300 dark:border-zinc-800 rounded-md py-2 px-3 pr-8 text-sm text-gray-900 dark:text-zinc-100 shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors appearance-none"
                            style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: `right 0.5rem center`, backgroundRepeat: `no-repeat`, backgroundSize: `1.5em 1.5em` }}
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                        >
                            <option value="newest">Más nuevos</option>
                            <option value="price-asc">Precio: Menor a Mayor</option>
                            <option value="price-desc">Precio: Mayor a Menor</option>
                            <option value="name-asc">Nombre: A-Z</option>
                            <option value="name-desc">Nombre: Z-A</option>
                            <option value="valoration">Mejor valoración</option>
                        </select>
                    </div>
                </div>

                {/* Categorías */}
                <CategoryManager
                    categories={categories}
                    selectedCategory={selectedCategory}
                    onSelect={setSelectedCategory}
                    isAdmin={isAdmin}
                    onAdd={handleAddCategory}
                    onDelete={handleDeleteCategory}
                />

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
                ) : sortedProducts.length === 0 ? (
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
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {sortedProducts.slice(0, displayedCount).map((product) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    isAdmin={isAdmin}
                                    onEdit={handleEdit}
                                    onDelete={handleDelete}
                                />
                            ))}
                        </div>

                        {sortedProducts.length > displayedCount && (
                            <div className="flex justify-center mt-10">
                                <button
                                    onClick={() => setDisplayedCount(displayedCount + 12)}
                                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors shadow-md hover:shadow-lg"
                                >
                                    Ver más productos
                                </button>
                            </div>
                        )}
                    </>
                )}

            </div>

            {/* Modal Form */}
            {formOpen && (
                <ProductForm
                    initial={editingProduct}
                    categories={categories}
                    onSave={handleSave}
                    onCancel={handleCloseForm}
                    loading={saving}
                />
            )}

        </div>
    )
}