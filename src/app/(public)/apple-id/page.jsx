"use client"

import { useState } from "react"
import { Card } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { formatPrice } from "@/lib/utils"
import { Globe, Zap, Shield } from "lucide-react"

const plans = [
  {
    name: "Apple ID Standard",
    region: "آمریکا",
    price: 2500000,
    features: ["دسترسی به App Store آمریکا", "Apple Music", "iCloud ۵ گیگ رایگان", "پشتیبانی ۲۴ ساعته"],
    popular: false,
  },
  {
    name: "Apple ID Pro",
    region: "آمریکا",
    price: 4500000,
    features: ["دسترسی به App Store آمریکا", "Apple Music + TV+", "iCloud ۵۰ گیگ", "Apple Arcade", "پشتیبانی ویژه"],
    popular: true,
  },
  {
    name: "Apple ID Family",
    region: "آمریکا",
    price: 7500000,
    features: ["اشتراک ۶ نفره", "Apple One کامل", "iCloud ۲۰۰ گیگ", "Family Sharing", "پشتیبانی VIP"],
    popular: false,
  },
]

export default function AppleIdPage() {
  const [selectedPlan, setSelectedPlan] = useState(null)

  return (
    <main className="min-h-screen py-12 px-4 max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-apple-dark mb-4">
          فروشگاه Apple ID
        </h1>
        <p className="text-gray-500 max-w-xl mx-auto">
          اکانت آماده اپل با تحویل آنی و پشتیبانی کامل
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {plans.map((plan) => (
          <Card
            key={plan.name}
            className={`p-6 relative transition-all cursor-pointer ${
              selectedPlan?.name === plan.name
                ? "ring-2 ring-apple-blue shadow-xl"
                : "hover:shadow-lg"
            } ${plan.popular ? "border-apple-blue border-2" : ""}`}
            onClick={() => setSelectedPlan(plan)}
          >
            {plan.popular && (
              <Badge className="absolute -top-3 left-1/2 -translate-x-1/2" variant="default">
                پرفروش‌ترین
              </Badge>
            )}
            <div className="text-center mb-6">
              <div className="text-4xl mb-4">🍎</div>
              <h3 className="font-bold text-xl mb-2">{plan.name}</h3>
              <div className="flex items-center justify-center gap-1 text-sm text-gray-500">
                <Globe className="w-4 h-4" />
                {plan.region}
              </div>
            </div>
            <div className="text-center mb-6">
              <span className="text-3xl font-bold">{formatPrice(plan.price)}</span>
              <span className="text-gray-500 text-sm"> / یک‌بار</span>
            </div>
            <ul className="space-y-3 mb-6">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-center gap-2 text-sm">
                  <Zap className="w-4 h-4 text-green-500 shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
            <Button className="w-full" variant={plan.popular ? "default" : "outline"}>
              انتخاب پلن
            </Button>
          </Card>
        ))}
      </div>

      <div className="bg-apple-gray rounded-2xl p-8 text-center">
        <Shield className="w-12 h-12 text-apple-blue mx-auto mb-4" />
        <h3 className="font-bold text-xl mb-2">ضمانت تحویل آنی</h3>
        <p className="text-gray-500 max-w-lg mx-auto">
          تمامی اکانت‌ها بلافاصله پس از پرداخت ارسال می‌شوند. در صورت بروز مشکل، ظرف ۲۴ ساعت اکانت جایگزین ارسال می‌گردد.
        </p>
      </div>
    </main>
  )
}
