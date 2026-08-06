"use client"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { useCartStore } from "@/lib/store/cart"
import { useWishlistStore } from "@/lib/store/wishlist"
import { useCompareStore } from "@/lib/store/compare"
import { useCatalogStore } from "@/lib/store/catalog"
import { useReviewsStore } from "@/lib/store/reviews"
import { StarRating } from "@/components/shared/StarRating"
import { formatPrice } from "@/lib/utils"
import { ShoppingCart, Heart, Scale } from "lucide-react"

export function ProductCard({ product }) {
  const { addItem } = useCartStore()
  const { toggleWishlist, isInWishlist } = useWishlistStore()
  const { toggleCompare, isInCompare } = useCompareStore()
  const { getVariantsByProduct } = useCatalogStore()
  const { getAverageRating } = useReviewsStore()

  const variants = getVariantsByProduct(product.id)
  const firstVariant = variants[0]
  const price = firstVariant?.price || 0
  const avgRating = getAverageRating(product.id)

  return (
    <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 relative">
      {/* Actions overlay */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={(e) => { e.preventDefault(); toggleWishlist(product.id); }}
          className={`w-9 h-9 rounded-full flex items-center justify-center shadow-lg transition ${
            isInWishlist(product.id) ? "bg-red-500 text-white" : "bg-white text-gray-600 hover:bg-red-50 hover:text-red-500"
          }`}
        >
          <Heart className={`w-4 h-4 ${isInWishlist(product.id) ? "fill-current" : ""}`} />
        </button>
        <button
          onClick={(e) => { e.preventDefault(); toggleCompare(product.id); }}
          className={`w-9 h-9 rounded-full flex items-center justify-center shadow-lg transition ${
            isInCompare(product.id) ? "bg-purple-500 text-white" : "bg-white text-gray-600 hover:bg-purple-50 hover:text-purple-500"
          }`}
        >
          <Scale className="w-4 h-4" />
        </button>
      </div>

      <Link href={`/products/${product.slug}`}>
        <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center relative overflow-hidden">
          <span className="text-6xl group-hover:scale-110 transition-transform duration-500">
            {product.category === "mobile" ? "📱" : 
             product.category === "laptop" ? "💻" :
             product.category === "tablet" ? "📟" : "⌚"}
          </span>
          {product.featured && (
            <Badge className="absolute top-3 right-3" variant="default">
              ویژه
            </Badge>
          )}
        </div>
      </Link>

      <CardContent className="p-5">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-xs text-gray-500">{product.brand}</span>
          {avgRating > 0 && <StarRating rating={avgRating} size="sm" />}
        </div>
        <Link href={`/products/${product.slug}`}>
          <h3 className="font-semibold text-lg mb-2 group-hover:text-apple-blue transition dark:text-white">
            {product.name}
          </h3>
        </Link>
        <p className="text-gray-500 text-sm mb-4 line-clamp-2 dark:text-gray-400">{product.description}</p>

        <div className="flex items-center justify-between">
          <span className="font-bold text-lg dark:text-white">{formatPrice(price)}</span>
          <Button 
            size="sm" 
            onClick={() => firstVariant && addItem(firstVariant.id)}
            disabled={!firstVariant}
          >
            <ShoppingCart className="w-4 h-4 ml-2" />
            خرید
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
