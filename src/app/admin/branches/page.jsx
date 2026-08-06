"use client"

import { useState } from "react"
import { useBranchesStore } from "@/lib/store/branches"
import { Card } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { MapPin, Plus, Pencil, Trash2 } from "lucide-react"

export default function AdminBranchesPage() {
  const { branches, addBranch, updateBranch, removeBranch } = useBranchesStore()
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({ name: "", address: "", phone: "", hours: "" })

  const handleSubmit = () => {
    addBranch({
      ...formData,
      id: `b${Date.now()}`,
      location: { lat: 35.7, lng: 51.4 },
    })
    setShowForm(false)
    setFormData({ name: "", address: "", phone: "", hours: "" })
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">مدیریت شعب</h1>
        <Button onClick={() => setShowForm(!showForm)}>
          <Plus className="w-4 h-4 ml-2" />
          شعبه جدید
        </Button>
      </div>

      {showForm && (
        <Card className="p-6 mb-8">
          <h3 className="font-bold mb-4">شعبه جدید</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <Input placeholder="نام شعبه" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
            <Input placeholder="تلفن" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
            <Input placeholder="ساعت کاری" value={formData.hours} onChange={(e) => setFormData({ ...formData, hours: e.target.value })} />
            <Input placeholder="آدرس" value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} />
          </div>
          <Button onClick={handleSubmit}>ایجاد شعبه</Button>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {branches.map((branch) => (
          <Card key={branch.id} className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-apple-blue" />
                </div>
                <div>
                  <h3 className="font-bold">{branch.name}</h3>
                  <p className="text-sm text-gray-500">{branch.address}</p>
                  <p className="text-sm text-gray-400 mt-1">{branch.phone} | {branch.hours}</p>
                </div>
              </div>
              <button onClick={() => removeBranch(branch.id)} className="p-2 hover:bg-red-50 rounded-lg text-red-600">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
