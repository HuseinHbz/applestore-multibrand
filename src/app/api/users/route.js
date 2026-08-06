import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      select: { id: true, name: true, email: true, phone: true, role: true, addresses: true, createdAt: true },
      orderBy: { createdAt: "desc" },
    })
    return NextResponse.json({ success: true, data: users })
  } catch (error) {
    console.error("GET /api/users error:", error)
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
