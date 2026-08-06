"use client"

import { useState } from "react"
import Link from "next/link"
import { useT } from "@/lib/i18n/provider"
import { useCartStore } from "@/lib/store/cart"
import { useAuthStore } from "@/lib/store/auth"
import { useWishlistStore } from "@/lib/store/wishlist"
import { useCompareStore } from "@/lib/store/compare"
import { useTheme } from "@/components/shared/ThemeProvider"
import { Menu, X, ShoppingCart, User, Globe, ChevronDown, Heart, Scale, Moon, Sun, Package } from "lucide-react"

export function Header() {
  const { t, toggleLocale, locale } = useT()
  const { getTotalItems } = useCartStore()
  const { user, isAuthenticated, logout } = useAuthStore()
  const { items: wishlistItems } = useWishlistStore()
  const { items: compareItems } = useCompareStore()
  const { theme, toggleTheme } = useTheme()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [megaMenuOpen, setMegaMenuOpen] = useState(false)

  const navItems = [
    { label: t("nav.products"), href: "/products" },
    { label: t("nav.accessories"), href: "/accessories" },
    { label: t("nav.tradeIn"), href: "/trade-in" },
    { label: t("nav.installments"), href: "/installments" },
    { label: t("nav.used"), href: "/used" },
    { label: t("nav.appleId"), href: "/apple-id" },
    { label: t("nav.giftCards"), href: "/gift-cards" },
    { label: t("nav.blog"), href: "/blog" },
    { label: t("nav.news"), href: "/news" },
  ]

  return (
    <header className="sticky top-0 z-50 glass border-b border-gray-200/50 dark:border-gray-700/50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold text-apple-dark dark:text-white">🍎</span>
            <span className="font-semibold text-lg hidden sm:block dark:text-white">Apple Store</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6">
            <div 
              className="relative"
              onMouseEnter={() => setMegaMenuOpen(true)}
              onMouseLeave={() => setMegaMenuOpen(false)}
            >
              <button className="flex items-center gap-1 text-sm font-medium hover:text-apple-blue transition dark:text-gray-300 dark:hover:text-white">
                {t("nav.products")}
                <ChevronDown className="w-4 h-4" />
              </button>

              {megaMenuOpen && (
                <div className="absolute top-full right-0 w-[600px] bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 p-6 mt-2">
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <h4 className="font-semibold mb-3 text-sm dark:text-white">iPhone</h4>
                      <div className="space-y-2">
                        <Link href="/products/iphone-16-pro" className="block text-sm text-gray-600 dark:text-gray-400 hover:text-apple-blue">iPhone 16 Pro</Link>
                        <Link href="/products/iphone-16" className="block text-sm text-gray-600 dark:text-gray-400 hover:text-apple-blue">iPhone 16</Link>
                        <Link href="/products/iphone-15" className="block text-sm text-gray-600 dark:text-gray-400 hover:text-apple-blue">iPhone 15</Link>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3 text-sm dark:text-white">Mac</h4>
                      <div className="space-y-2">
                        <Link href="/products/macbook-pro" className="block text-sm text-gray-600 dark:text-gray-400 hover:text-apple-blue">MacBook Pro</Link>
                        <Link href="/products/macbook-air" className="block text-sm text-gray-600 dark:text-gray-400 hover:text-apple-blue">MacBook Air</Link>
                        <Link href="/products/imac" className="block text-sm text-gray-600 dark:text-gray-400 hover:text-apple-blue">iMac</Link>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3 text-sm dark:text-white">Watch & Audio</h4>
                      <div className="space-y-2">
                        <Link href="/products/apple-watch" className="block text-sm text-gray-600 dark:text-gray-400 hover:text-apple-blue">Apple Watch</Link>
                        <Link href="/products/airpods" className="block text-sm text-gray-600 dark:text-gray-400 hover:text-apple-blue">AirPods</Link>
                        <Link href="/products/homepod" className="block text-sm text-gray-600 dark:text-gray-400 hover:text-apple-blue">HomePod</Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {navItems.slice(1).map((item) => (
              <Link 
                key={item.href} 
                href={item.href}
                className="text-sm font-medium hover:text-apple-blue transition dark:text-gray-300 dark:hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button 
              onClick={toggleTheme}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition"
              title="Toggle Theme"
            >
              {theme === "dark" ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5" />}
            </button>

            <button 
              onClick={toggleLocale}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition"
              title="Toggle Language"
            >
              <Globe className="w-5 h-5 dark:text-gray-300" />
            </button>

            <Link href="/compare" className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition relative hidden sm:flex">
              <Scale className="w-5 h-5 dark:text-gray-300" />
              {compareItems.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-purple-500 text-white text-xs rounded-full flex items-center justify-center">
                  {compareItems.length}
                </span>
              )}
            </Link>

            <Link href="/profile?tab=wishlist" className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition relative hidden sm:flex">
              <Heart className="w-5 h-5 dark:text-gray-300" />
              {wishlistItems.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {wishlistItems.length}
                </span>
              )}
            </Link>

            <Link href="/cart" className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition relative">
              <ShoppingCart className="w-5 h-5 dark:text-gray-300" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-apple-blue text-white text-xs rounded-full flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
            </Link>

            {isAuthenticated ? (
              <div className="relative group">
                <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition">
                  <User className="w-5 h-5 dark:text-gray-300" />
                </button>
                <div className="absolute left-0 top-full w-48 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 p-2 mt-2 hidden group-hover:block">
                  <div className="px-3 py-2 text-sm font-medium border-b border-gray-100 dark:border-gray-700 dark:text-white">
                    {user?.name}
                  </div>
                  <Link href="/profile" className="block px-3 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 dark:text-gray-300 rounded-lg">
                    {t("nav.profile")}
                  </Link>
                  <Link href="/track-order" className="block px-3 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 dark:text-gray-300 rounded-lg">
                    پیگیری سفارش
                  </Link>
                  {user?.role === "admin" && (
                    <Link href="/admin" className="block px-3 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 dark:text-gray-300 rounded-lg">
                      {t("nav.admin")}
                    </Link>
                  )}
                  <button 
                    onClick={logout}
                    className="w-full text-right px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
                  >
                    {t("nav.logout")}
                  </button>
                </div>
              </div>
            ) : (
              <Link 
                href="/login" 
                className="hidden sm:flex items-center gap-2 px-4 py-2 bg-apple-dark text-white rounded-full text-sm font-medium hover:bg-gray-800 transition"
              >
                <User className="w-4 h-4" />
                {t("nav.login")}
              </Link>
            )}

            <button 
              className="lg:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5 dark:text-white" /> : <Menu className="w-5 h-5 dark:text-white" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-100 dark:border-gray-700 bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl">
          <nav className="flex flex-col p-4 space-y-2">
            {navItems.map((item) => (
              <Link 
                key={item.href} 
                href={item.href}
                className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-xl text-sm font-medium dark:text-gray-300"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link href="/track-order" className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-xl text-sm font-medium dark:text-gray-300">
              پیگیری سفارش
            </Link>
            <Link href="/compare" className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-xl text-sm font-medium dark:text-gray-300">
              مقایسه ({compareItems.length})
            </Link>
            {!isAuthenticated && (
              <Link 
                href="/login"
                className="px-4 py-3 bg-apple-blue text-white rounded-xl text-sm font-medium text-center"
              >
                {t("nav.login")}
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}
