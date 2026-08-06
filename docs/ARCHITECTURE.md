# معماری (Architecture)

## Tech Stack

| لایه | تکنولوژی | دلیل انتخاب |
|------|----------|-------------|
| Framework | Next.js 15 (App Router) | SSR/SSG، روتینگ فایل‌محور، اکوسیستم بالغ |
| Language | JavaScript | سادگی و سرعت توسعه |
| Styling | Tailwind CSS 3 | سرعت، توکن‌محور، سازگار با white-label |
| UI Kit | shadcn/ui (customized) | کامپوننت‌های در اختیار ما، قابل بازطراحی |
| State | Zustand + persist | سبک، بدون boilerplate، ذخیره در localStorage |
| Charts | Recharts | داشبورد ادمین |
| Toast | Sonner | نوتیفیکیشن |
| Icons | lucide-react | ست آیکون یکدست |

## ساختار پوشه‌ها

```
applestore-multibrand/
├── docs/                        # مستندات پروژه
│   ├── ARCHITECTURE.md          # این فایل
│   ├── PHASES.md                # فازبندی و نقشه‌راه
│   └── PROGRESS.md              # گزارش پیشرفت مرحله‌به‌مرحله
├── src/
│   ├── app/
│   │   ├── (public)/            # سایت عمومی
│   │   ├── admin/               # پنل مدیریت (auth guard)
│   │   ├── globals.css          # دیزاین‌سیستم
│   │   └── layout.jsx           # ریشه + provider ها
│   ├── components/
│   │   ├── ui/                  # shadcn (سفارشی‌سازی‌شده)
│   │   ├── layout/              # Header / Footer / AdminSidebar
│   │   ├── product/             # ProductCard / Gallery / Filters
│   │   ├── home/                # سکشن‌های صفحه‌ی خانه
│   │   └── shared/              # Price / Money / EmptyState / ...
│   ├── lib/
│   │   ├── i18n/                # دیکشنری fa/en
│   │   ├── brand/               # پیکربندی برند/تننت
│   │   ├── store/               # Zustand stores
│   │   ├── seed/                # داده‌ی اولیه (mock)
│   │   ├── format.js            # قیمت، تاریخ، اعداد فارسی
│   │   └── utils.js             # توابع کمکی
│   └── types/                   # تایپ‌های مشترک دامنه
```

## مدل داده (Domain Model)

موجودیت‌های کلیدی:
- **Brand** — نام، لوگو، رنگ اصلی، واحد پول، دامنه (white-label)
- **Branch** — شعبه: نام، آدرس، تلفن، ساعت کاری، مختصات، انبار
- **Product** — دسته (mobile / accessory / used)، اسلاگ، گالری، مشخصات
- **Variant** — رنگ + ظرفیت + قیمت + SKU
- **Inventory** — {branchId, variantId, qty}
- **Order / OrderItem** — سفارش مشتری + آیتم‌ها + وضعیت
- **SalesInvoice / PurchaseInvoice** — فاکتور فروش و خرید
- **User** — نقش: customer | staff | manager | admin
- **Content** — page | blog | news | banner | offer

## اصول طراحی

1. **Locale-first** — همه‌ی متن‌ها از دیکشنری می‌آیند، هیچ رشته‌ی hard-code شده‌ای در UI نیست.
2. **Brand-driven tokens** — رنگ و لوگو و ارز از settings store خوانده می‌شود و روی CSS variables می‌نشیند.
3. **Store as source of truth** — همه‌ی داده‌ها از Zustand می‌آید تا بعداً به‌راحتی با API واقعی جایگزین شود.
4. **Server-safe** — کامپوننت‌های تعاملی "use client" و بقیه سرور کامپوننت.
