import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// ۱. دریافت محصولات از دیتابیس
export async function GET() {
  try {
    const products = await prisma.product.findMany({
      include: { brand: true, category: true },
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json({ success: true, products });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

// ۲. افزودن محصول جدید از پنل مدیریت به دیتابیس
export async function POST(req) {
  try {
    const body = await req.json();
    const { title, slug, description, price, stock, brandId, categoryId, images, isBestSeller, colors, storageOptions } = body;

    if (!title || !price) {
      return NextResponse.json({ success: false, message: 'عنوان و قیمت الزامی است' }, { status: 400 });
    }

    const formattedSlug = slug 
      ? encodeURIComponent(slug.trim().replace(/\s+/g, '-'))
      : encodeURIComponent(title.trim().replace(/\s+/g, '-'));

    const product = await prisma.product.create({
      data: {
        title,
        slug: formattedSlug,
        description: description || '',
        price: parseFloat(price),
        stock: parseInt(stock) || 0,
        brandId: brandId || null,
        categoryId: categoryId || null,
        isBestSeller: Boolean(isBestSeller),
        images: images || [],
        colors: colors || [],
        storageOptions: storageOptions || []
      }
    });

    return NextResponse.json({ success: true, product }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

// ۳. ویرایش محصول موجود از پنل مدیریت
export async function PUT(req) {
  try {
    const body = await req.json();
    const { id, ...updateData } = body;

    if (!id) {
      return NextResponse.json({ success: false, message: 'شناسه محصول الزامی است' }, { status: 400 });
    }

    if (updateData.price) updateData.price = parseFloat(updateData.price);
    if (updateData.stock) updateData.stock = parseInt(updateData.stock);

    const product = await prisma.product.update({
      where: { id },
      data: updateData
    });

    return NextResponse.json({ success: true, product });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}