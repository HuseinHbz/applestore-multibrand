'use client';
import { useState } from 'react';
import Link from 'next/link';
import { 
  ShoppingBag, ShieldCheck, Truck, RefreshCw, ArrowRight, 
  Percent, ChevronLeft, Sparkles, Smartphone, Laptop, Watch, Headphones, Star, Bot, CheckCircle2 
} from 'lucide-react';

export default function HomePageClient({ products = [], contents = [], settings = {} }) {
  const [aiBudget, setAiBudget] = useState(60000000);
  const [aiRecommendations, setAiRecommendations] = useState([]);

  const handleAiRecommend = () => {
    const recommended = products.filter(p => Number(p.price) <= aiBudget).slice(0, 3);
    setAiRecommendations(recommended);
  };

  return (
    <div className="bg-[#FFFFFF] dark:bg-[#000000] text-[#111111] dark:text-white font-[-apple-system,BlinkMacSystemFont,'SF_Pro_Text','Vazirmatn'] dir-rtl selection:bg-[#0071E3] selection:text-white space-y-16 pb-16">
      
      {/* 🌟 HERO SECTION */}
      <section className="min-h-[80vh] flex flex-col lg:flex-row items-center justify-between max-w-7xl mx-auto px-6 py-12 gap-12">
        <div className="lg:w-1/2 space-y-6 text-center lg:text-right">
          <span className="text-[#0071E3] text-sm font-semibold tracking-wide flex items-center justify-center lg:justify-start gap-2">
            <Sparkles className="w-4 h-4" />
            {settings?.heroTitle || 'معرفی پرچمدار جدید'}
          </span>
          <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight text-[#111111] dark:text-white leading-none">
            {settings?.heroTitle || 'iPhone 18 Pro'}
          </h1>
          <p className="text-3xl font-bold text-gray-500 dark:text-gray-400">
            {settings?.heroSub || 'Titanium. Built for AI.'}
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-300 pt-2">
            از قیمت <strong>{settings?.heroPrice || '۷۹,۹۰۰,۰۰۰'} تومان</strong> یا با ۱۲ قسط بدون بهره
          </p>
          
          <div className="flex items-center justify-center lg:justify-start gap-4 pt-4">
            <Link
              href="/products"
              className="px-8 py-3.5 bg-[#0071E3] text-white font-medium rounded-full hover:bg-[#0071E3]/90 hover:scale-[1.02] transition-all duration-300 text-sm shadow-md"
            >
              خرید مستقیم
            </Link>
            <Link
              href="/trade-in"
              className="px-8 py-3.5 bg-[#F5F5F7] dark:bg-[#1D1D1F] text-[#111111] dark:text-white font-medium rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-all duration-300 text-sm"
            >
              طرح معاوضه
            </Link>
          </div>
        </div>

        <div className="lg:w-1/2 flex justify-center relative">
          <div className="w-72 sm:w-96 h-[420px] bg-gradient-to-tr from-[#F5F5F7] to-gray-200 dark:from-[#1D1D1F] dark:to-gray-900 rounded-[48px] p-6 shadow-2xl flex items-center justify-center border border-black/5 dark:border-white/10 hover:translate-y-[-8px] transition-transform duration-500">
            <img 
              src="https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&q=80" 
              alt="Apple Product" 
              className="max-h-full object-contain filter drop-shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* 📱 QUICK CATEGORIES */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { title: 'آیفون (iPhone)', icon: Smartphone, href: '/products?category=iphone' },
            { title: 'مک‌بوک (MacBook)', icon: Laptop, href: '/products?category=macbook' },
            { title: 'اپل واچ (Apple Watch)', icon: Watch, href: '/products?category=watch' },
            { title: 'ایرپاد (AirPods)', icon: Headphones, href: '/products?category=airpods' },
          ].map((cat, idx) => (
            <Link
              key={idx}
              href={cat.href}
              className="p-6 rounded-3xl border border-gray-100 dark:border-white/10 bg-[#F5F5F7] dark:bg-[#1D1D1F] hover:border-[#0071E3] transition-all flex flex-col items-center text-center space-y-3 group shadow-sm"
            >
              <div className="p-4 rounded-2xl bg-white dark:bg-black border group-hover:scale-110 transition-transform">
                <cat.icon className="w-8 h-8 text-[#0071E3]" />
              </div>
              <span className="font-bold text-base text-[#111111] dark:text-white">{cat.title}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* 🛍️ PRODUCT GRID */}
      <section className="max-w-7xl mx-auto px-6 space-y-8">
        <div className="flex justify-between items-end border-b pb-4">
          <div>
            <h2 className="text-3xl font-black">جدیدترین محصولات فروشگاه</h2>
            <p className="text-sm text-gray-500 mt-1">تضمین اصالت، کد همتا و گارانتی معتبر</p>
          </div>
          <Link href="/products" className="text-[#0071E3] font-bold hover:underline flex items-center gap-1 text-sm">
            مشاهده همه <ArrowRight className="w-4 h-4 rotate-180" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="group rounded-3xl bg-[#F5F5F7] dark:bg-[#1D1D1F] border border-gray-100 dark:border-white/10 p-5 hover:shadow-2xl hover:border-[#0071E3]/50 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="h-52 bg-white dark:bg-black rounded-2xl p-4 flex items-center justify-center relative overflow-hidden">
                <span className="absolute top-3 right-3 text-[10px] font-bold px-2.5 py-1 bg-gray-100 dark:bg-gray-800 rounded-full border">
                  {product.brand?.name || 'Apple'}
                </span>
                <img
                  src={product.images?.[0] || 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&q=80'}
                  alt={product.title}
                  className="max-h-full object-contain group-hover:scale-110 transition-transform duration-300"
                />
              </div>

              <div className="mt-4 space-y-3 flex-1 flex flex-col justify-between">
                <h3 className="font-bold text-base line-clamp-2 group-hover:text-[#0071E3] transition-colors">
                  {product.title}
                </h3>

                <div className="pt-3 border-t border-gray-200 dark:border-white/10 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-gray-400 block">قیمت نهایی:</span>
                    <span className="font-black text-lg text-[#0071E3]">
                      {Number(product.price).toLocaleString()} <span className="text-xs font-normal">تومان</span>
                    </span>
                  </div>
                  <Link
                    href={`/products/${product.slug}`}
                    className="p-3 bg-[#0071E3] text-white rounded-2xl hover:opacity-90 shadow-md"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 🤖 AI RECOMMENDATION */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="p-8 rounded-3xl bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white shadow-2xl border border-white/10 space-y-6">
          <div className="flex items-center gap-3">
            <Bot className="w-8 h-8 text-[#0071E3]" />
            <div>
              <h3 className="text-2xl font-bold">دستیار هوشمند خرید (AI Advisor)</h3>
              <p className="text-xs text-gray-400">بودجه خود را مشخص کنید تا هوش مصنوعی بهترین مدل را به شما پیشنهاد دهد.</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <input 
              type="number" 
              value={aiBudget}
              onChange={(e) => setAiBudget(Number(e.target.value))}
              placeholder="میزان بودجه به تومان..."
              className="flex-1 px-4 py-3 bg-white/10 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#0071E3]"
            />
            <button 
              onClick={handleAiRecommend}
              className="px-8 py-3 bg-[#0071E3] text-white font-medium rounded-2xl hover:bg-[#0071E3]/90 transition"
            >
              دریافت ۳ پیشنهاد هوشمند
            </button>
          </div>

          {aiRecommendations.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-white/10">
              {aiRecommendations.map((rec) => (
                <div key={rec.id} className="p-4 bg-white/5 rounded-2xl border border-white/10">
                  <h4 className="font-bold text-sm text-white">{rec.title}</h4>
                  <p className="text-xs text-[#34C759] mt-1">{Number(rec.price).toLocaleString()} تومان</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

    </div>
  );
}
