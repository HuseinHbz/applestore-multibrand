"use client"

import { useBranchesStore } from "@/lib/store/branches"
import { Card } from "@/components/ui/Card"
import { MapPin, Phone, Clock } from "lucide-react"

export default function BranchesPage() {
  const { branches } = useBranchesStore()

  return (
    <main className="min-h-screen py-12 px-4 max-w-5xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-apple-dark mb-4">شعب ما</h1>
        <p className="text-gray-500">به نزدیک‌ترین شعبه ما سر بزنید</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {branches.map((branch) => (
          <Card key={branch.id} className="p-6">
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-4">
              <MapPin className="w-6 h-6 text-apple-blue" />
            </div>
            <h3 className="font-bold text-lg mb-2">{branch.name}</h3>
            <p className="text-gray-500 text-sm mb-4">{branch.address}</p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Phone className="w-4 h-4 text-gray-400" />
                {branch.phone}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock className="w-4 h-4 text-gray-400" />
                {branch.hours}
              </div>
            </div>
            <div className="mt-4 p-3 bg-gray-50 rounded-xl text-center text-sm text-gray-400">
              📍 {branch.location.lat}, {branch.location.lng}
            </div>
          </Card>
        ))}
      </div>
    </main>
  )
}
