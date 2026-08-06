"use client"

import { Card } from "@/components/ui/Card"
import { Users, Award, Clock, MapPin } from "lucide-react"

const stats = [
  { icon: <Users className="w-8 h-8 text-apple-blue" />, value: "۵۰,۰۰۰+", label: "مشتری راضی" },
  { icon: <Award className="w-8 h-8 text-green-500" />, value: "۱۰+", label: "سال تجربه" },
  { icon: <Clock className="w-8 h-8 text-purple-500" />, value: "۲۴/۷", label: "پشتیبانی" },
  { icon: <MapPin className="w-8 h-8 text-orange-500" />, value: "۱۵", label: "شعبه فعال" },
]

const team = [
  { name: "علی محمدی", role: "مدیرعامل", emoji: "👨‍💼" },
  { name: "سارا کریمی", role: "مدیر فروش", emoji: "👩‍💼" },
  { name: "محمد رضایی", role: "مدیر فنی", emoji: "👨‍💻" },
  { name: "نیلوفر احمدی", role: "پشتیبانی", emoji: "👩‍💻" },
]

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="bg-apple-dark text-white py-24 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">درباره ما</h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
          از سال ۲۰۱۴ افتخار داریم که بهترین محصولات اپل را با گارانتی رسمی و بهترین قیمت در اختیار مشتریان عزیز قرار می‌دهیم.
        </p>
      </section>

      {/* Stats */}
      <section className="py-16 px-4 max-w-5xl mx-auto -mt-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <Card key={i} className="p-6 text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gray-50 mb-4">
                {stat.icon}
              </div>
              <div className="text-2xl font-bold text-apple-dark mb-1">{stat.value}</div>
              <div className="text-sm text-gray-500">{stat.label}</div>
            </Card>
          ))}
        </div>
      </section>

      {/* Story */}
      <section className="py-16 px-4 max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-apple-dark mb-6">داستان ما</h2>
        <p className="text-gray-600 leading-relaxed text-lg">
          Apple Store Iran با هدف ارائه محصولات اورجینال اپل به هموطنان عزیز تأسیس شد. ما معتقدیم که هر ایرانی حق دسترسی به بهترین تکنولوژی روز دنیا را دارد. با گذشت سال‌ها، امروز با افتخار یکی از بزرگ‌ترین شبکه‌های فروش محصولات اپل در ایران هستیم.
        </p>
      </section>

      {/* Team */}
      <section className="py-16 px-4 max-w-5xl mx-auto bg-apple-gray">
        <h2 className="text-3xl font-bold text-center text-apple-dark mb-12">تیم ما</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {team.map((member, i) => (
            <Card key={i} className="p-6 text-center">
              <div className="text-5xl mb-4">{member.emoji}</div>
              <h3 className="font-bold text-lg">{member.name}</h3>
              <p className="text-gray-500 text-sm">{member.role}</p>
            </Card>
          ))}
        </div>
      </section>
    </main>
  )
}
