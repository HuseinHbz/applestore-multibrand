export const revalidate = 0; // دریافت آنی از دیتابیس در هر بار لود

import { prisma } from '@/lib/prisma';
import HomePageClient from '@/components/home/HomePageClient';

export default async function HomePage() {
  // ۱. دریافت جدیدترین محصولات از دیتابیس
  const products = await prisma.product.findMany({
    include: { brand: true, category: true },
    orderBy: { createdAt: 'desc' },
  });

  // ۲. دریافت محتوا و اخبار فعال دیتابیس
  const contents = await prisma.content.findMany({
    where: { published: true },
    orderBy: { createdAt: 'desc' },
    take: 3
  });

  // ۳. دریافت تنظیمات هوشمند سایت
  const settings = await prisma.siteSetting.findUnique({
    where: { id: 'default' }
  });

  return <HomePageClient products={products} contents={contents} settings={settings} />;
}