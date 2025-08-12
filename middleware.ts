import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Redirect old admin routes to new protected admin routes
  if (pathname.startsWith('/admin')) {
    return NextResponse.redirect(new URL('/rafli/admin/login', request.url))
  }

  // For admin routes, we'll handle authentication in the layout component
  // since middleware doesn't have access to localStorage
  if (pathname.startsWith('/rafli/admin') && pathname !== '/rafli/admin/login') {
    // Let the layout component handle authentication
    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/rafli/admin/:path*'
  ]
}
