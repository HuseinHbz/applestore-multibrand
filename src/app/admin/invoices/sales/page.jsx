"use client"

import { useState } from "react"
import { useInvoicesStore } from "@/lib/store/invoices"
import { useOrdersStore } from "@/lib/store/orders"
import { Card } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { formatPrice } from "@/lib/utils"
import { FileText, Plus, Printer } from "lucide-react"

export default function AdminSalesInvoicesPage() {
  const { salesInvoices, createSalesInvoice } = useInvoicesStore()
  const { orders } = useOrdersStore()
  const [showForm, setShowForm] = useState(false)

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">فاکتورهای فروش</h1>
        <Button onClick={() => setShowForm(!showForm)}>
          <Plus className="w-4 h-4 ml-2" />
          فاکتور جدید
        </Button>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">شماره</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">مشتری</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">مبلغ</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">تاریخ</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">عملیات</th>
              </tr>
            </thead>
            <tbody>
              {salesInvoices.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-gray-500">
                    <FileText className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                    فاکتوری ثبت نشده است
                  </td>
                </tr>
              )}
              {salesInvoices.map((inv) => (
                <tr key={inv.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                  <td className="py-3 px-4 font-medium">{inv.id}</td>
                  <td className="py-3 px-4 text-sm">{inv.customerName || "-"}</td>
                  <td className="py-3 px-4 font-bold">{formatPrice(inv.total || 0)}</td>
                  <td className="py-3 px-4 text-sm text-gray-500">{inv.createdAt?.split("T")[0]}</td>
                  <td className="py-3 px-4">
                    <button className="p-2 hover:bg-gray-100 rounded-lg">
                      <Printer className="w-4 h-4 text-gray-600" />
                    </button>
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
