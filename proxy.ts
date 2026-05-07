import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
  // Lấy cả 2 token từ cookie
  const accessToken = request.cookies.get('accessToken')?.value
  const refreshToken = request.cookies.get('refreshToken')?.value

  // Một người được coi là "đã đăng nhập" nếu còn ít nhất 1 trong 2 token
  const isAuthenticated = accessToken || refreshToken

  const { pathname } = request.nextUrl

  // Định nghĩa các trang không cần login
  const isAuthPage =
    pathname === '/signin' ||
    pathname === '/signup'

  // 1. Nếu đã LOGIN mà cố tình vào trang signin/signup -> Đá về Home
  if (isAuthenticated && isAuthPage) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  // 2. Nếu CHƯA LOGIN mà vào các trang yêu cầu bảo mật -> Đá về Sign In
  // (Ngoại trừ các trang auth, static files đã được matcher lọc)
  if (!isAuthenticated && !isAuthPage) {
    return NextResponse.redirect(new URL('/signin', request.url))
  }

  // Cho phép đi tiếp
  return NextResponse.next()
}

// Giữ nguyên config matcher của bạn vì nó đã lọc tốt các file tĩnh
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|svg|gif|webp|css|js|map)$).*)',
  ],
}