"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useAuthStore } from "@/lib/store/auth"
import { Card } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { LogIn, Apple } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const { login } = useAuthStore()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    setTimeout(() => {
      const success = login(email, password)
      if (success) {
        router.push("/profile")
      } else {
        setError("ایمیل یا رمز عبور اشتباه است. (admin@applestore.ir / هر رمز عبور)")
      }
      setLoading(false)
    }, 500)
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md p-8">
        <div className="text-center mb-8">
          <div className="text-4xl mb-4">🍎</div>
          <h1 className="text-2xl font-bold text-apple-dark">ورود به حساب کاربری</h1>
          <p className="text-gray-500 text-sm mt-2">به Apple Store خوش آمدید</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">ایمیل</label>
            <Input
              type="email"
              placeholder="example@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">رمز عبور</label>
            <Input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full rounded-full" size="lg" disabled={loading}>
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <LogIn className="w-4 h-4 mr-2" />
                ورود
              </>
            )}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            حساب کاربری ندارید؟{" "}
            <Link href="/register" className="text-apple-blue hover:underline">
              ثبت‌نام کنید
            </Link>
          </p>
        </div>

        <div className="mt-6 p-4 bg-gray-50 rounded-xl text-xs text-gray-500">
          <p className="font-medium mb-1">🔑 اطلاعات ورود نمونه:</p>
          <p>Admin: admin@applestore.ir (هر رمز عبور)</p>
          <p>Customer: ali@example.com (هر رمز عبور)</p>
        </div>
      </Card>
    </main>
  )
}
