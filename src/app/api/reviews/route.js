import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const productId = searchParams.get("productId")

    const where = {}
    if (productId) where.productId = productId

    const reviews = await prisma.review.findMany({
      where,
      include: { user: { select: { name: true } } },
      orderBy: { createdAt: "desc" },
    })

    return NextResponse.json({ success: true, data: reviews })
  } catch (error) {
    console.error("GET /api/reviews error:", error)
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const body = await request.json()
    const review = await prisma.review.create({
      data: body,
      include: { user: { select: { name: true } } },
    })
    return NextResponse.json({ success: true, data: review }, { status: 201 })
  } catch (error) {
    console.error("POST /api/reviews error:", error)
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
