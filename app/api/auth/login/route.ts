import { NextResponse } from "next/server"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import prisma from "@/lib/prisma"

export const POST = async (req: Request) => {
  const { username, password } = await req.json()
  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  })
  if (!user) {
    return NextResponse.json({ error: "User not found." }, { status: 401 })
  }
  const isPWCorrect = await bcrypt.compare(password, user.password)
  if (!isPWCorrect) {
    return NextResponse.json(
      { error: "Password is incorrect." },
      { status: 401 }
    )
  }
  const token = jwt.sign({ sub: user.id }, process.env.JWT_SECRET as string, {
    expiresIn: "24h",
  })
  const res = NextResponse.json(
    { message: "Successfully logged in." },
    { status: 200 }
  )
  res.cookies.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 86400,
  })
  return res
}
