import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req) {
  try {
    const body = await req.json();
    const { title, slug, body: contentBody, category, image } = body;

    if (!title || !contentBody) {
      return NextResponse.json({ success: false, message: 'عنوان و متن الزامی است' }, { status: 400 });
    }

    // ساخت اسلاگ استاندارد فارسی و انگلیسی
    const formattedSlug = slug 
      ? encodeURIComponent(slug.trim().replace(/\s+/g, '-'))
      : encodeURIComponent(title.trim().replace(/\s+/g, '-'));

    const content = await prisma.content.create({
      data: {
        title,
        slug: formattedSlug,
        body: contentBody,
        category: category || 'news',
        image: image || null
      }
    });

    return NextResponse.json({ success: true, content }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}