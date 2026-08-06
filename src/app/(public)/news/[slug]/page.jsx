"use client"

import { useParams } from "next/navigation"
import { useContentStore } from "@/lib/store/content"
import { Badge } from "@/components/ui/Badge"
import { formatDate } from "@/lib/utils"
import { Calendar, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function NewsDetailPage() {
  const params = useParams()
  const { getContentBySlug } = useContentStore()
  const item = getContentBySlug(params.slug)

  if (!item) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">خبر یافت نشد</h1>
          <Link href="/news">
            <Badge>بازگشت به اخبار</Badge>
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen py-12 px-4 max-w-3xl mx-auto">
      <Link href="/news" className="inline-flex items-center gap-2 text-gray-500 hover:text-apple-blue mb-8 transition">
        <ArrowLeft className="w-4 h-4" />
        بازگشت به اخبار
      </Link>

      <Badge variant="default" className="mb-4">خبر</Badge>
      <h1 className="text-3xl md:text-4xl font-bold text-apple-dark mb-6">{item.title}</h1>

      <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
        <Calendar className="w-4 h-4" />
        {formatDate(item.publishedAt)}
      </div>

      <div className="aspect-video bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl mb-8 flex items-center justify-center">
        <span className="text-6xl">📰</span>
      </div>

      <div className="prose max-w-none">
        <p className="text-gray-600 leading-relaxed text-lg">{item.excerpt}</p>
        <p className="text-gray-600 leading-relaxed mt-4">
          این خبر به صورت آزمایشی نمایش داده می‌شود. در نسخه نهایی، محتوای کامل خبر اینجا قرار می‌گیرد.
        </p>
      </div>
    </main>
  )
}
