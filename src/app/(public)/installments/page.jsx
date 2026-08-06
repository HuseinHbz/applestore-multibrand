"use client"

import { useState, useMemo } from "react"
import { Card } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { formatPrice } from "@/lib/utils"
import { Calculator, Calendar, Percent } from "lucide-react"

export default function InstallmentsPage() {
  const [amount, setAmount] = useState(50000000)
  const [downPayment, setDownPayment] = useState(10000000)
  const [months, setMonths] = useState(12)
  const [rate, setRate] = useState(18)

  const result = useMemo(() => {
    const principal = amount - downPayment
    const monthlyRate = rate / 100 / 12
    const monthlyPayment = principal * (monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1)
    const totalPayment = monthlyPayment * months
    const totalInterest = totalPayment - principal

    return {
      monthlyPayment: Math.round(monthlyPayment),
      totalPayment: Math.round(totalPayment),
      totalInterest: Math.round(totalInterest),
    }
  }, [amount, downPayment, months, rate])

  return (
    <main className="min-h-screen py-12 px-4 max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-apple-dark mb-4">
          محاسبه‌گر اقساط
        </h1>
        <p className="text-gray-500 max-w-xl mx-auto">
          مبلغ مورد نظر خود را وارد کنید و شرایط اقساط را مشاهده کنید
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <Card className="p-6">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">مبلغ کل (تومان)</label>
                <Input
                  type="number"
                  value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                  min={1000000}
                  step={1000000}
                />
                <input
                  type="range"
                  min="10000000"
                  max="200000000"
                  step="1000000"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="w-full mt-2 accent-apple-blue"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">پیش‌پرداخت (تومان)</label>
                <Input
                  type="number"
                  value={downPayment}
                  onChange={(e) => setDownPayment(Number(e.target.value))}
                  min={0}
                  step={1000000}
                />
                <input
                  type="range"
                  min="0"
                  max={amount}
                  step="1000000"
                  value={downPayment}
                  onChange={(e) => setDownPayment(Number(e.target.value))}
                  className="w-full mt-2 accent-apple-blue"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">تعداد ماه</label>
                <div className="flex gap-2">
                  {[6, 12, 18, 24].map((m) => (
                    <button
                      key={m}
                      onClick={() => setMonths(m)}
                      className={`flex-1 py-2 rounded-lg border text-sm font-medium transition ${
                        months === m
                          ? "border-apple-blue bg-blue-50 text-apple-blue"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      {m} ماه
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">نرخ سود سالانه (٪)</label>
                <Input
                  type="number"
                  value={rate}
                  onChange={(e) => setRate(Number(e.target.value))}
                  min={0}
                  max={50}
                />
              </div>
            </div>
          </Card>
        </div>

        <div>
          <Card className="p-6 sticky top-24 bg-gradient-to-br from-apple-dark to-gray-800 text-white">
            <h3 className="font-bold text-lg mb-6">خلاصه اقساط</h3>

            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-white/10">
                <span className="text-gray-300">مبلغ کل</span>
                <span className="font-bold">{formatPrice(amount)}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-white/10">
                <span className="text-gray-300">پیش‌پرداخت</span>
                <span className="font-bold">{formatPrice(downPayment)}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-white/10">
                <span className="text-gray-300">مبلغ اقساط</span>
                <span className="font-bold">{formatPrice(amount - downPayment)}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-white/10">
                <span className="text-gray-300">سود کل</span>
                <span className="font-bold text-yellow-400">{formatPrice(result.totalInterest)}</span>
              </div>
              <div className="flex justify-between items-center py-4 bg-white/10 rounded-xl px-4">
                <span className="font-medium">قسط ماهانه</span>
                <span className="text-2xl font-bold text-apple-blue">{formatPrice(result.monthlyPayment)}</span>
              </div>
            </div>

            <Button className="w-full mt-6 bg-white text-apple-dark hover:bg-gray-100 rounded-full" size="lg">
              درخواست اقساط
            </Button>
          </Card>
        </div>
      </div>
    </main>
  )
}
