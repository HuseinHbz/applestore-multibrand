"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useT } from "@/lib/i18n/provider"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Package,
  Warehouse,
  FileText,
  MapPin,
  FileEdit,
  Users,
  UserCog,
  Settings,
  ChevronLeft,
} from "lucide-react"

export function AdminSidebar() {
  const { t } = useT()
  const pathname = usePathname()

  const menuItems = [
    { href: "/admin", label: t("admin.dashboard"), icon: <LayoutDashboard className="w-5 h-5" /> },
    { href: "/admin/products", label: t("admin.products"), icon: <Package className="w-5 h-5" /> },
    { href: "/admin/inventory", label: t("admin.inventory"), icon: <Warehouse className="w-5 h-5" /> },
    { href: "/admin/invoices/sales", label: t("admin.invoices"), icon: <FileText className="w-5 h-5" /> },
    { href: "/admin/branches", label: t("admin.branches"), icon: <MapPin className="w-5 h-5" /> },
    { href: "/admin/content", label: t("admin.content"), icon: <FileEdit className="w-5 h-5" /> },
    { href: "/admin/users", label: t("admin.users"), icon: <Users className="w-5 h-5" /> },
    { href: "/admin/staff", label: t("admin.staff"), icon: <UserCog className="w-5 h-5" /> },
    { href: "/admin/settings", label: t("admin.settings"), icon: <Settings className="w-5 h-5" /> },
  ]

  return (
    <aside className="w-64 bg-white border-l border-gray-200 min-h-screen flex flex-col">
      <div className="p-6 border-b border-gray-100">
        <Link href="/admin" className="flex items-center gap-2">
          <span className="text-2xl">🍎</span>
          <span className="font-bold text-lg">Admin Panel</span>
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition",
              pathname === item.href
                ? "bg-apple-blue text-white"
                : "text-gray-600 hover:bg-gray-50"
            )}
          >
            {item.icon}
            {item.label}
            {pathname === item.href && <ChevronLeft className="w-4 h-4 mr-auto" />}
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-100">
        <Link 
          href="/"
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-apple-blue transition"
        >
          <ChevronLeft className="w-4 h-4" />
          بازگشت به سایت
        </Link>
      </div>
    </aside>
  )
}
