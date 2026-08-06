import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req) {
  try {
    const body = await req.json();
    const { title, slug, description, price, stock, brandId, images } = body;

    if (!title || !price || !brandId) {
      return NextResponse.json({ success: false, message: 'اطلاعات الزامی وارد نشده است' }, { status: 400 });
    }

    const generatedSlug = slug || title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');

    const product = await prisma.product.create({
      data: {
        title,
        slug: generatedSlug,
        description: description || '',
        price: parseFloat(price),
        stock: parseInt(stock) || 0,
        brandId,
        images: images || []
      }
    });

    return NextResponse.json({ success: true, product }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      include: { brand: true },
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json({ success: true, products });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}