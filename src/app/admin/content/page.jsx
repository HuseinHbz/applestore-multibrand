"use client"

import { useState } from "react"
import { useContentStore } from "@/lib/store/content"
import { Card } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Badge } from "@/components/ui/Badge"
import { FileEdit, Plus, Pencil, Trash2 } from "lucide-react"

export default function AdminContentPage() {
  const { contents, addContent, removeContent } = useContentStore()
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({ title: "", slug: "", type: "blog", excerpt: "" })

  const handleSubmit = () => {
    addContent({
      ...formData,
      id: `c${Date.now()}`,
      body: "",
      publishedAt: new Date().toISOString(),
      featured: false,
    })
    setShowForm(false)
    setFormData({ title: "", slug: "", type: "blog", excerpt: "" })
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">مدیریت محتوا</h1>
        <Button onClick={() => setShowForm(!showForm)}>
          <Plus className="w-4 h-4 ml-2" />
          محتوای جدید
        </Button>
      </div>

      {showForm && (
        <Card className="p-6 mb-8">
          <h3 className="font-bold mb-4">محتوای جدید</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <Input placeholder="عنوان" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
            <Input placeholder="اسلاگ" value={formData.slug} onChange={(e) => setFormData({ ...formData, slug: e.target.value })} />
            <select value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })} className="h-10 rounded-lg border border-gray-300 px-3">
              <option value="blog">وبلاگ</option>
              <option value="news">خبر</option>
              <option value="page">صفحه</option>
            </select>
          </div>
          <textarea placeholder="خلاصه" value={formData.excerpt} onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })} className="w-full h-20 rounded-lg border border-gray-300 p-3 text-sm mb-4" />
          <Button onClick={handleSubmit}>ایجاد</Button>
        </Card>
      )}

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">عنوان</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">نوع</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">تاریخ</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">عملیات</th>
              </tr>
            </thead>
            <tbody>
              {contents.map((content) => (
                <tr key={content.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                  <td className="py-3 px-4 font-medium">{content.title}</td>
                  <td className="py-3 px-4">
                    <Badge variant="secondary">{content.type}</Badge>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-500">{content.publishedAt}</td>
                  <td className="py-3 px-4">
                    <button onClick={() => removeContent(content.id)} className="p-2 hover:bg-red-50 rounded-lg text-red-600">
                      <Trash2 className="w-4 h-4" />
                    </button>
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
