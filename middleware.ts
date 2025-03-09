import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export const middleware = (req: NextRequest) => {
  const token = req.cookies.get("token")
  if (!token && !req.url.includes("/login")) {
    return NextResponse.redirect(new URL("/login", req.url))
  }
  return NextResponse.next()
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
}
