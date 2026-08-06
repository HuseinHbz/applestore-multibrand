import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const [totalRevenue, totalOrders, totalProducts, totalUsers, pendingOrders, lowStock] = await Promise.all([
      prisma.order.aggregate({ _sum: { total: true } }),
      prisma.order.count(),
      prisma.product.count(),
      prisma.user.count(),
      prisma.order.count({ where: { status: "pending" } }),
      prisma.inventory.count({ where: { qty: { lt: 5 } } }),
    ])

    const recentOrders = await prisma.order.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: {
        items: { include: { variant: { include: { product: true } } } },
        user: { select: { name: true } },
      },
    })

    return NextResponse.json({
      success: true,
      data: {
        totalRevenue: totalRevenue._sum.total || 0,
        totalOrders,
        totalProducts,
        totalUsers,
        pendingOrders,
        lowStock,
        recentOrders,
      },
    })
  } catch (error) {
    console.error("GET /api/dashboard error:", error)
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
