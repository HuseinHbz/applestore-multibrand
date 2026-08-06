import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")

    const where = {}
    if (userId) where.userId = userId

    const orders = await prisma.order.findMany({
      where,
      include: {
        items: { include: { variant: { include: { product: true } } } },
        branch: true,
        user: { select: { name: true, email: true } },
      },
      orderBy: { createdAt: "desc" },
    })

    return NextResponse.json({ success: true, data: orders })
  } catch (error) {
    console.error("GET /api/orders error:", error)
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const body = await request.json()
    const { items, total, userId, branchId, address, paymentMethod } = body

    const order = await prisma.order.create({
      data: {
        userId,
        branchId,
        total,
        address,
        paymentMethod,
        items: {
          create: items.map((item) => ({
            variantId: item.variantId,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
      include: {
        items: { include: { variant: { include: { product: true } } } },
        branch: true,
      },
    })

    return NextResponse.json({ success: true, data: order }, { status: 201 })
  } catch (error) {
    console.error("POST /api/orders error:", error)
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
