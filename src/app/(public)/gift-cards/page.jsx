"use client"

import { useState } from "react"
import { Card } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { formatPrice } from "@/lib/utils"
import { Gift, MessageSquare, Palette } from "lucide-react"

const presetAmounts = [1000000, 2500000, 5000000, 10000000, 20000000]

const designs = [
  { name: "کلاسیک", emoji: "🎁", color: "bg-red-50" },
  { name: "تولد", emoji: "🎂", color: "bg-pink-50" },
  { name: "تبریک", emoji: "🎉", color: "bg-blue-50" },
  { name: "عاشقانه", emoji: "❤️", color: "bg-rose-50" },
]

export default function GiftCardsPage() {
  const [amount, setAmount] = useState(5000000)
  const [customAmount, setCustomAmount] = useState("")
  const [selectedDesign, setSelectedDesign] = useState(designs[0])
  const [message, setMessage] = useState("")

  const finalAmount = customAmount ? Number(customAmount) : amount

  return (
    <main className="min-h-screen py-12 px-4 max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-apple-dark mb-4">
          گیفت کارت اپل
        </h1>
        <p className="text-gray-500 max-w-xl mx-auto">
          هدیه‌ای مناسب برای عزیزان شما — قابل استفاده در App Store و iTunes
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          {/* Amount */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Gift className="w-5 h-5 text-apple-blue" />
              <h3 className="font-bold">مبلغ گیفت کارت</h3>
            </div>
            <div className="grid grid-cols-3 gap-2 mb-4">
              {presetAmounts.map((amt) => (
                <button
                  key={amt}
                  onClick={() => { setAmount(amt); setCustomAmount(""); }}
                  className={`py-3 rounded-xl border text-sm font-medium transition ${
                    amount === amt && !customAmount
                      ? "border-apple-blue bg-blue-50 text-apple-blue"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  {formatPrice(amt)}
                </button>
              ))}
            </div>
            <Input
              placeholder="مبلغ دلخواه (تومان)"
              value={customAmount}
              onChange={(e) => setCustomAmount(e.target.value)}
              type="number"
            />
          </Card>

          {/* Design */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Palette className="w-5 h-5 text-apple-blue" />
              <h3 className="font-bold">طرح کارت</h3>
            </div>
            <div className="grid grid-cols-4 gap-3">
              {designs.map((design) => (
                <button
                  key={design.name}
                  onClick={() => setSelectedDesign(design)}
                  className={`p-4 rounded-xl border text-center transition ${
                    selectedDesign.name === design.name
                      ? "border-apple-blue ring-2 ring-apple-blue/20"
                      : "border-gray-200 hover:border-gray-300"
                  } ${design.color}`}
                >
                  <div className="text-3xl mb-2">{design.emoji}</div>
                  <div className="text-xs font-medium">{design.name}</div>
                </button>
              ))}
            </div>
          </Card>

          {/* Message */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <MessageSquare className="w-5 h-5 text-apple-blue" />
              <h3 className="font-bold">پیام هدیه</h3>
            </div>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="پیام خود را بنویسید..."
              className="w-full h-24 rounded-lg border border-gray-300 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-apple-blue"
            />
          </Card>
        </div>

        {/* Preview */}
        <div>
          <Card className="p-6 sticky top-24">
            <h3 className="font-bold text-lg mb-6">پیش‌نمایش</h3>

            <div className={`rounded-2xl p-8 text-center mb-6 ${selectedDesign.color} border-2 border-dashed border-gray-300`}>
              <div className="text-6xl mb-4">{selectedDesign.emoji}</div>
              <div className="text-2xl font-bold mb-2">{formatPrice(finalAmount)}</div>
              <div className="text-sm text-gray-500">گیفت کارت App Store</div>
              {message && (
                <div className="mt-4 p-3 bg-white/60 rounded-lg text-sm italic">
                  "{message}"
                </div>
              )}
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">مبلغ</span>
                <span>{formatPrice(finalAmount)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">کارمزد</span>
                <span>رایگان</span>
              </div>
              <div className="border-t border-gray-100 pt-3 flex justify-between font-bold text-lg">
                <span>مبلغ قابل پرداخت</span>
                <span>{formatPrice(finalAmount)}</span>
              </div>
            </div>

            <Button className="w-full rounded-full" size="lg">
              خرید گیفت کارت
            </Button>
          </Card>
        </div>
      </div>
    </main>
  )
}
