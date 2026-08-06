"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/lib/store/auth"
import { AdminSidebar } from "@/components/layout/AdminSidebar"

export default function AdminLayout({ children }) {
  const { isAuthenticated, hasRole } = useAuthStore()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated || !hasRole("staff")) {
      router.push("/login")
    }
  }, [isAuthenticated, hasRole, router])

  if (!isAuthenticated || !hasRole("staff")) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-2 border-apple-blue border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-gray-500">در حال بررسی دسترسی...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar />
      <main className="flex-1 p-8 overflow-auto">
        {children}
      </main>
    </div>
  )
}
