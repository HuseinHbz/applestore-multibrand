import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const branchId = searchParams.get("branchId")

    const where = {}
    if (branchId) where.branchId = branchId

    const inventories = await prisma.inventory.findMany({
      where,
      include: {
        branch: { select: { name: true } },
        variant: { include: { product: { select: { name: true, slug: true } } } },
      },
    })

    return NextResponse.json({ success: true, data: inventories })
  } catch (error) {
    console.error("GET /api/inventory error:", error)
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
