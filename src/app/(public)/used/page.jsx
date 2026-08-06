"use client"

import { useState } from "react"
import { Card } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Badge } from "@/components/ui/Badge"
import { formatPrice } from "@/lib/utils"
import { Search, Filter, Phone } from "lucide-react"

const usedListings = [
  { id: 1, model: "iPhone 14 Pro", storage: "256GB", color: "Deep Purple", price: 48000000, condition: "بسیار خوب", battery: "۹۲٪", seller: "علی م" },
  { id: 2, model: "iPhone 13", storage: "128GB", color: "Midnight", price: 28000000, condition: "خوب", battery: "۸۵٪", seller: "سارا ک" },
  { id: 3, model: "iPhone 12 Pro Max", storage: "256GB", color: "Pacific Blue", price: 35000000, condition: "بسیار خوب", battery: "۸۸٪", seller: "محمد ر" },
  { id: 4, model: "iPhone 11", storage: "64GB", color: "Black", price: 15000000, condition: "قابل قبول", battery: "۷۸٪", seller: "نیلوفر س" },
]

export default function UsedPage() {
  const [search, setSearch] = useState("")
  const [showForm, setShowForm] = useState(false)

  const filtered = usedListings.filter((l) =>
    l.model.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <main className="min-h-screen py-12 px-4 max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-apple-dark mb-4">
          گوشی‌های کارکرده
        </h1>
        <p className="text-gray-500 max-w-xl mx-auto">
          خرید و فروش گوشی‌های دست‌دوم با ضمانت سلامت
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            placeholder="جستجو در آگهی‌ها..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pr-10"
          />
        </div>
        <Button onClick={() => setShowForm(!showForm)}>
          <Phone className="w-4 h-4 ml-2" />
          ثبت آگهی فروش
        </Button>
      </div>

      {showForm && (
        <Card className="p-6 mb-8 bg-blue-50/50 border-blue-200">
          <h3 className="font-bold text-lg mb-4">ثبت آگهی فروش گوشی</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input placeholder="مدل گوشی" />
            <Input placeholder="ظرفیت" />
            <Input placeholder="رنگ" />
            <Input placeholder="قیمت (تومان)" type="number" />
            <Input placeholder="سلامت باتری (٪)" type="number" />
            <Input placeholder="وضعیت ظاهری" />
          </div>
          <Button className="mt-4">ثبت آگهی</Button>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((item) => (
          <Card key={item.id} className="p-5 flex gap-4">
            <div className="w-24 h-24 bg-gray-100 rounded-xl flex items-center justify-center text-3xl shrink-0">
              📱
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-bold text-lg">{item.model}</h3>
                <Badge variant="secondary">{item.condition}</Badge>
              </div>
              <div className="text-sm text-gray-500 mb-2">
                {item.storage} / {item.color} / باتری {item.battery}
              </div>
              <div className="flex items-center justify-between">
                <span className="font-bold text-xl text-apple-blue">{formatPrice(item.price)}</span>
                <span className="text-sm text-gray-400">فروشنده: {item.seller}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </main>
  )
}
