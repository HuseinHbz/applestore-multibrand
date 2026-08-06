"use client"

import { createContext, useContext, useState, useCallback } from "react"

const dictionaries = {
  fa: {
    nav: {
      home: "خانه",
      products: "محصولات",
      accessories: "لوازم جانبی",
      tradeIn: "معاوضه",
      installments: "اقساط",
      used: "کارکرده",
      appleId: "Apple ID",
      giftCards: "گیفت کارت",
      blog: "وبلاگ",
      news: "اخبار",
      offers: "پیشنهادها",
      about: "درباره ما",
      branches: "شعب",
      cart: "سبد خرید",
      login: "ورود",
      register: "ثبت‌نام",
      profile: "پروفایل",
      admin: "پنل مدیریت",
      logout: "خروج",
    },
    home: {
      heroTitle: "iPhone 16 Pro",
      heroSubtitle: "قدرتمندترین آیفون تاریخ. طراحی تیتانیومی، دوربین پیشرفته و چیپ A18 Pro.",
      buyNow: "خرید کنید",
      learnMore: "اطلاعات بیشتر",
      featuredProducts: "محصولات ویژه",
      fastShipping: "ارسال سریع",
      fastShippingDesc: "ارسال به سراسر کشور در کمتر از ۲۴ ساعت",
      authentic: "ضمانت اصالت",
      authenticDesc: "۱۰۰٪ اورجینال با گارانتی رسمی",
      installment: "پرداخت اقساطی",
      installmentDesc: "خرید تا ۲۴ ماه اقساط بدون بهره",
    },
    product: {
      addToCart: "افزودن به سبد",
      outOfStock: "ناموجود",
      color: "رنگ",
      storage: "ظرفیت",
      price: "قیمت",
      specs: "مشخصات فنی",
      relatedProducts: "محصولات مرتبط",
    },
    cart: {
      title: "سبد خرید",
      empty: "سبد خرید شما خالی است",
      total: "جمع کل",
      checkout: "تسویه حساب",
      remove: "حذف",
      quantity: "تعداد",
    },
    checkout: {
      title: "تسویه حساب",
      address: "آدرس",
      branch: "شعبه تحویل",
      payment: "روش پرداخت",
      placeOrder: "ثبت سفارش",
    },
    auth: {
      login: "ورود",
      register: "ثبت‌نام",
      email: "ایمیل",
      password: "رمز عبور",
      name: "نام و نام خانوادگی",
      phone: "شماره موبایل",
      submit: "ارسال",
    },
    admin: {
      dashboard: "داشبورد",
      products: "محصولات",
      inventory: "انبار",
      invoices: "فاکتورها",
      branches: "شعب",
      content: "محتوا",
      users: "کاربران",
      staff: "پرسنل",
      settings: "تنظیمات",
    },
    common: {
      search: "جستجو",
      filter: "فیلتر",
      sort: "مرتب‌سازی",
      save: "ذخیره",
      cancel: "انصراف",
      edit: "ویرایش",
      delete: "حذف",
      create: "ایجاد",
      confirm: "تایید",
      close: "بستن",
      loading: "در حال بارگذاری...",
      error: "خطا",
      success: "موفق",
    },
  },
  en: {
    nav: {
      home: "Home",
      products: "Products",
      accessories: "Accessories",
      tradeIn: "Trade In",
      installments: "Installments",
      used: "Used",
      appleId: "Apple ID",
      giftCards: "Gift Cards",
      blog: "Blog",
      news: "News",
      offers: "Offers",
      about: "About",
      branches: "Branches",
      cart: "Cart",
      login: "Login",
      register: "Register",
      profile: "Profile",
      admin: "Admin",
      logout: "Logout",
    },
    home: {
      heroTitle: "iPhone 16 Pro",
      heroSubtitle: "The most powerful iPhone ever. Titanium design, advanced camera, and A18 Pro chip.",
      buyNow: "Buy Now",
      learnMore: "Learn More",
      featuredProducts: "Featured Products",
      fastShipping: "Fast Shipping",
      fastShippingDesc: "Nationwide delivery in less than 24 hours",
      authentic: "Authentic Guarantee",
      authenticDesc: "100% original with official warranty",
      installment: "Installment Payment",
      installmentDesc: "Buy in up to 24 months with no interest",
    },
    product: {
      addToCart: "Add to Cart",
      outOfStock: "Out of Stock",
      color: "Color",
      storage: "Storage",
      price: "Price",
      specs: "Specifications",
      relatedProducts: "Related Products",
    },
    cart: {
      title: "Shopping Cart",
      empty: "Your cart is empty",
      total: "Total",
      checkout: "Checkout",
      remove: "Remove",
      quantity: "Quantity",
    },
    checkout: {
      title: "Checkout",
      address: "Address",
      branch: "Pickup Branch",
      payment: "Payment Method",
      placeOrder: "Place Order",
    },
    auth: {
      login: "Login",
      register: "Register",
      email: "Email",
      password: "Password",
      name: "Full Name",
      phone: "Phone Number",
      submit: "Submit",
    },
    admin: {
      dashboard: "Dashboard",
      products: "Products",
      inventory: "Inventory",
      invoices: "Invoices",
      branches: "Branches",
      content: "Content",
      users: "Users",
      staff: "Staff",
      settings: "Settings",
    },
    common: {
      search: "Search",
      filter: "Filter",
      sort: "Sort",
      save: "Save",
      cancel: "Cancel",
      edit: "Edit",
      delete: "Delete",
      create: "Create",
      confirm: "Confirm",
      close: "Close",
      loading: "Loading...",
      error: "Error",
      success: "Success",
    },
  },
}

const I18nContext = createContext(null)

export function I18nProvider({ children }) {
  const [locale, setLocale] = useState("fa")

  const t = useCallback(
    (key) => {
      const keys = key.split(".")
      let value = dictionaries[locale]
      for (const k of keys) {
        value = value?.[k]
      }
      return value || key
    },
    [locale]
  )

  const toggleLocale = useCallback(() => {
    setLocale((prev) => (prev === "fa" ? "en" : "fa"))
  }, [])

  const dir = locale === "fa" ? "rtl" : "ltr"

  return (
    <I18nContext.Provider value={{ locale, dir, t, toggleLocale, setLocale }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useT() {
  const context = useContext(I18nContext)
  if (!context) throw new Error("useT must be used within I18nProvider")
  return context
}

export { dictionaries }
