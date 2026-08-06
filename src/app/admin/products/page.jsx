"use client"

import { useState } from "react"
import { useCatalogStore } from "@/lib/store/catalog"
import { Card } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Badge } from "@/components/ui/Badge"
import { formatPrice } from "@/lib/utils"
import { Plus, Pencil, Trash2, Search } from "lucide-react"

export default function AdminProductsPage() {
  const { products, variants, addProduct, removeProduct, updateProduct } = useCatalogStore()
  const [search, setSearch] = useState("")
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState(null)
  const [formData, setFormData] = useState({
    name: "", slug: "", category: "mobile", brand: "Apple", description: "",
  })

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  )

  const handleSubmit = () => {
    if (editing) {
      updateProduct(editing.id, formData)
    } else {
      addProduct({
        ...formData,
        id: `p${Date.now()}`,
        images: [],
        specs: {},
        featured: false,
      })
    }
    setShowForm(false)
    setEditing(null)
    setFormData({ name: "", slug: "", category: "mobile", brand: "Apple", description: "" })
  }

  const handleEdit = (product) => {
    setEditing(product)
    setFormData({
      name: product.name,
      slug: product.slug,
      category: product.category,
      brand: product.brand,
      description: product.description,
    })
    setShowForm(true)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">مدیریت محصولات</h1>
        <Button onClick={() => setShowForm(!showForm)}>
          <Plus className="w-4 h-4 ml-2" />
          محصول جدید
        </Button>
      </div>

      {showForm && (
        <Card className="p-6 mb-8">
          <h3 className="font-bold text-lg mb-4">
            {editing ? "ویرایش محصول" : "محصول جدید"}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <Input
              placeholder="نام محصول"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <Input
              placeholder="اسلاگ"
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            />
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="h-10 rounded-lg border border-gray-300 px-3"
            >
              <option value="mobile">موبایل</option>
              <option value="laptop">لپ‌تاپ</option>
              <option value="tablet">تبلت</option>
              <option value="accessory">لوازم جانبی</option>
            </select>
            <Input placeholder="برند" value={formData.brand} onChange={(e) => setFormData({ ...formData, brand: e.target.value })} />
          </div>
          <textarea
            placeholder="توضیحات"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full h-24 rounded-lg border border-gray-300 p-3 text-sm mb-4"
          />
          <div className="flex gap-2">
            <Button onClick={handleSubmit}>{editing ? "به‌روزرسانی" : "ایجاد"}</Button>
            <Button variant="outline" onClick={() => { setShowForm(false); setEditing(null); }}>انصراف</Button>
          </div>
        </Card>
      )}

      <div className="mb-4">
        <div className="relative">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            placeholder="جستجو..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pr-10"
          />
        </div>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">محصول</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">دسته</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">واریانت‌ها</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">وضعیت</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">عملیات</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((product) => {
                const productVariants = variants.filter((v) => v.productId === product.id)
                return (
                  <tr key={product.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">📱</div>
                        <div>
                          <div className="font-medium">{product.name}</div>
                          <div className="text-xs text-gray-400">{product.slug}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm">{product.category}</td>
                    <td className="py-3 px-4 text-sm">{productVariants.length} واریانت</td>
                    <td className="py-3 px-4">
                      <Badge variant={product.featured ? "success" : "secondary"}>
                        {product.featured ? "ویژه" : "عادی"}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <button onClick={() => handleEdit(product)} className="p-2 hover:bg-blue-50 rounded-lg text-blue-600">
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button onClick={() => removeProduct(product.id)} className="p-2 hover:bg-red-50 rounded-lg text-red-600">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
