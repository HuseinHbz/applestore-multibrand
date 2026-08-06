export const revalidate = 0;

import { prisma } from '@/lib/prisma';
import HomePageClient from '@/components/home/HomePageClient';

export default async function HomePage() {
  let products = [];
  let contents = [];
  let settings = null;

  try {
    // دریافت محصولات فقط با روابط معتبر دیتابیس
    products = await prisma.product.findMany({
      include: { brand: true },
      orderBy: { createdAt: 'desc' },
    });
  } catch (error) {
    console.error('Error fetching products:', error);
  }

  try {
    contents = await prisma.content.findMany({
      where: { published: true },
      orderBy: { createdAt: 'desc' },
      take: 3,
    });
  } catch (error) {
    console.error('Error fetching contents:', error);
  }

  try {
    settings = await prisma.siteSetting.findUnique({
      where: { id: 'default' },
    });
  } catch (error) {
    console.error('Error fetching settings:', error);
  }

  return (
    <HomePageClient 
      products={JSON.parse(JSON.stringify(products || []))} 
      contents={JSON.parse(JSON.stringify(contents || []))} 
      settings={JSON.parse(JSON.stringify(settings || {}))} 
    />
  );
}