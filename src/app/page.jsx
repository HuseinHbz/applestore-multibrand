"use client"

import { useEffect } from "react"
import { useT } from "@/lib/i18n/provider"
import { useCatalogStore } from "@/lib/store/catalog"
import { ProductCard } from "@/components/product/ProductCard"
import { ProductGridSkeleton } from "@/components/shared/Skeleton"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { Truck, Shield, CreditCard, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const { t } = useT()
  const { products, fetchProducts, loading, getFeaturedProducts } = useCatalogStore()
  const featuredProducts = getFeaturedProducts()

  useEffect(() => {
    if (products.length === 0) {
      fetchProducts({ featured: true })
    }
  }, [])

  const features = [
    { icon: <Truck className="w-8 h-8 text-apple-blue" />, title: t("home.fastShipping"), description: t("home.fastShippingDesc") },
    { icon: <Shield className="w-8 h-8 text-green-500" />, title: t("home.authentic"), description: t("home.authenticDesc") },
    { icon: <CreditCard className="w-8 h-8 text-purple-500" />, title: t("home.installment"), description: t("home.installmentDesc") },
  ]

  return (
    <main>
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center bg-gradient-to-b from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-50/50 dark:from-blue-900/20 via-transparent to-transparent" />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <Badge className="mb-6 inline-block" variant="secondary">جدیدترین محصول اپل</Badge>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-apple-dark dark:text-white mb-6 tracking-tight">{t("home.heroTitle")}</h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">{t("home.heroSubtitle")}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="rounded-full"><ArrowLeft className="w-5 h-5 mr-2" />{t("home.buyNow")}</Button>
            <Button size="lg" variant="outline" className="rounded-full">{t("home.learnMore")}</Button>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 px-4 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-apple-dark dark:text-white">{t("home.featuredProducts")}</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-2">برترین محصولات اپل را کشف کنید</p>
          </div>
          <Link href="/products"><Button variant="outline">مشاهده همه <ArrowLeft className="w-4 h-4 mr-2" /></Button></Link>
        </div>
        {loading ? <ProductGridSkeleton count={6} /> : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((product) => <ProductCard key={product.id} product={product} />)}
          </div>
        )}
      </section>

      {/* Tools Teaser */}
      <section className="py-24 bg-apple-gray dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-apple-dark dark:text-white">ابزارهای هوشمند</h2>
          <p className="text-gray-500 dark:text-gray-400 text-center mb-12 max-w-2xl mx-auto">از معاوضه گوشی قدیمی تا محاسبه اقساط، همه چیز در دسترس شماست</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[{ href: "/trade-in", emoji: "📲", title: "معاوضه گوشی", desc: "گوشی قدیمی خود را بدهید و تخفیف بگیرید" },
              { href: "/installments", emoji: "💳", title: "محاسبه اقساط", desc: "خرید تا ۲۴ ماه اقساط بدون بهره" },
              { href: "/used", emoji: "♻️", title: "گوشی کارکرده", desc: "خرید و فروش گوشی‌های دست‌دوم" }].map((tool) => (
              <Link key={tool.href} href={tool.href}>
                <div className="bg-white dark:bg-gray-700 rounded-2xl p-8 hover:shadow-lg transition group">
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{tool.emoji}</div>
                  <h3 className="font-bold text-xl mb-2 dark:text-white">{tool.title}</h3>
                  <p className="text-gray-500 dark:text-gray-400">{tool.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center p-8 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 hover:shadow-lg transition">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gray-50 dark:bg-gray-700 mb-6">{feature.icon}</div>
              <h3 className="font-bold text-xl mb-3 dark:text-white">{feature.title}</h3>
              <p className="text-gray-500 dark:text-gray-400 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-apple-dark text-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">عضو خانواده اپل شوید</h2>
          <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">با ثبت‌نام در سایت، از پیشنهادهای ویژه، تخفیف‌های مناسبتی و اخبار محصولات جدید مطلع شوید.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-apple-dark hover:bg-gray-100 rounded-full">ثبت‌نام رایگان</Button>
            <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 rounded-full">مشاهده شعب</Button>
          </div>
        </div>
      </section>
    </main>
  )
}
