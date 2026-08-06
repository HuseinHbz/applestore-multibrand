"use client"

import { Card } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { Shield, UserCog, Lock } from "lucide-react"

const permissions = [
  { action: "مشاهده داشبورد", admin: true, manager: true, staff: true },
  { action: "مدیریت محصولات", admin: true, manager: true, staff: false },
  { action: "مدیریت انبار", admin: true, manager: true, staff: true },
  { action: "فاکتور فروش", admin: true, manager: true, staff: true },
  { action: "فاکتور خرید", admin: true, manager: false, staff: false },
  { action: "مدیریت شعب", admin: true, manager: false, staff: false },
  { action: "مدیریت محتوا", admin: true, manager: true, staff: false },
  { action: "مدیریت کاربران", admin: true, manager: false, staff: false },
  { action: "تنظیمات برند", admin: true, manager: false, staff: false },
]

export default function AdminStaffPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">پرسنل و دسترسی‌ها</h1>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-right py-4 px-4 text-sm font-medium">دسترسی / نقش</th>
                <th className="text-center py-4 px-4 text-sm font-medium">
                  <div className="flex items-center justify-center gap-1">
                    <Shield className="w-4 h-4 text-red-500" />
                    مدیر
                  </div>
                </th>
                <th className="text-center py-4 px-4 text-sm font-medium">
                  <div className="flex items-center justify-center gap-1">
                    <UserCog className="w-4 h-4 text-orange-500" />
                    مدیر شعبه
                  </div>
                </th>
                <th className="text-center py-4 px-4 text-sm font-medium">
                  <div className="flex items-center justify-center gap-1">
                    <Lock className="w-4 h-4 text-blue-500" />
                    پرسنل
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {permissions.map((perm, i) => (
                <tr key={i} className="border-b border-gray-50 hover:bg-gray-50/50">
                  <td className="py-4 px-4 font-medium">{perm.action}</td>
                  <td className="py-4 px-4 text-center">
                    {perm.admin ? <Badge variant="success">✓</Badge> : <Badge variant="secondary">✗</Badge>}
                  </td>
                  <td className="py-4 px-4 text-center">
                    {perm.manager ? <Badge variant="success">✓</Badge> : <Badge variant="secondary">✗</Badge>}
                  </td>
                  <td className="py-4 px-4 text-center">
                    {perm.staff ? <Badge variant="success">✓</Badge> : <Badge variant="secondary">✗</Badge>}
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
