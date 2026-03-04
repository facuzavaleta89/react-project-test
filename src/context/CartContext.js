"use client"

import { createContext, useContext, useState, useEffect, useCallback } from "react"
import { supabase } from "@/lib/supabaseClient"
import { useToast } from "@/context/ToastContext"

const CartContext = createContext()

export function CartProvider({ children }) {
    const [cart, setCart] = useState([])
    const [user, setUser] = useState(null)
    const [cartId, setCartId] = useState(null)
    const [loading, setLoading] = useState(true)
    const { showToast } = useToast()

    // 1. Initial Auth Check and Setup
    useEffect(() => {
        const setupAuth = async () => {
            const { data: { session } } = await supabase.auth.getSession()
            setUser(session?.user ?? null)

            const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
                setUser(session?.user ?? null)
                // If logged out, reset cart UI and let localstorage logic take over
                if (!session?.user) {
                    setCartId(null)
                    loadLocalCart()
                }
            })

            return () => {
                authListener.subscription.unsubscribe()
            }
        }
        setupAuth()
    }, [])

    // 2. Load Cart Strategy based on User state
    useEffect(() => {
        if (user) {
            loadSupabaseCart(user.id)
        } else if (user === null) {
            // guest
            loadLocalCart()
            setLoading(false)
        }
    }, [user])

    const loadLocalCart = () => {
        const savedCart = localStorage.getItem("cart")
        if (savedCart) {
            try {
                setCart(JSON.parse(savedCart))
            } catch (err) {
                console.error("No se pudo cargar el carrito", err)
                setCart([])
            }
        } else {
            setCart([])
        }
    }

    const loadSupabaseCart = async (userId) => {
        setLoading(true)
        try {
            // Check if cart exists (use maybeSingle so no error is thrown if 0 rows)
            let { data: existingCart, error: checkError } = await supabase
                .from("carts")
                .select("id")
                .eq("user_id", userId)
                .maybeSingle()

            if (checkError) {
                console.error("Error checking cart:", checkError)
            }

            let currentCartId = existingCart?.id

            if (!currentCartId) {
                // Create cart
                const { data: newCart, error: createError } = await supabase
                    .from("carts")
                    .insert([{ user_id: userId }])
                    .select("id")
                    .single()

                if (createError) {
                    console.error("Error creating cart:", createError)
                    throw createError
                }
                currentCartId = newCart.id
            }

            setCartId(currentCartId)

            // Fetch items
            await fetchCartItems(currentCartId)

            // Merge local storage items if any exist
            await syncLocalToSupabase(currentCartId)

        } catch (error) {
            console.error("Error loading Supabase cart:", error)
        } finally {
            setLoading(false)
        }
    }

    const fetchCartItems = async (cId) => {
        const { data: items, error } = await supabase
            .from("cart_items")
            .select(`
                id,
                quantity,
                product_id,
                products (*)
            `)
            .eq("cart_id", cId)

        if (error) {
            console.error("Error fetching cart items:", error)
            return
        }

        // Format to match old local storage structure
        const formattedCart = items.map(item => ({
            ...item.products,
            cart_item_id: item.id, // Supabase cart_items PK
            quantity: item.quantity
        }))

        setCart(formattedCart)
    }

    // Merge strategy: Send local items to Supabase, then clear local
    const syncLocalToSupabase = async (cId) => {
        const local = localStorage.getItem("cart")
        if (!local) return

        let localCart = []
        try {
            localCart = JSON.parse(local)
        } catch (e) { return }

        if (localCart.length === 0) return

        // We have local items to merge
        for (const item of localCart) {
            await insertOrUpdateItem(cId, item.id, item.quantity)
        }

        localStorage.removeItem("cart")
        await fetchCartItems(cId) // Refresh with merged data
    }

    // Guardar en LocalStorage SOLO SI no hay usuario
    useEffect(() => {
        if (!user && !loading) {
            localStorage.setItem("cart", JSON.stringify(cart))
        }
    }, [cart, user, loading])


    // DB Helpers
    const insertOrUpdateItem = async (cId, pId, qtyToAdd) => {
        // Check if item exists in remote cart
        const { data: existingItem } = await supabase
            .from("cart_items")
            .select("id, quantity")
            .eq("cart_id", cId)
            .eq("product_id", pId)
            .single()

        if (existingItem) {
            await supabase
                .from("cart_items")
                .update({ quantity: existingItem.quantity + qtyToAdd })
                .eq("id", existingItem.id)
        } else {
            await supabase
                .from("cart_items")
                .insert([{ cart_id: cId, product_id: pId, quantity: qtyToAdd }])
        }
    }


    // ── Public Cart Methods ──────────────────────────────────────────

    const addToCart = async (product) => {
        if (user && cartId) {
            setCart((prev) => {
                const existing = prev.find((item) => item.id === product.id)
                if (existing) {
                    return prev.map((item) =>
                        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                    )
                }
                return [...prev, { ...product, quantity: 1 }]
            })
            await insertOrUpdateItem(cartId, product.id, 1)
            await fetchCartItems(cartId)
        } else {
            setCart((prev) => {
                const existing = prev.find((item) => item.id === product.id)
                if (existing) {
                    return prev.map((item) =>
                        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                    )
                }
                return [...prev, { ...product, quantity: 1 }]
            })
        }
        showToast(`"${product.name}" agregado al carrito 🛒`, "success")
    }

    const removeFromCart = async (productId) => {
        const item = cart.find((i) => i.id === productId)
        if (user && cartId) {
            setCart((prev) => prev.filter((item) => item.id !== productId))
            await supabase
                .from("cart_items")
                .delete()
                .eq("cart_id", cartId)
                .eq("product_id", productId)
        } else {
            setCart((prev) => prev.filter((item) => item.id !== productId))
        }
        if (item) showToast(`"${item.name}" eliminado del carrito.`, "info")
    }

    const updateQuantity = async (productId, quantity) => {
        if (quantity < 1) return

        if (user && cartId) {
            setCart((prev) => prev.map((item) => item.id === productId ? { ...item, quantity } : item))

            await supabase
                .from("cart_items")
                .update({ quantity })
                .eq("cart_id", cartId)
                .eq("product_id", productId)
        } else {
            setCart((prev) => prev.map((item) => item.id === productId ? { ...item, quantity } : item))
        }
    }

    const clearCart = async () => {
        if (user && cartId) {
            setCart([])
            await supabase.from("cart_items").delete().eq("cart_id", cartId)
        } else {
            setCart([])
        }
        showToast("Carrito vaciado.", "warning")
    }

    const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0)
    const cartCount = cart.reduce((count, item) => count + item.quantity, 0)

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                cartTotal,
                cartCount,
                isCartLoading: loading
            }}
        >
            {children}
        </CartContext.Provider>
    )
}

export function useCart() {
    return useContext(CartContext)
}
