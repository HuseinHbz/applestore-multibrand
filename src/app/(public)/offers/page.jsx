"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { formatPrice } from "@/lib/utils"
import { Timer, Percent, ArrowLeft } from "lucide-react"
import Link from "next/link"

const offers = [
  { id: 1, title: "تخفیف ویژه iPhone 15", discount: 15, oldPrice: 55000000, newPrice: 46750000, endDate: "2024-12-31", image: "📱" },
  { id: 2, title: "AirPods Pro 2 هدیه", discount: 0, description: "با خرید MacBook Pro، AirPods Pro 2 هدیه بگیرید", endDate: "2024-11-30", image: "🎧" },
  { id: 3, title: "جمعه سیاه", discount: 25, oldPrice: 89990000, newPrice: 67492500, endDate: "2024-11-29", image: "🛍️" },
]

function Countdown({ targetDate }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date()
      const target = new Date(targetDate)
      const diff = target - now

      if (diff <= 0) {
        clearInterval(interval)
        return
      }

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [targetDate])

  return (
    <div className="flex gap-2">
      {Object.entries(timeLeft).map(([unit, value]) => (
        <div key={unit} className="bg-apple-dark text-white rounded-lg px-3 py-2 text-center min-w-[60px]">
          <div className="text-xl font-bold">{String(value).padStart(2, "0")}</div>
          <div className="text-xs text-gray-400">{unit === "days" ? "روز" : unit === "hours" ? "ساعت" : unit === "minutes" ? "دقیقه" : "ثانیه"}</div>
        </div>
      ))}
    </div>
  )
}

export default function OffersPage() {
  return (
    <main className="min-h-screen py-12 px-4 max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-apple-dark mb-4">پیشنهادهای ویژه</h1>
        <p className="text-gray-500">فرصت‌های استثنایی با تخفیف‌های ویژه</p>
      </div>

      <div className="space-y-8">
        {offers.map((offer) => (
          <Card key={offer.id} className="p-6 overflow-hidden relative">
            {offer.discount > 0 && (
              <div className="absolute top-4 left-4 bg-red-500 text-white rounded-full w-16 h-16 flex items-center justify-center font-bold text-lg -rotate-12">
                {offer.discount}%
              </div>
            )}

            <div className="flex flex-col md:flex-row gap-6">
              <div className="w-full md:w-48 h-48 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl flex items-center justify-center text-6xl shrink-0">
                {offer.image}
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-apple-dark mb-3">{offer.title}</h3>
                {offer.description && (
                  <p className="text-gray-600 mb-4">{offer.description}</p>
                )}
                {offer.oldPrice && (
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-gray-400 line-through">{formatPrice(offer.oldPrice)}</span>
                    <span className="text-2xl font-bold text-apple-blue">{formatPrice(offer.newPrice)}</span>
                  </div>
                )}
                <div className="mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                    <Timer className="w-4 h-4" />
                    زمان باقی‌مانده:
                  </div>
                  <Countdown targetDate={offer.endDate} />
                </div>
                <Button>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  مشاهده جزئیات
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </main>
  )
}
