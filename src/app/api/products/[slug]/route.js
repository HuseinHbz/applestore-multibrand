import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req, { params }) {
  try {
    const { slug } = await params;
    
    const product = await prisma.product.findUnique({
      where: { slug },
      include: { brand: true }
    });

    if (!product) {
      return NextResponse.json({ success: false, message: 'محصول یافت نشد' }, { status: 404 });
    }

    return NextResponse.json({ success: true, product });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const { slug } = await params;

    await prisma.product.delete({
      where: { id: slug }
    });

    return NextResponse.json({ success: true, message: 'محصول با موفقیت حذف شد' });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}