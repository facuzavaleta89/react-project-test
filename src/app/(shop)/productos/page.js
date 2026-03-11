import { Suspense } from "react"
import ProductosContent from "./ProductosContent"
import ProductosLoading from "./loading"

export const metadata = {
    title: "Productos - E-Commerce",
    description: "Catálogo de productos disponibles",
}

export default function ProductosPage() {
    return (
        <Suspense fallback={<ProductosLoading />}>
            <ProductosContent />
        </Suspense>
    )
}