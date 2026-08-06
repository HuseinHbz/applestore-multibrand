const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // ۱. ایجاد برند پایه
  const brand = await prisma.brand.upsert({
    where: { slug: 'apple' },
    update: {},
    create: {
      name: 'Apple',
      slug: 'apple',
    },
  });

  // ۲. ایجاد دسته‌بندی پایه
  const category = await prisma.category.upsert({
    where: { slug: 'iphone' },
    update: {},
    create: {
      name: 'آیفون (iPhone)',
      slug: 'iphone',
      image: '/images/iphone.png',
    },
  });

  // ۳. ایجاد تنظیمات اولیه‌ سایت
  await prisma.siteSetting.upsert({
    where: { id: 'default' },
    update: {},
    create: {
      id: 'default',
      siteName: 'Apple Store Premium',
      heroTitle: 'iPhone 18 Pro',
      heroSub: 'Titanium. Built for AI.',
      heroPrice: '۷۹,۹۰۰,۰۰۰',
    },
  });

  // ۴. ایجاد اولین محصول نمونه
  await prisma.product.upsert({
    where: { slug: 'iphone-18-pro' },
    update: {},
    create: {
      title: 'iPhone 18 Pro Max',
      slug: 'iphone-18-pro',
      description: 'پرچمدار جدید اپل با بدنه تیتانیوم و هوش مصنوعی پیشرفته',
      price: 89900000,
      stock: 10,
      isBestSeller: true,
      images: ['https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&q=80'],
      colors: ['Natural Titanium', 'Desert Titanium'],
      storageOptions: ['256GB', '512GB', '1TB'],
      brandId: brand.id,
      categoryId: category.id,
    },
  });

  console.log('✅ Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });