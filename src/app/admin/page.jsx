"use client"

import { useEffect, useState } from "react"
import { useT } from "@/lib/i18n/provider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { formatPrice } from "@/lib/utils"
import { Package, ShoppingBag, Users, TrendingUp, AlertTriangle } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts"

const salesData = [
  { name: "فروردین", sales: 45000000 },
  { name: "اردیبهشت", sales: 52000000 },
  { name: "خرداد", sales: 48000000 },
  { name: "تیر", sales: 61000000 },
  { name: "مرداد", sales: 55000000 },
  { name: "شهریور", sales: 67000000 },
]

export default function AdminDashboard() {
  const { t } = useT()
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/dashboard")
      .then((res) => res.json())
      .then((json) => {
        if (json.success) setStats(json.data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin w-8 h-8 border-2 border-apple-blue border-t-transparent rounded-full" />
      </div>
    )
  }

  const statCards = stats ? [
    { title: "درآمد کل", value: formatPrice(stats.totalRevenue), icon: <TrendingUp className="w-5 h-5 text-green-600" />, trend: "+۱۲٪" },
    { title: "سفارشات", value: stats.totalOrders, icon: <ShoppingBag className="w-5 h-5 text-blue-600" />, trend: "+۵" },
    { title: "محصولات", value: stats.totalProducts, icon: <Package className="w-5 h-5 text-purple-600" /> },
    { title: "در انتظار", value: stats.pendingOrders, icon: <Users className="w-5 h-5 text-orange-600" /> },
  ] : []

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 dark:text-white">{t("admin.dashboard")}</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">{stat.title}</CardTitle>
              {stat.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold dark:text-white">{stat.value}</div>
              {stat.trend && <p className="text-xs text-green-600 mt-1">{stat.trend} این ماه</p>}
            </CardContent>
          </Card>
        ))}
      </div>

      {stats?.lowStock > 0 && (
        <Card className="p-4 mb-8 bg-orange-50 border-orange-200">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-orange-600" />
            <p className="text-orange-800 font-medium">{stats.lowStock} محصول موجودی کم دارند. <a href="/admin/inventory" className="underline">مشاهده انبار</a></p>
          </div>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card className="p-6">
          <h3 className="font-bold text-lg mb-6 dark:text-white">نمودار فروش ماهانه</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => formatPrice(value)} />
              <Bar dataKey="sales" fill="#3b82f6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
        <Card className="p-6">
          <h3 className="font-bold text-lg mb-6 dark:text-white">وضعیت سفارشات</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={[{name:"در انتظار",value:stats?.pendingOrders||0},{name:"تحویل",value:stats?.totalOrders||0}]}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#8b5cf6" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="dark:text-white">سفارشات اخیر</CardTitle></CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 dark:border-gray-800">
                  <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">شماره</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">مشتری</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">مبلغ</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">وضعیت</th>
                </tr>
              </thead>
              <tbody>
                {stats?.recentOrders?.map((order) => (
                  <tr key={order.id} className="border-b border-gray-50 dark:border-gray-800 hover:bg-gray-50/50 dark:hover:bg-gray-800/50">
                    <td className="py-3 px-4 text-sm dark:text-gray-300">{order.id.slice(0, 8)}</td>
                    <td className="py-3 px-4 text-sm dark:text-gray-300">{order.user?.name || order.userId}</td>
                    <td className="py-3 px-4 text-sm font-medium dark:text-white">{formatPrice(order.total)}</td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                        order.status === "delivered" ? "bg-green-100 text-green-800" :
                        order.status === "pending" ? "bg-yellow-100 text-yellow-800" :
                        "bg-blue-100 text-blue-800"
                      }`}>
                        {order.status === "delivered" ? "تحویل شده" : order.status === "pending" ? "در انتظار" : "ارسال شده"}
                      </span>
                    </td>
                  </tr>
                )) || <tr><td colSpan={4} className="py-8 text-center text-gray-500">سفارشی یافت نشد</td></tr>}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
