"use client"

import { useState } from "react"
import { useInvoicesStore } from "@/lib/store/invoices"
import { Card } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { formatPrice } from "@/lib/utils"
import { FileText, Plus, Printer } from "lucide-react"

export default function AdminPurchaseInvoicesPage() {
  const { purchaseInvoices } = useInvoicesStore()

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">فاکتورهای خرید</h1>
        <Button>
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
                <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">تأمین‌کننده</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">مبلغ</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">تاریخ</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">عملیات</th>
              </tr>
            </thead>
            <tbody>
              {purchaseInvoices.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-gray-500">
                    <FileText className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                    فاکتوری ثبت نشده است
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
