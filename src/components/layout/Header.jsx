'use client';
import Link from 'next/link';
import { useTheme } from '@/components/shared/ThemeProvider';
import { ShoppingBag, Search, User, Sun, Moon } from 'lucide-react';

export function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 h-[72px] backdrop-blur-xl bg-white/70 dark:bg-black/70 border-b border-black/5 dark:border-white/10 transition-colors dir-rtl">
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between font-[-apple-system,BlinkMacSystemFont,'SF_Pro_Text','Vazirmatn']">
        
        {/* Apple Logo & Navigation */}
        <div className="flex items-center gap-10">
          <Link href="/" className="text-2xl font-bold tracking-tighter hover:opacity-70 transition-opacity">
             <span className="sr-only">Apple Store</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-8 text-[15px] font-medium text-[#111111]/80 dark:text-white/80">
            <Link href="/products" className="hover:text-[#0071E3] transition-colors">فروشگاه</Link>
            <Link href="/products?category=mac" className="hover:text-[#0071E3] transition-colors">Mac</Link>
            <Link href="/products?category=iphone" className="hover:text-[#0071E3] transition-colors">iPhone</Link>
            <Link href="/products?category=ipad" className="hover:text-[#0071E3] transition-colors">iPad</Link>
            <Link href="/products?category=watch" className="hover:text-[#0071E3] transition-colors">Watch</Link>
            <Link href="/products?category=airpods" className="hover:text-[#0071E3] transition-colors">AirPods</Link>
            <Link href="/accessories" className="hover:text-[#0071E3] transition-colors">لوازم جانبی</Link>
            <Link href="/support" className="hover:text-[#0071E3] transition-colors">پشتیبانی</Link>
          </nav>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-5 text-[#111111] dark:text-white">
          <div className="relative hidden sm:block">
            <input 
              type="text" 
              placeholder="جستجو در محصولات..." 
              className="bg-[#F5F5F7] dark:bg-[#1D1D1F] text-xs px-4 py-2 pr-9 rounded-full w-48 focus:w-64 focus:outline-none focus:ring-1 focus:ring-[#0071E3] transition-all"
            />
            <Search className="w-3.5 h-3.5 absolute right-3 top-2.5 text-gray-400" />
          </div>

          <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition">
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          <Link href="/profile" className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition">
            <User className="w-4 h-4" />
          </Link>

          <Link href="/checkout" className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition relative">
            <ShoppingBag className="w-4 h-4" />
            <span className="absolute top-1 right-1 bg-[#0071E3] text-white text-[9px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold">
              ۲
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}