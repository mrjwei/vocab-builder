import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import jwt from "jsonwebtoken"

export const GET = async () => {
  const cookieStore = await cookies()
  const token = cookieStore.get("token")?.value
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string)
    return NextResponse.json({ user: decoded })
  } catch (error) {
    return NextResponse.json({ error }, { status: 401 })
  }
}
