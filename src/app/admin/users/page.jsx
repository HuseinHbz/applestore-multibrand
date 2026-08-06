"use client"

import { useState } from "react"
import { useAuthStore } from "@/lib/store/auth"
import { Card } from "@/components/ui/Card"
import { Input } from "@/components/ui/Input"
import { Badge } from "@/components/ui/Badge"
import { Search, Users, Shield } from "lucide-react"

export default function AdminUsersPage() {
  const { users } = useAuthStore()
  const [search, setSearch] = useState("")

  const filtered = users.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  )

  const roleColors = {
    admin: "destructive",
    manager: "warning",
    staff: "default",
    customer: "secondary",
  }

  const roleLabels = {
    admin: "مدیر",
    manager: "مدیر شعبه",
    staff: "پرسنل",
    customer: "مشتری",
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">کاربران</h1>
        <div className="relative w-64">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            placeholder="جستجو..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pr-10"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card className="p-4 flex items-center gap-3">
          <Users className="w-8 h-8 text-apple-blue" />
          <div>
            <p className="text-2xl font-bold">{users.length}</p>
            <p className="text-sm text-gray-500">کل کاربران</p>
          </div>
        </Card>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">نام</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">ایمیل</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">موبایل</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">نقش</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((user) => (
                <tr key={user.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-sm">👤</div>
                      <span className="font-medium">{user.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm">{user.email}</td>
                  <td className="py-3 px-4 text-sm">{user.phone}</td>
                  <td className="py-3 px-4">
                    <Badge variant={roleColors[user.role]}>{roleLabels[user.role]}</Badge>
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
