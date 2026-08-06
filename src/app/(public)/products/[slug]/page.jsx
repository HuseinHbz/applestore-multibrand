"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { useCatalogStore } from "@/lib/store/catalog"
import { useCartStore } from "@/lib/store/cart"
import { useReviewsStore } from "@/lib/store/reviews"
import { useWishlistStore } from "@/lib/store/wishlist"
import { useCompareStore } from "@/lib/store/compare"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { Card } from "@/components/ui/Card"
import { Input } from "@/components/ui/Input"
import { StarRating } from "@/components/shared/StarRating"
import { Breadcrumbs } from "@/components/shared/Breadcrumbs"
import { formatPrice } from "@/lib/utils"
import { ShoppingCart, Check, ArrowLeft, Heart, Scale, MessageCircle } from "lucide-react"
import Link from "next/link"

export default function ProductDetailPage() {
  const params = useParams()
  const { getProductBySlug, getVariantsByProduct } = useCatalogStore()
  const { addItem } = useCartStore()
  const { getReviewsByProduct, getAverageRating, addReview } = useReviewsStore()
  const { toggleWishlist, isInWishlist } = useWishlistStore()
  const { toggleCompare, isInCompare } = useCompareStore()

  const [selectedVariant, setSelectedVariant] = useState(null)
  const [addedToCart, setAddedToCart] = useState(false)
  const [newReview, setNewReview] = useState({ rating: 5, comment: "", userName: "" })
  const [showReviewForm, setShowReviewForm] = useState(false)

  const product = getProductBySlug(params.slug)
  const variants = product ? getVariantsByProduct(product.id) : []
  const reviews = product ? getReviewsByProduct(product.id) : []
  const avgRating = product ? getAverageRating(product.id) : 0

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😕</div>
          <h1 className="text-2xl font-bold mb-2">محصول یافت نشد</h1>
          <Link href="/products">
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              بازگشت به محصولات
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  const currentVariant = selectedVariant || variants[0]
  const handleAddToCart = () => {
    if (currentVariant) {
      addItem(currentVariant.id)
      setAddedToCart(true)
      setTimeout(() => setAddedToCart(false), 2000)
    }
  }

  const handleSubmitReview = () => {
    if (newReview.comment && newReview.userName) {
      addReview({
        productId: product.id,
        ...newReview,
      })
      setNewReview({ rating: 5, comment: "", userName: "" })
      setShowReviewForm(false)
    }
  }

  const colors = [...new Set(variants.map((v) => v.color))]
  const storages = [...new Set(variants.map((v) => v.storage))]

  return (
    <main className="min-h-screen py-12 px-4 max-w-7xl mx-auto">
      <Breadcrumbs />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        {/* Product Image */}
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-3xl aspect-square flex items-center justify-center relative">
          <span className="text-9xl">
            {product.category === "mobile" ? "📱" : 
             product.category === "laptop" ? "💻" :
             product.category === "tablet" ? "📟" : "⌚"}
          </span>
          <div className="absolute top-4 left-4 flex gap-2">
            <button
              onClick={() => toggleWishlist(product.id)}
              className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition ${
                isInWishlist(product.id) ? "bg-red-500 text-white" : "bg-white text-gray-600"
              }`}
            >
              <Heart className={`w-5 h-5 ${isInWishlist(product.id) ? "fill-current" : ""}`} />
            </button>
            <button
              onClick={() => toggleCompare(product.id)}
              className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition ${
                isInCompare(product.id) ? "bg-purple-500 text-white" : "bg-white text-gray-600"
              }`}
            >
              <Scale className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Product Info */}
        <div>
          <div className="mb-4">
            <Badge variant="secondary" className="mb-3">{product.brand}</Badge>
            <h1 className="text-3xl md:text-4xl font-bold text-apple-dark dark:text-white mb-4">
              {product.name}
            </h1>
            {avgRating > 0 && (
              <div className="flex items-center gap-2 mb-3">
                <StarRating rating={avgRating} />
                <span className="text-sm text-gray-500">({reviews.length} نظر)</span>
              </div>
            )}
            <p className="text-gray-500 dark:text-gray-400 text-lg leading-relaxed">
              {product.description}
            </p>
          </div>

          <div className="mb-8">
            <span className="text-3xl font-bold dark:text-white">
              {currentVariant ? formatPrice(currentVariant.price) : "ناموجود"}
            </span>
            {currentVariant?.sku && (
              <p className="text-sm text-gray-400 mt-1">کد: {currentVariant.sku}</p>
            )}
          </div>

          {colors.length > 1 && (
            <div className="mb-6">
              <h3 className="font-semibold mb-3 dark:text-white">رنگ</h3>
              <div className="flex gap-2">
                {colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => {
                      const variant = variants.find((v) => v.color === color)
                      setSelectedVariant(variant)
                    }}
                    className={`px-4 py-2 rounded-lg border text-sm transition ${
                      currentVariant?.color === color
                        ? "border-apple-blue bg-blue-50 text-apple-blue dark:bg-blue-900/30"
                        : "border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:text-gray-300"
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}

          {storages.length > 1 && storages[0] !== "-" && (
            <div className="mb-8">
              <h3 className="font-semibold mb-3 dark:text-white">ظرفیت</h3>
              <div className="flex gap-2">
                {storages.map((storage) => (
                  <button
                    key={storage}
                    onClick={() => {
                      const variant = variants.find(
                        (v) => v.storage === storage && v.color === currentVariant?.color
                      ) || variants.find((v) => v.storage === storage)
                      if (variant) setSelectedVariant(variant)
                    }}
                    className={`px-4 py-2 rounded-lg border text-sm transition ${
                      currentVariant?.storage === storage
                        ? "border-apple-blue bg-blue-50 text-apple-blue dark:bg-blue-900/30"
                        : "border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:text-gray-300"
                    }`}
                  >
                    {storage}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-4">
            <Button
              size="lg"
              className="flex-1 rounded-full"
              onClick={handleAddToCart}
              disabled={!currentVariant}
            >
              {addedToCart ? (
                <>
                  <Check className="w-5 h-5 ml-2" />
                  افزوده شد
                </>
              ) : (
                <>
                  <ShoppingCart className="w-5 h-5 ml-2" />
                  افزودن به سبد خرید
                </>
              )}
            </Button>
          </div>

          <Card className="mt-8">
            <div className="p-6">
              <h3 className="font-semibold text-lg mb-4 dark:text-white">مشخصات فنی</h3>
              <div className="space-y-3">
                {Object.entries(product.specs).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-2 border-b border-gray-50 dark:border-gray-800 last:border-0">
                    <span className="text-gray-500 dark:text-gray-400 capitalize">{key}</span>
                    <span className="font-medium dark:text-gray-300">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="max-w-3xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold dark:text-white flex items-center gap-2">
            <MessageCircle className="w-6 h-6" />
            نظرات کاربران
            {reviews.length > 0 && <span className="text-gray-400 text-lg">({reviews.length})</span>}
          </h2>
          <Button variant="outline" onClick={() => setShowReviewForm(!showReviewForm)}>
            نوشتن نظر
          </Button>
        </div>

        {showReviewForm && (
          <Card className="p-6 mb-6">
            <h3 className="font-bold mb-4">ثبت نظر جدید</h3>
            <div className="space-y-4">
              <Input
                placeholder="نام شما"
                value={newReview.userName}
                onChange={(e) => setNewReview({ ...newReview, userName: e.target.value })}
              />
              <div>
                <label className="block text-sm font-medium mb-2">امتیاز</label>
                <StarRating 
                  rating={newReview.rating} 
                  interactive 
                  size="md"
                  onRate={(r) => setNewReview({ ...newReview, rating: r })} 
                />
              </div>
              <textarea
                placeholder="نظر خود را بنویسید..."
                value={newReview.comment}
                onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                className="w-full h-24 rounded-lg border border-gray-300 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-apple-blue"
              />
              <Button onClick={handleSubmitReview}>ثبت نظر</Button>
            </div>
          </Card>
        )}

        <div className="space-y-4">
          {reviews.map((review) => (
            <Card key={review.id} className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center font-bold text-sm">
                    {review.userName.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-semibold dark:text-white">{review.userName}</h4>
                    <p className="text-xs text-gray-400">{review.date}</p>
                  </div>
                </div>
                <StarRating rating={review.rating} size="sm" />
              </div>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{review.comment}</p>
            </Card>
          ))}
          {reviews.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              هنوز نظری ثبت نشده است. اولین نفر باشید!
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
