import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {

  // CHỈ CHECK REFRESH TOKEN
  const refreshToken =
    request.cookies.get('refreshToken')?.value

  const { pathname } = request.nextUrl

  const isAuthPage =

    pathname === '/signin' ||

    pathname === '/signup'

  // Đã login mà vào signin/signup
  if (refreshToken && isAuthPage) {

    return NextResponse.redirect(
      new URL('/', request.url)
    )
  }

  // Chưa login mà vào protected route
  if (!refreshToken && !isAuthPage) {

    return NextResponse.redirect(
      new URL('/signin', request.url)
    )
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|svg|gif|webp|css|js|map)$).*)',
  ],
}