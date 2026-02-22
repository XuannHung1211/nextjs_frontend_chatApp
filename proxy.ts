import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function proxy(request: NextRequest) {

  
  // Lấy accessToken từ cookie httpOnly
  const accessToken = request.cookies.get('accessToken')?.value

  // Nếu KHÔNG có token → redirect về /login
  if (!accessToken) {
    return NextResponse.redirect(
      new URL('/signin', request.url)
    )
  }

  // Có token → cho đi tiếp
  return NextResponse.next()
}

 
// Alternatively, you can use a default export:
// export default function proxy(request: NextRequest) { ... }
 
export const config = {
  matcher: [
    /*
      Áp dụng cho TẤT CẢ route
      NGOẠI TRỪ:
      - _next (static, image)
      - favicon
      - file tĩnh: png, jpg, jpeg, svg, gif, webp
      - css, js, map
      - signin, signup (public page)
    */
    '/((?!_next/static|_next/image|favicon.ico|signin|signup|.*\\.(?:png|jpg|jpeg|svg|gif|webp|css|js|map)$).*)',
  ],
}