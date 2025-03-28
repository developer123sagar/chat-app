import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname

  const isPublicPath = path === '/signup' || path === '/verifyemail' || path === "/forgotpassword" || path === "/resetpassword"
  const isPrivate = path === "/onboarding";

  const token = req.cookies.get('token')?.value || ''

  if (isPublicPath && token || isPrivate && !token) {
    return NextResponse.redirect(new URL('/', req.nextUrl))
  }
}

export const config = {
  matcher: [
    '/:path*',
    '/signup/:path*',
    '/verifyemail/:path*',
    '/onboarding/:path*',
    '/forgotpassword/:path*'
  ]
}