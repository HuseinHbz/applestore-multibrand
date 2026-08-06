"use client"

import { useState, useEffect, useMemo } from "react"
import { useCatalogStore } from "@/lib/store/catalog"
import { ProductCard } from "@/components/product/ProductCard"
import { ProductGridSkeleton } from "@/components/shared/Skeleton"
import { Input } from "@/components/ui/Input"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { Search, SlidersHorizontal } from "lucide-react"

export default function ProductsPage() {
  const { products, categories, fetchProducts, loading } = useCatalogStore()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("default")
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    fetchProducts()
  }, [])

  const filteredProducts = useMemo(() => {
    let result = [...products]
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter((p) => p.name.toLowerCase().includes(query) || p.description.toLowerCase().includes(query))
    }
    if (selectedCategory !== "all") result = result.filter((p) => p.category === selectedCategory)
    switch (sortBy) {
      case "price-asc": result.sort((a, b) => (a.variants?.[0]?.price || 0) - (b.variants?.[0]?.price || 0)); break
      case "price-desc": result.sort((a, b) => (b.variants?.[0]?.price || 0) - (a.variants?.[0]?.price || 0)); break
      case "name": result.sort((a, b) => a.name.localeCompare(b.name)); break
      default: break
    }
    return result
  }, [products, searchQuery, selectedCategory, sortBy])

  return (
    <main className="min-h-screen py-12 px-4 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-apple-dark dark:text-white mb-4">محصولات</h1>
        <p className="text-gray-500 dark:text-gray-400">تمامی محصولات اپل با گارانتی رسمی</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input placeholder="جستجو در محصولات..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pr-10" />
        </div>
        <Button variant="outline" onClick={() => setShowFilters(!showFilters)}><SlidersHorizontal className="w-4 h-4 ml-2" />فیلترها</Button>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="h-10 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-apple-blue dark:text-white">
          <option value="default">مرتب‌سازی پیش‌فرض</option>
          <option value="price-asc">قیمت: کم به زیاد</option>
          <option value="price-desc">قیمت: زیاد به کم</option>
          <option value="name">نام</option>
        </select>
      </div>

      {showFilters && (
        <div className="flex flex-wrap gap-2 mb-6">
          <Badge variant={selectedCategory === "all" ? "default" : "outline"} className="cursor-pointer" onClick={() => setSelectedCategory("all")}>همه</Badge>
          {categories.map((cat) => (
            <Badge key={cat} variant={selectedCategory === cat ? "default" : "outline"} className="cursor-pointer capitalize" onClick={() => setSelectedCategory(cat)}>
              {cat === "mobile" ? "موبایل" : cat === "laptop" ? "لپ‌تاپ" : cat === "tablet" ? "تبلت" : "لوازم جانبی"}
            </Badge>
          ))}
        </div>
      )}

      {loading ? <ProductGridSkeleton count={6} /> : filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold mb-2 dark:text-white">محصولی یافت نشد</h3>
          <p className="text-gray-500">لطفاً عبارت جستجوی خود را تغییر دهید</p>
        </div>
      )}
    </main>
  )
}
