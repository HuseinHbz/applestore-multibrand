"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronLeft, Home } from "lucide-react"
import { cn } from "@/lib/utils"

const routeLabels = {
  "products": "محصولات",
  "cart": "سبد خرید",
  "checkout": "تسویه حساب",
  "trade-in": "معاوضه",
  "installments": "اقساط",
  "used": "کارکرده",
  "apple-id": "Apple ID",
  "gift-cards": "گیفت کارت",
  "blog": "وبلاگ",
  "news": "اخبار",
  "offers": "پیشنهادها",
  "about": "درباره ما",
  "branches": "شعب",
  "profile": "پروفایل",
  "login": "ورود",
  "register": "ثبت‌نام",
}

export function Breadcrumbs({ className }) {
  const pathname = usePathname()
  const segments = pathname.split("/").filter(Boolean)

  if (segments.length === 0) return null

  return (
    <nav className={cn("flex items-center gap-2 text-sm text-gray-500 mb-6", className)}>
      <Link href="/" className="flex items-center gap-1 hover:text-apple-blue transition">
        <Home className="w-4 h-4" />
        خانه
      </Link>
      {segments.map((segment, index) => {
        const href = "/" + segments.slice(0, index + 1).join("/")
        const isLast = index === segments.length - 1
        const label = routeLabels[segment] || segment

        return (
          <div key={segment} className="flex items-center gap-2">
            <ChevronLeft className="w-4 h-4" />
            {isLast ? (
              <span className="text-apple-dark font-medium">{label}</span>
            ) : (
              <Link href={href} className="hover:text-apple-blue transition">
                {label}
              </Link>
            )}
          </div>
        )
      })}
    </nav>
  )
}
