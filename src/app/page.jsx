'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Star, ArrowRight, Truck, RefreshCw, CreditCard, ShieldCheck, 
  Sparkles, Bot, ChevronLeft, CheckCircle2 
} from 'lucide-react';

export default function ApplePremiumHomePage() {
  const [products, setProducts] = useState([]);
  const [aiBudget, setAiBudget] = useState(60000000);
  const [aiRecommendations, setAiRecommendations] = useState([]);

  useEffect(() => {
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setProducts(data.products || []);
      })
      .catch(() => {});
  }, []);

  const handleAiRecommend = () => {
    const recommended = products.filter(p => Number(p.price) <= aiBudget).slice(0, 3);
    setAiRecommendations(recommended);
  };

  return (
    <div className="bg-[#FFFFFF] dark:bg-[#000000] text-[#111111] dark:text-white font-[-apple-system,BlinkMacSystemFont,'SF_Pro_Text','Vazirmatn'] dir-rtl selection:bg-[#0071E3] selection:text-white">
      
      {/* 🌟 HERO SECTION (تمام صفحه پریمیوم) */}
      <section className="min-h-[88vh] flex flex-col lg:flex-row items-center justify-between max-w-7xl mx-auto px-6 py-12 gap-12">
        <div className="lg:w-1/2 space-y-6 text-center lg:text-right">
          <span className="text-[#0071E3] text-sm font-semibold tracking-wide">معرفی پرچمدار جدید</span>
          <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight text-[#111111] dark:text-white leading-none">
            iPhone 18 Pro
          </h1>
          <p className="text-3xl font-bold text-gray-500 dark:text-gray-400">Titanium. Built for AI.</p>
          <p className="text-lg text-gray-600 dark:text-gray-300 pt-2">
            از قیمت <strong>۷۹,۹۰۰,۰۰۰ تومان</strong> یا با ۱۲ قسط بدون بهره
          </p>
          
          <div className="flex items-center justify-center lg:justify-start gap-4 pt-4">
            <Link
              href="/products/iphone-18-pro"
              className="px-8 py-3.5 bg-[#0071E3] text-white font-medium rounded-full hover:bg-[#0071E3]/90 hover:scale-[1.02] transition-all duration-300 text-sm shadow-md"
            >
              خرید مستقیم
            </Link>
            <Link
              href="/compare"
              className="px-8 py-3.5 bg-[#F5F5F7] dark:bg-[#1D1D1F] text-[#111111] dark:text-white font-medium rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-all duration-300 text-sm"
            >
              مقایسه مشخصات
            </Link>
          </div>
        </div>

        {/* رندر ۳ بعدی شناور */}
        <div className="lg:w-1/2 flex justify-center relative">
          <div className="w-72 sm:w-96 h-[420px] bg-gradient-to-tr from-[#F5F5F7] to-gray-200 dark:from-[#1D1D1F] dark:to-gray-900 rounded-[48px] p-6 shadow-2xl flex items-center justify-center border border-black/5 dark:border-white/10 hover:translate-y-[-8px] transition-transform duration-500">
            <img 
              src="https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&q=80" 
              alt="iPhone 18 Pro" 
              className="max-h-full object-contain filter drop-shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* 💳 ۳ کارت کلیدی خرید زیر Hero */}
      <section className="max-w-7xl mx-auto px-6 py-8 border-t border-b border-gray-100 dark:border-white/10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: Truck, title: 'ارسال رایگان اکسپرس', desc: 'برای تمام سفارش‌های بالای ۲ میلیون تومان' },
            { icon: RefreshCw, title: 'طرح معاوضه (Trade In)', desc: 'تبدیل آیفون قدیمی شما به تخفیف خرید' },
            { icon: CreditCard, title: 'خرید اقساطی اسان', desc: '۱۲ قسط بدون بهره و بدون نیاز به ضامن' },
          ].map((card, i) => (
            <div key={i} className="p-6 rounded-2xl bg-[#F5F5F7] dark:bg-[#1D1D1F] flex items-center gap-4 hover:bg-gray-200 dark:hover:bg-gray-800 transition duration-300">
              <card.icon className="w-7 h-7 text-[#0071E3]" />
              <div>
                <h3 className="font-bold text-sm text-[#111111] dark:text-white">{card.title}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{card.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 📦 پرفروش‌ترین‌ها (FEATURED PRODUCTS) */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex justify-between items-end mb-10">
          <div>
            <span className="text-[#0071E3] text-xs font-bold tracking-widest uppercase">Popular Choice</span>
            <h2 className="text-3xl font-extrabold mt-1">پرفروش‌ترین محصولات</h2>
          </div>
          <Link href="/products" className="text-sm text-[#0071E3] font-medium flex items-center gap-1 hover:underline">
            مشاهده همه <ChevronLeft className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {(products.length > 0 ? products.slice(0, 3) : [
            { id: 1, title: 'iPhone 18 Pro Max', price: 89900000, storage: '256GB', color: 'Natural Titanium', rating: '4.9', reviews: 218, isBestSeller: true },
            { id: 2, title: 'MacBook Air M3', price: 64900000, storage: '512GB', color: 'Space Black', rating: '4.8', reviews: 142, isBestSeller: false },
            { id: 3, title: 'AirPods Pro 2', price: 11900000, storage: 'USB-C', color: 'White', rating: '4.9', reviews: 310, isBestSeller: true },
          ]).map((p, idx) => (
            <div 
              key={p.id || idx} 
              className="bg-[#F5F5F7] dark:bg-[#1D1D1F] rounded-3xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between relative group"
            >
              {p.isBestSeller && (
                <span className="absolute top-4 right-4 bg-[#34C759] text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-sm">
                  Best Seller
                </span>
              )}

              <div className="h-56 flex items-center justify-center p-4">
                <img 
                  src={p.images?.[0] || 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&q=80'} 
                  alt={p.title} 
                  className="max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="space-y-3 mt-4">
                <div className="flex items-center gap-1 text-xs text-amber-500 font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-500" />
                  <span>{p.rating || '4.9'}</span>
                  <span className="text-gray-400 font-normal">({p.reviews || 200})</span>
                </div>

                <h3 className="font-extrabold text-lg text-[#111111] dark:text-white">{p.title}</h3>
                <p className="text-xs text-gray-500">{p.color} • {p.storage}</p>

                <div className="pt-2 border-t border-gray-200 dark:border-white/10">
                  <div className="text-xs text-gray-400">شروع قیمت از:</div>
                  <div className="text-xl font-extrabold text-[#1D1D1F] dark:text-white">
                    {Number(p.price).toLocaleString()} <span className="text-xs font-normal">تومان</span>
                  </div>
                  <div className="text-[11px] text-[#0071E3] font-medium mt-0.5">
                    ۱۲ قسط بدون بهره (ماهانه {(Number(p.price) / 12).toFixed(0).toLocaleString()} تومان)
                  </div>
                </div>

                <button className="w-full py-3 mt-2 bg-[#0071E3] hover:bg-[#0071E3]/90 text-white font-medium text-sm rounded-2xl transition duration-300 shadow-sm">
                  افزودن به سبد خرید
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 🤖 دستیار هوشمند پیشنهاد خرید (AI RECOMMENDATION) */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="p-8 rounded-3xl bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white shadow-2xl border border-white/10 space-y-6">
          <div className="flex items-center gap-3">
            <Bot className="w-8 h-8 text-[#0071E3]" />
            <div>
              <h3 className="text-2xl font-bold">پیشنهاد هوشمند سیستم (AI Advisor)</h3>
              <p className="text-xs text-gray-400">بودجه خود را وارد کنید تا هوش مصنوعی بهترین آیفون و تجهیزات را پیشنهاد دهد.</p>
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

      {/* ⭐️ نظرات مشتریان تایید شده (SOCIAL PROOF) */}
      <section className="max-w-7xl mx-auto px-6 py-16 border-t border-gray-100 dark:border-white/10">
        <h2 className="text-3xl font-extrabold text-center mb-12">تجربه خریداران قبلی</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { name: 'حسین حبیب‌آذر', comment: 'تحویل فوق‌العاده سریع و بسته‌بندی پلمپ اصلی اپل. گارانتی کالا هم بلافاصله استعلام شد.', rating: 5 },
            { name: 'زهرا جیم', comment: 'از بخش خرید اقساطی استفاده کردم. بدون پیچیدگی و سر وقت تحویل داده شد.', rating: 5 },
            { name: 'رضا محمدی', comment: 'مشاوره خرید آیفون ۱۸ پرو فوق‌العاده دقیق بود. بهترین قیمت بازار با مهلت تست واقعی.', rating: 5 },
          ].map((review, i) => (
            <div key={i} className="p-6 rounded-3xl bg-[#F5F5F7] dark:bg-[#1D1D1F] space-y-4">
              <div className="flex items-center gap-1 text-amber-500">
                {[...Array(review.rating)].map((_, r) => (
                  <Star key={r} className="w-4 h-4 fill-amber-500" />
                ))}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">"{review.comment}"</p>
              <div className="flex items-center gap-2 pt-2 text-xs font-bold">
                <CheckCircle2 className="w-4 h-4 text-[#34C759]" />
                <span>{review.name}</span>
                <span className="text-gray-400 font-normal">(خریدار تایید شده)</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 🔻 FOOTER MINIMAL APPLE STYLE */}
      <footer className="border-t border-gray-200 dark:border-white/10 bg-[#F5F5F7] dark:bg-[#1D1D1F] py-12 text-xs text-gray-500 dark:text-gray-400">
        <div className="max-w-7xl mx-auto px-6 space-y-6">
          <p className="leading-relaxed">
            کلیه حقوق این وب‌سایت متعلق به Apple Store Premium می‌باشد. تمامی آیفون‌ها و محصولات اورجینال همراه با کد همتا و رجیستری ارائه می‌شوند.
          </p>
          <div className="flex flex-wrap gap-6 pt-4 border-t border-gray-300 dark:border-white/10">
            <Link href="/privacy" className="hover:underline">حریم خصوصی</Link>
            <Link href="/terms" className="hover:underline">شرایط استفاده</Link>
            <Link href="/sales-policy" className="hover:underline">سیاست فروش و مرجوعی</Link>
            <Link href="/contact" className="hover:underline">تماس با ما</Link>
          </div>
        </div>
      </footer>

    </div>
  );
}