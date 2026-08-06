import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

export async function POST(request) {
  try {
    const { name, email, phone, password } = await request.json()

    if (!name || !email || !password) {
      return NextResponse.json({ success: false, error: "Name, email and password required" }, { status: 400 })
    }

    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) {
      return NextResponse.json({ success: false, error: "Email already exists" }, { status: 409 })
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const brand = await prisma.brand.findFirst()

    const user = await prisma.user.create({
      data: {
        name,
        email,
        phone: phone || "",
        password: hashedPassword,
        role: "customer",
        brandId: brand?.id,
      },
    })

    const { password: _, ...userWithoutPassword } = user
    return NextResponse.json({ success: true, data: userWithoutPassword }, { status: 201 })
  } catch (error) {
    console.error("POST /api/auth/register error:", error)
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
