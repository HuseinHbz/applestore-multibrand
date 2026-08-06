"use client"

import { formatPrice } from "@/lib/utils"

export function InvoiceTemplate({ order, variants, products, branch }) {
  if (!order) return null

  return (
    <div className="bg-white p-8 max-w-2xl mx-auto" id="invoice-print">
      <div className="border-b-2 border-gray-800 pb-4 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">🍎 Apple Store Iran</h1>
            <p className="text-sm text-gray-500">فروشگاه رسمی محصولات اپل</p>
          </div>
          <div className="text-left">
            <h2 className="text-xl font-bold">فاکتور فروش</h2>
            <p className="text-sm text-gray-500">#{order.id}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8 mb-6 text-sm">
        <div>
          <h4 className="font-bold mb-2">فروشنده:</h4>
          <p>Apple Store Iran</p>
          <p>تهران، خیابان ونک</p>
          <p>تلفن: ۰۲۱-۸۸۷۷۶۶۵۵</p>
        </div>
        <div>
          <h4 className="font-bold mb-2">خریدار:</h4>
          <p>شناسه: {order.userId}</p>
          <p>تاریخ: {order.createdAt}</p>
          {branch && <p>شعبه: {branch.name}</p>}
        </div>
      </div>

      <table className="w-full mb-6">
        <thead>
          <tr className="border-b-2 border-gray-800">
            <th className="text-right py-2">ردیف</th>
            <th className="text-right py-2">شرح کالا</th>
            <th className="text-center py-2">تعداد</th>
            <th className="text-left py-2">قیمت واحد</th>
            <th className="text-left py-2">قیمت کل</th>
          </tr>
        </thead>
        <tbody>
          {order.items.map((item, idx) => {
            const variant = variants?.find((v) => v.id === item.variantId)
            const product = variant ? products?.find((p) => p.id === variant.productId) : null
            return (
              <tr key={idx} className="border-b border-gray-200">
                <td className="py-3">{idx + 1}</td>
                <td className="py-3">
                  {product?.name} ({variant?.color} / {variant?.storage})
                </td>
                <td className="py-3 text-center">{item.quantity}</td>
                <td className="py-3 text-left">{formatPrice(item.price)}</td>
                <td className="py-3 text-left">{formatPrice(item.price * item.quantity)}</td>
              </tr>
            )
          })}
        </tbody>
      </table>

      <div className="border-t-2 border-gray-800 pt-4">
        <div className="flex justify-between text-lg font-bold">
          <span>جمع کل:</span>
          <span>{formatPrice(order.total)}</span>
        </div>
      </div>

      <div className="mt-8 text-center text-sm text-gray-500">
        <p>با تشکر از خرید شما</p>
        <p>برای پشتیبانی با شماره ۰۲۱-۸۸۷۷۶۶۵۵ تماس بگیرید</p>
      </div>
    </div>
  )
}
