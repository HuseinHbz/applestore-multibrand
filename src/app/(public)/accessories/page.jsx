"use client"

import { useCatalogStore } from "@/lib/store/catalog"
import { ProductCard } from "@/components/product/ProductCard"

export default function AccessoriesPage() {
  const { products } = useCatalogStore()
  const accessories = products.filter((p) => p.category === "accessory")

  return (
    <main className="min-h-screen py-12 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-apple-dark mb-4">لوازم جانبی</h1>
        <p className="text-gray-500">AirPods، Apple Watch، شارژر و سایر لوازم جانبی</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {accessories.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  )
}
