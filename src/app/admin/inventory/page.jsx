"use client"

import { useState } from "react"
import { useCatalogStore } from "@/lib/store/catalog"
import { useBranchesStore } from "@/lib/store/branches"
import { Card } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { Package, ArrowRightLeft } from "lucide-react"

export default function AdminInventoryPage() {
  const { products, variants } = useCatalogStore()
  const { branches } = useBranchesStore()
  const [selectedBranch, setSelectedBranch] = useState(branches[0]?.id)

  // Mock inventory data
  const inventory = variants.map((v) => ({
    ...v,
    qty: Math.floor(Math.random() * 20) + 1,
    product: products.find((p) => p.id === v.productId),
  }))

  const lowStock = inventory.filter((i) => i.qty < 5)

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">مدیریت انبار</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">کل موجودی</p>
              <p className="text-2xl font-bold">{inventory.reduce((sum, i) => sum + i.qty, 0)}</p>
            </div>
            <Package className="w-8 h-8 text-apple-blue" />
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">کم‌موجودی</p>
              <p className="text-2xl font-bold text-orange-600">{lowStock.length}</p>
            </div>
            <Package className="w-8 h-8 text-orange-500" />
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">شعب</p>
              <p className="text-2xl font-bold">{branches.length}</p>
            </div>
            <ArrowRightLeft className="w-8 h-8 text-green-500" />
          </div>
        </Card>
      </div>

      <Card>
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-sm font-medium">شعبه:</span>
            <select
              value={selectedBranch}
              onChange={(e) => setSelectedBranch(e.target.value)}
              className="h-9 rounded-lg border border-gray-300 px-3 text-sm"
            >
              {branches.map((b) => (
                <option key={b.id} value={b.id}>{b.name}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">محصول</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">واریانت</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">SKU</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">موجودی</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">وضعیت</th>
              </tr>
            </thead>
            <tbody>
              {inventory.map((item) => (
                <tr key={item.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                  <td className="py-3 px-4 font-medium">{item.product?.name}</td>
                  <td className="py-3 px-4 text-sm">{item.color} / {item.storage}</td>
                  <td className="py-3 px-4 text-sm text-gray-500">{item.sku}</td>
                  <td className="py-3 px-4 font-bold">{item.qty}</td>
                  <td className="py-3 px-4">
                    <Badge variant={item.qty < 5 ? "warning" : item.qty === 0 ? "destructive" : "success"}>
                      {item.qty < 5 ? "کم موجود" : item.qty === 0 ? "ناموجود" : "موجود"}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
