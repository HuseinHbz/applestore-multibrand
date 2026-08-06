"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/lib/store/auth"
import { useOrdersStore } from "@/lib/store/orders"
import { useCatalogStore } from "@/lib/store/catalog"
import { Card } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { formatPrice, formatDate } from "@/lib/utils"
import { User, Package, Heart, MapPin, LogOut, Settings } from "lucide-react"
import Link from "next/link"

export default function ProfilePage() {
  const router = useRouter()
  const { user, isAuthenticated, logout } = useAuthStore()
  const { getOrdersByUser } = useOrdersStore()
  const { variants, products } = useCatalogStore()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated || !user) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-apple-blue border-t-transparent rounded-full" />
      </main>
    )
  }

  const orders = getOrdersByUser(user.id)

  return (
    <main className="min-h-screen py-12 px-4 max-w-5xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="md:col-span-1">
          <Card className="p-6 sticky top-24">
            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center text-4xl mx-auto mb-4">
                👤
              </div>
              <h2 className="font-bold text-lg">{user.name}</h2>
              <p className="text-sm text-gray-500">{user.email}</p>
              <Badge variant="secondary" className="mt-2">
                {user.role === "admin" ? "مدیر" : user.role === "staff" ? "پرسنل" : "مشتری"}
              </Badge>
            </div>

            <nav className="space-y-1">
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-apple-blue text-white text-sm font-medium">
                <Package className="w-4 h-4" />
                سفارشات
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-50 text-sm font-medium">
                <Heart className="w-4 h-4" />
                علاقه‌مندی‌ها
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-50 text-sm font-medium">
                <MapPin className="w-4 h-4" />
                آدرس‌ها
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-50 text-sm font-medium">
                <Settings className="w-4 h-4" />
                تنظیمات
              </button>
              <button 
                onClick={() => { logout(); router.push("/"); }}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 text-sm font-medium"
              >
                <LogOut className="w-4 h-4" />
                خروج
              </button>
            </nav>
          </Card>
        </div>

        {/* Content */}
        <div className="md:col-span-3">
          <h1 className="text-2xl font-bold text-apple-dark mb-6">سفارشات من</h1>

          {orders.length === 0 ? (
            <Card className="p-12 text-center">
              <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">سفارشی یافت نشد</h3>
              <p className="text-gray-500 mb-4">هنوز سفارشی ثبت نکرده‌اید</p>
              <Link href="/products">
                <Button>مشاهده محصولات</Button>
              </Link>
            </Card>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <Card key={order.id} className="p-6">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold">سفارش #{order.id}</span>
                        <Badge 
                          variant={order.status === "delivered" ? "success" : order.status === "pending" ? "warning" : "default"}
                        >
                          {order.status === "delivered" ? "تحویل شده" : order.status === "pending" ? "در انتظار" : "ارسال شده"}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-500">{formatDate(order.createdAt)}</p>
                    </div>
                    <span className="font-bold text-xl">{formatPrice(order.total)}</span>
                  </div>

                  <div className="border-t border-gray-100 pt-4">
                    <div className="space-y-2">
                      {order.items.map((item, idx) => {
                        const variant = variants.find((v) => v.id === item.variantId)
                        const product = variant ? products.find((p) => p.id === variant.productId) : null
                        return (
                          <div key={idx} className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-lg">
                              📱
                            </div>
                            <div className="flex-1">
                              <p className="text-sm font-medium">{product?.name || "محصول"}</p>
                              <p className="text-xs text-gray-500">
                                {variant?.color} / {variant?.storage} × {item.quantity}
                              </p>
                            </div>
                            <span className="text-sm font-medium">{formatPrice(item.price * item.quantity)}</span>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
