"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { useCatalogStore } from "@/lib/store/catalog"
import { Input } from "@/components/ui/Input"
import { Search, ArrowLeft } from "lucide-react"

export function SearchAutocomplete() {
  const [query, setQuery] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef(null)
  const { products } = useCatalogStore()

  const results = query.length > 1
    ? products.filter((p) =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 5)
    : []

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className="relative" ref={ref}>
      <div className="relative">
        <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <Input
          placeholder="جستجوی سریع..."
          value={query}
          onChange={(e) => { setQuery(e.target.value); setIsOpen(true); }}
          onFocus={() => setIsOpen(true)}
          className="pr-10 w-64"
        />
      </div>

      {isOpen && results.length > 0 && (
        <div className="absolute top-full right-0 w-80 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 mt-2 overflow-hidden z-50">
          {results.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.slug}`}
              onClick={() => { setIsOpen(false); setQuery(""); }}
              className="flex items-center gap-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
            >
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-lg">
                {product.category === "mobile" ? "📱" : "⌚"}
              </div>
              <div className="flex-1">
                <p className="font-medium text-sm dark:text-white">{product.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{product.category}</p>
              </div>
              <ArrowLeft className="w-4 h-4 text-gray-400" />
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
