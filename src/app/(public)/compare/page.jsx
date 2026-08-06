"use client"

import Link from "next/link"
import { useCompareStore } from "@/lib/store/compare"
import { useCatalogStore } from "@/lib/store/catalog"
import { Card } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { formatPrice } from "@/lib/utils"
import { X, ShoppingCart, ArrowLeft } from "lucide-react"

export default function ComparePage() {
  const { items, removeFromCompare, clearCompare } = useCompareStore()
  const { products, getVariantsByProduct } = useCatalogStore()

  const compareProducts = items
    .map((id) => products.find((p) => p.id === id))
    .filter(Boolean)

  if (compareProducts.length === 0) {
    return (
      <main className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <div className="text-6xl mb-4">⚖️</div>
          <h1 className="text-2xl font-bold mb-4">لیست مقایسه خالی است</h1>
          <Link href="/products">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" />
              مشاهده محصولات
            </Button>
          </Link>
        </div>
      </main>
    )
  }

  const allSpecs = [...new Set(compareProducts.flatMap((p) => Object.keys(p.specs || {})))]

  return (
    <main className="min-h-screen py-12 px-4 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">مقایسه محصولات</h1>
        <Button variant="outline" onClick={clearCompare}>
          <X className="w-4 h-4 mr-2" />
          پاک کردن لیست
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-right py-4 px-4 border-b">ویژگی</th>
              {compareProducts.map((product) => (
                <th key={product.id} className="text-center py-4 px-4 border-b min-w-[200px]">
                  <div className="relative">
                    <button
                      onClick={() => removeFromCompare(product.id)}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-red-100 text-red-600 rounded-full flex items-center justify-center hover:bg-red-200"
                    >
                      <X className="w-3 h-3" />
                    </button>
                    <div className="text-4xl mb-2">
                      {product.category === "mobile" ? "📱" : product.category === "laptop" ? "💻" : "⌚"}
                    </div>
                    <div className="font-bold">{product.name}</div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="py-4 px-4 font-medium text-gray-500">قیمت</td>
              {compareProducts.map((product) => {
                const variants = getVariantsByProduct(product.id)
                const price = variants[0]?.price || 0
                return (
                  <td key={product.id} className="py-4 px-4 text-center font-bold text-apple-blue">
                    {formatPrice(price)}
                  </td>
                )
              })}
            </tr>
            <tr className="border-b">
              <td className="py-4 px-4 font-medium text-gray-500">دسته</td>
              {compareProducts.map((product) => (
                <td key={product.id} className="py-4 px-4 text-center">
                  <Badge variant="secondary">{product.category}</Badge>
                </td>
              ))}
            </tr>
            {allSpecs.map((spec) => (
              <tr key={spec} className="border-b">
                <td className="py-4 px-4 font-medium text-gray-500 capitalize">{spec}</td>
                {compareProducts.map((product) => (
                  <td key={product.id} className="py-4 px-4 text-center text-sm">
                    {product.specs?.[spec] || "—"}
                  </td>
                ))}
              </tr>
            ))}
            <tr>
              <td className="py-4 px-4"></td>
              {compareProducts.map((product) => (
                <td key={product.id} className="py-4 px-4 text-center">
                  <Link href={`/products/${product.slug}`}>
                    <Button size="sm">
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      خرید
                    </Button>
                  </Link>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  )
}
