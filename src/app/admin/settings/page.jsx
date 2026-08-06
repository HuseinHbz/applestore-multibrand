"use client"

import { useState } from "react"
import { useSettingsStore } from "@/lib/store/settings"
import { Card } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Badge } from "@/components/ui/Badge"
import { brandColors } from "@/lib/brand/config"
import { Palette, Type, Globe, Save } from "lucide-react"

export default function AdminSettingsPage() {
  const { brand, updateBrand } = useSettingsStore()
  const [formData, setFormData] = useState(brand)

  const handleSave = () => {
    updateBrand(formData)
    if (typeof document !== "undefined") {
      document.documentElement.style.setProperty("--brand-500", formData.primaryColor)
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">تنظیمات برند</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <Type className="w-5 h-5 text-apple-blue" />
              <h3 className="font-bold text-lg">اطلاعات اصلی</h3>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">نام برند</label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">شعار</label>
                <Input
                  value={formData.slogan}
                  onChange={(e) => setFormData({ ...formData, slogan: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">واحد پول</label>
                <Input
                  value={formData.currency}
                  onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">دامنه</label>
                <Input
                  value={formData.domain}
                  onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
                />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <Palette className="w-5 h-5 text-apple-blue" />
              <h3 className="font-bold text-lg">رنگ برند</h3>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {Object.entries(brandColors).map(([name, color]) => (
                <button
                  key={name}
                  onClick={() => setFormData({ ...formData, primaryColor: color })}
                  className={`p-4 rounded-xl border-2 transition ${
                    formData.primaryColor === color ? "border-gray-800" : "border-transparent"
                  }`}
                >
                  <div
                    className="w-full h-8 rounded-lg mb-2"
                    style={{ backgroundColor: color }}
                  />
                  <div className="text-xs font-medium capitalize">{name}</div>
                </button>
              ))}
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium mb-2">کد رنگ سفارشی</label>
              <Input
                type="color"
                value={formData.primaryColor}
                onChange={(e) => setFormData({ ...formData, primaryColor: e.target.value })}
                className="h-12"
              />
            </div>
          </Card>
        </div>

        <div>
          <Card className="p-6 sticky top-24">
            <h3 className="font-bold text-lg mb-6">پیش‌نمایش</h3>

            <div className="border border-gray-200 rounded-2xl overflow-hidden mb-6">
              <div 
                className="h-16 flex items-center px-6 text-white font-bold"
                style={{ backgroundColor: formData.primaryColor }}
              >
                🍎 {formData.name}
              </div>
              <div className="p-6 bg-white">
                <h4 className="font-bold text-xl mb-2" style={{ color: formData.primaryColor }}>
                  iPhone 16 Pro
                </h4>
                <p className="text-gray-500 text-sm mb-4">{formData.slogan}</p>
                <button 
                  className="px-4 py-2 rounded-full text-white text-sm"
                  style={{ backgroundColor: formData.primaryColor }}
                >
                  خرید — ۸۹,۹۹۰,۰۰۰ {formData.currency}
                </button>
              </div>
            </div>

            <Button className="w-full" onClick={handleSave}>
              <Save className="w-4 h-4 mr-2" />
              ذخیره تغییرات
            </Button>
          </Card>
        </div>
      </div>
    </div>
  )
}
