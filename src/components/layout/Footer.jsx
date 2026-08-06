"use client"

import Link from "next/link"
import { useT } from "@/lib/i18n/provider"
import { SearchAutocomplete } from "@/components/shared/SearchAutocomplete"

export function Footer() {
  const { t } = useT()

  const footerLinks = [
    {
      title: "محصولات",
      links: [
        { label: "iPhone", href: "/products?category=mobile" },
        { label: "Mac", href: "/products?category=laptop" },
        { label: "iPad", href: "/products?category=tablet" },
        { label: "Watch", href: "/products?category=accessory" },
        { label: "AirPods", href: "/products?category=accessory" },
      ],
    },
    {
      title: "خدمات",
      links: [
        { label: t("nav.tradeIn"), href: "/trade-in" },
        { label: t("nav.installments"), href: "/installments" },
        { label: t("nav.used"), href: "/used" },
        { label: "پیگیری سفارش", href: "/track-order" },
        { label: t("nav.giftCards"), href: "/gift-cards" },
      ],
    },
    {
      title: "درباره ما",
      links: [
        { label: t("nav.about"), href: "/about" },
        { label: t("nav.branches"), href: "/branches" },
        { label: t("nav.blog"), href: "/blog" },
        { label: t("nav.news"), href: "/news" },
        { label: t("nav.offers"), href: "/offers" },
      ],
    },
  ]

  return (
    <footer className="bg-apple-dark text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🍎</span>
              <span className="font-bold text-xl">Apple Store</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              فروشگاه رسمی محصولات اپل در ایران. اورجینال، گارانتی دار و با بهترین قیمت.
            </p>
            <div className="hidden md:block">
              <SearchAutocomplete />
            </div>
          </div>

          {/* Links */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 className="font-semibold mb-4">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-gray-400 text-sm hover:text-white transition">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © ۲۰۲۴ Apple Store Iran. تمامی حقوق محفوظ است.
          </p>
          <div className="flex gap-4">
            <Link href="/about" className="text-gray-500 text-sm hover:text-white transition">حریم خصوصی</Link>
            <Link href="/about" className="text-gray-500 text-sm hover:text-white transition">شرایط استفاده</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
