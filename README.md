# 🍎 Apple Store Iran

فروشگاه چندبرندی محصولات اپل با Next.js 15 + PostgreSQL + Prisma

## 🚀 شروع سریع

### ۱. دیتابیس (Docker)

```bash
docker-compose up -d
```

این دستور PostgreSQL و pgAdmin را راه‌اندازی می‌کند:
- PostgreSQL: `localhost:5432`
- pgAdmin: `localhost:5050` (admin@applestore.ir / admin123)

### ۲. نصب وابستگی‌ها

```bash
npm install
```

### ۳. تنظیم دیتابیس

```bash
# Generate Prisma Client
npm run db:generate

# Run migrations
npm run db:migrate

# Seed database with sample data
npm run db:seed
```

### ۴. اجرای پروژه

```bash
npm run dev
```

پروژه در `http://localhost:3000` اجرا می‌شود.

---

## 📁 ساختار پروژه

```
applestore-multibrand/
├── prisma/
│   ├── schema.prisma    # مدل داده
│   └── seed.js          # داده اولیه
├── src/
│   ├── app/             # App Router (صفحات + API)
│   │   ├── api/         # REST API Routes
│   │   ├── (public)/    # صفحات عمومی
│   │   └── admin/       # پنل مدیریت
│   ├── components/      # کامپوننت‌ها
│   ├── lib/
│   │   ├── prisma.js    # Prisma Client
│   │   ├── store/       # Zustand Stores
│   │   └── seed/        # داده اولیه (legacy)
│   └── types/           # تایپ‌ها
├── docker-compose.yml   # PostgreSQL + pgAdmin
├── .env                 # متغیرهای محیطی
└── package.json
```

---

## 🔑 اطلاعات ورود

| نقش | ایمیل | رمز عبور |
|-----|-------|----------|
| **مدیر** | `admin@applestore.ir` | `admin123` |
| **مشتری** | `ali@example.com` | `user123` |

---

## 🗺️ API Endpoints

| Method | Endpoint | توضیحات |
|--------|----------|---------|
| GET | `/api/products` | لیست محصولات |
| GET | `/api/products/[slug]` | جزئیات محصول |
| POST | `/api/auth/login` | ورود |
| POST | `/api/auth/register` | ثبت‌نام |
| GET | `/api/orders` | لیست سفارشات |
| POST | `/api/orders` | ثبت سفارش |
| GET | `/api/branches` | لیست شعب |
| GET | `/api/reviews` | نظرات |
| POST | `/api/reviews` | ثبت نظر |
| GET | `/api/contents` | محتوا |
| GET | `/api/users` | کاربران |
| GET | `/api/inventory` | موجودی |
| GET | `/api/dashboard` | آمار داشبورد |

---

## 🐘 دیتابیس (Prisma Schema)

### جداول

- **Brand** — تنظیمات برند (white-label)
- **Branch** — شعب فروشگاه
- **User** — کاربران (customer/staff/manager/admin)
- **Product** — محصولات
- **Variant** — واریانت‌ها (رنگ/ظرفیت/قیمت)
- **Inventory** — موجودی انبار به تفکیک شعبه
- **Order** — سفارشات
- **OrderItem** — آیتم‌های سفارش
- **CartItem** — سبد خرید
- **SalesInvoice** — فاکتور فروش
- **PurchaseInvoice** — فاکتور خرید
- **Content** — محتوا (blog/news/page)
- **Review** — نظرات و امتیازات
- **Wishlist** — لیست علاقه‌مندی‌ها

---

## 🛠️ دستورات مفید

```bash
# توسعه
npm run dev

# ساخت
npm run build

# Prisma
npm run db:generate    # Generate Client
npm run db:migrate     # Run Migrations
npm run db:studio      # Prisma Studio (GUI)
npm run db:seed        # Seed Data

# Docker
docker-compose up -d   # Start DB
docker-compose down    # Stop DB
```

---

## ✅ ویژگی‌ها

- ✅ Next.js 15 App Router
- ✅ PostgreSQL + Prisma ORM
- ✅ RESTful API
- ✅ Zustand State Management
- ✅ i18n (fa/en)
- ✅ RTL/LTR
- ✅ Dark Mode
- ✅ Responsive Design
- ✅ Admin Panel with Charts
- ✅ Wishlist & Compare
- ✅ Reviews & Star Rating
- ✅ Track Order
- ✅ Search Autocomplete
- ✅ White-label Brand Settings

---

## 📄 لایسنس

MIT License - Apple Store Iran
