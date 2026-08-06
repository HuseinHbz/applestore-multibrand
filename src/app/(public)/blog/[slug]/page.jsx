"use client"

import { useParams } from "next/navigation"
import { useContentStore } from "@/lib/store/content"
import { Card } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { formatDate } from "@/lib/utils"
import { Calendar, ArrowLeft, User } from "lucide-react"
import Link from "next/link"

export default function BlogDetailPage() {
  const params = useParams()
  const { getContentBySlug } = useContentStore()
  const post = getContentBySlug(params.slug)

  if (!post) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">مقاله یافت نشد</h1>
          <Link href="/blog">
            <Badge>بازگشت به وبلاگ</Badge>
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen py-12 px-4 max-w-3xl mx-auto">
      <Link href="/blog" className="inline-flex items-center gap-2 text-gray-500 hover:text-apple-blue mb-8 transition">
        <ArrowLeft className="w-4 h-4" />
        بازگشت به وبلاگ
      </Link>

      <article>
        <Badge variant="secondary" className="mb-4">بررسی</Badge>
        <h1 className="text-3xl md:text-4xl font-bold text-apple-dark mb-6">{post.title}</h1>

        <div className="flex items-center gap-4 text-sm text-gray-500 mb-8">
          <div className="flex items-center gap-1">
            <User className="w-4 h-4" />
            تیم تحریریه
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            {formatDate(post.publishedAt)}
          </div>
        </div>

        <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl mb-8 flex items-center justify-center">
          <span className="text-6xl">📝</span>
        </div>

        <div className="prose prose-lg max-w-none">
          <p className="text-gray-600 leading-relaxed text-lg">
            {post.excerpt} این یک نمونه از محتوای مقاله است. در نسخه نهایی، محتوای کامل مقاله اینجا قرار می‌گیرد.
          </p>
          <p className="text-gray-600 leading-relaxed mt-4">
            اپل همواره با نوآوری‌های خود دنیای تکنولوژی را متحول کرده است. از اولین iPhone در سال ۲۰۰۷ تا جدیدترین محصولات، این شرکت همواره استانداردهای صنعت را تعیین کرده است.
          </p>
          <h2 className="text-2xl font-bold mt-8 mb-4">ویژگی‌های کلیدی</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-600">
            <li>طراحی تیتانیومی سبک و مقاوم</li>
            <li>دوربین ۴۸ مگاپیکسلی با قابلیت‌های حرفه‌ای</li>
            <li>چیپ A18 Pro با عملکرد فوق‌العاده</li>
            <li>باتری با دوام تمام روز</li>
          </ul>
        </div>
      </article>
    </main>
  )
}
