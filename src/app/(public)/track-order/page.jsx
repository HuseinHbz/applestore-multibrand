"use client"

import { useState } from "react"
import { useOrdersStore } from "@/lib/store/orders"
import { useCatalogStore } from "@/lib/store/catalog"
import { Card } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Badge } from "@/components/ui/Badge"
import { formatPrice } from "@/lib/utils"
import { Search, Package, Truck, CheckCircle, Clock } from "lucide-react"

const statusSteps = [
  { status: "pending", label: "ثبت شد", icon: <Clock className="w-5 h-5" /> },
  { status: "processing", label: "در حال پردازش", icon: <Package className="w-5 h-5" /> },
  { status: "shipped", label: "ارسال شد", icon: <Truck className="w-5 h-5" /> },
  { status: "delivered", label: "تحویل شد", icon: <CheckCircle className="w-5 h-5" /> },
]

export default function TrackOrderPage() {
  const { orders } = useOrdersStore()
  const { variants, products } = useCatalogStore()
  const [orderId, setOrderId] = useState("")
  const [result, setResult] = useState(null)
  const [notFound, setNotFound] = useState(false)

  const handleSearch = () => {
    const order = orders.find((o) => o.id === orderId)
    if (order) {
      setResult(order)
      setNotFound(false)
    } else {
      setResult(null)
      setNotFound(true)
    }
  }

  const getStatusIndex = (status) => {
    return statusSteps.findIndex((s) => s.status === status)
  }

  return (
    <main className="min-h-screen py-12 px-4 max-w-3xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-apple-dark mb-4">پیگیری سفارش</h1>
        <p className="text-gray-500">شماره سفارش خود را وارد کنید</p>
      </div>

      <Card className="p-6 mb-8">
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              placeholder="مثلاً: o1"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              className="pr-10"
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
          </div>
          <Button onClick={handleSearch}>جستجو</Button>
        </div>
      </Card>

      {notFound && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-lg font-semibold text-gray-600">سفارشی با این شماره یافت نشد</h3>
        </div>
      )}

      {result && (
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-bold text-lg">سفارش #{result.id}</h3>
              <p className="text-sm text-gray-500">{result.createdAt}</p>
            </div>
            <Badge 
              variant={result.status === "delivered" ? "success" : result.status === "pending" ? "warning" : "default"}
            >
              {result.status === "delivered" ? "تحویل شده" : result.status === "pending" ? "در انتظار" : "ارسال شده"}
            </Badge>
          </div>

          <div className="mb-8">
            <div className="flex items-center justify-between relative">
              <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -translate-y-1/2 rounded-full" />
              <div 
                className="absolute top-1/2 left-0 h-1 bg-apple-blue -translate-y-1/2 rounded-full transition-all"
                style={{ width: `${(getStatusIndex(result.status) / (statusSteps.length - 1)) * 100}%` }}
              />
              {statusSteps.map((step, index) => {
                const isActive = index <= getStatusIndex(result.status)
                return (
                  <div key={step.status} className="relative z-10 flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center transition ${
                      isActive ? "bg-apple-blue text-white" : "bg-gray-200 text-gray-400"
                    }`}>
                      {step.icon}
                    </div>
                    <span className={`text-xs mt-2 font-medium ${isActive ? "text-apple-blue" : "text-gray-400"}`}>
                      {step.label}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold mb-3">اقلام سفارش</h4>
            {result.items.map((item, idx) => {
              const variant = variants.find((v) => v.id === item.variantId)
              const product = variant ? products.find((p) => p.id === variant.productId) : null
              return (
                <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center text-xl">📱</div>
                  <div className="flex-1">
                    <p className="font-medium">{product?.name}</p>
                    <p className="text-sm text-gray-500">{variant?.color} / {variant?.storage} × {item.quantity}</p>
                  </div>
                  <span className="font-bold">{formatPrice(item.price * item.quantity)}</span>
                </div>
              )
            })}
          </div>

          <div className="border-t border-gray-100 mt-4 pt-4 flex justify-between font-bold text-lg">
            <span>جمع کل</span>
            <span>{formatPrice(result.total)}</span>
          </div>
        </Card>
      )}
    </main>
  )
}
