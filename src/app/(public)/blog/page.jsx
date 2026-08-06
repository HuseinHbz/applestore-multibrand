"use client"

import Link from "next/link"
import { useContentStore } from "@/lib/store/content"
import { Card } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { formatDate } from "@/lib/utils"
import { Calendar, ArrowLeft } from "lucide-react"

export default function BlogPage() {
  const { getContentsByType } = useContentStore()
  const posts = getContentsByType("blog")

  return (
    <main className="min-h-screen py-12 px-4 max-w-5xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-apple-dark mb-4">وبلاگ</h1>
        <p className="text-gray-500">آخرین مقالات و بررسی‌های محصولات اپل</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {posts.map((post) => (
          <Link key={post.id} href={`/blog/${post.slug}`}>
            <Card className="p-6 hover:shadow-lg transition h-full">
              <Badge variant="secondary" className="mb-3">بررسی</Badge>
              <h3 className="font-bold text-xl mb-3 group-hover:text-apple-blue transition">{post.title}</h3>
              <p className="text-gray-500 text-sm mb-4 line-clamp-2">{post.excerpt}</p>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Calendar className="w-4 h-4" />
                {formatDate(post.publishedAt)}
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </main>
  )
}
