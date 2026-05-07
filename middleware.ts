import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(req: NextRequest) {
  const accessToken = req.cookies.get("access_token")?.value

  const isProtectedRoute = req.nextUrl.pathname.startsWith("/chat")

  if (isProtectedRoute && !accessToken) {
    const url = req.nextUrl.clone()
    url.pathname = "/signin"
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/chat/:path*"],
}