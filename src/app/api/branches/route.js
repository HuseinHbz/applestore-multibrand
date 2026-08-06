import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const branches = await prisma.branch.findMany({
      include: { _count: { select: { inventories: true } } },
    })
    return NextResponse.json({ success: true, data: branches })
  } catch (error) {
    console.error("GET /api/branches error:", error)
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const body = await request.json()
    const branch = await prisma.branch.create({ data: body })
    return NextResponse.json({ success: true, data: branch }, { status: 201 })
  } catch (error) {
    console.error("POST /api/branches error:", error)
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
