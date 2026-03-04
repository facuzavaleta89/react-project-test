import React from 'react';
import MiniCard from '../ui/MiniCard';
import { supabase } from '@/lib/supabaseClient';

export default async function Products() {
    // Traer los productos reales de la tabla 'products'
    const { data: dbProducts, error } = await supabase
        .from('products')
        .select('*');

    if (error) {
        console.error("Error fetching products:", error.message);
    }

    // Si hay error o no hay datos, inicializamos un array vacío para no romper la app
    const fetchedProducts = dbProducts || [];

    // Mapeamos para garantizar que los campos coinciden con lo que espera MiniCard
    const normalizedProducts = fetchedProducts.map((p) => ({
        id: p.id,
        name: p.name || p.title || "Producto sin nombre", // Soporta "name" o "title"
        rating: Number(p.valoration) || 0, // Toma la columna 'valoration' y si falla o no existe es 0
        image: p.image || p.image_url || p.url_image || "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=400&auto=format&fit=crop",
        isOnSale: p.isOnSale || p.is_on_sale || false // Soporta camelCase y snake_case
    }));

    // Ordenar productos por valoración de mayor a menor
    const sortedByRating = [...normalizedProducts].sort((a, b) => b.rating - a.rating);

    // Buscar un producto en oferta
    let saleProduct = sortedByRating.find(p => p.isOnSale);

    // Si no hay ninguno en oferta, tomar el mejor valorado no seleccionado previamente (si existe)
    if (!saleProduct && sortedByRating.length > 0) {
        // Intentamos tomar el 4to producto (índice 3), si no existe, tomamos el primero
        saleProduct = sortedByRating.length > 3 ? sortedByRating[3] : sortedByRating[0];
    }

    // Si no hay productos en la base de datos, mostraremos un mensaje
    if (normalizedProducts.length === 0) {
        return (
            <section id="products" className="py-12">
                <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">Selección Especial</h2>
                        <p className="mt-2 text-zinc-600 dark:text-zinc-400">Encuentra los favoritos de nuestros clientes y la mejor oferta de hoy.</p>
                    </div>
                </div>
                <div className="text-center py-12 bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
                    <p className="text-zinc-500 dark:text-zinc-400">No hay productos disponibles por el momento.</p>
                </div>
            </section>
        );
    }

    // Tomar los 3 mejores valorados que NO sean el producto en oferta que acabamos de seleccionar
    const topRatedProducts = sortedByRating
        .filter(p => !saleProduct || p.id !== saleProduct.id)
        .slice(0, 3);

    // Combinar (producto en oferta + 3 mejores). Ponemos el producto en oferta primero para destacarlo
    const displayProducts = saleProduct ? [saleProduct, ...topRatedProducts] : topRatedProducts;

    return (
        <section id="products" className="py-12">
            <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">Selección Especial</h2>
                    <p className="mt-2 text-zinc-600 dark:text-zinc-400">Encuentra los favoritos de nuestros clientes y la mejor oferta de hoy.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {displayProducts.map(product => (
                    <MiniCard key={product.id} {...product} />
                ))}
            </div>
        </section>
    );
}
