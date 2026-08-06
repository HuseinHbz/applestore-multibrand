"use client"

import Link from "next/link"
import { useContentStore } from "@/lib/store/content"
import { Card } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { formatDate } from "@/lib/utils"
import { Calendar, Newspaper } from "lucide-react"

export default function NewsPage() {
  const { getContentsByType } = useContentStore()
  const news = getContentsByType("news")

  return (
    <main className="min-h-screen py-12 px-4 max-w-5xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-apple-dark mb-4">اخبار</h1>
        <p className="text-gray-500">آخرین اخبار و اطلاعیه‌های فروشگاه</p>
      </div>

      <div className="space-y-6">
        {news.map((item) => (
          <Link key={item.id} href={`/news/${item.slug}`}>
            <Card className="p-6 hover:shadow-lg transition flex flex-col md:flex-row gap-6">
              <div className="w-full md:w-48 h-32 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl flex items-center justify-center shrink-0">
                <Newspaper className="w-10 h-10 text-apple-blue" />
              </div>
              <div className="flex-1">
                <Badge variant="default" className="mb-2">خبر</Badge>
                <h3 className="font-bold text-xl mb-2">{item.title}</h3>
                <p className="text-gray-500 mb-3">{item.excerpt}</p>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Calendar className="w-4 h-4" />
                  {formatDate(item.publishedAt)}
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </main>
  )
}
