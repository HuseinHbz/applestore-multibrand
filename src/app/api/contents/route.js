import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req) {
  try {
    const { title, slug, body, category, image } = await req.json();

    const generatedSlug = slug || title.toLowerCase().replace(/ /g, '-');

    const content = await prisma.content.create({
      data: {
        title,
        slug: generatedSlug,
        body,
        category: category || 'news',
        image: image || null
      }
    });

    return NextResponse.json({ success: true, content }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const contents = await prisma.content.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json({ success: true, contents });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}