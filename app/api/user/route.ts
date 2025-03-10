import { NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"

export const GET = async (req: NextRequest) => {
  const token = req.cookies.get("token")
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  try {
    const decoded = jwt.verify(token.value, process.env.JWT_SECRET as string)
    return NextResponse.json({ user: decoded })
  } catch (error) {
    return NextResponse.json({ error }, { status: 401 })
  }
}
