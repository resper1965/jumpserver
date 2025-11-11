import { NextRequest, NextResponse } from 'next/server';
import { verifySession, isProtectedRoute, isPublicRoute } from '@/lib/auth';
import { SESSION_CONFIG } from '../auth.config';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow public routes
  if (isPublicRoute(pathname)) {
    return NextResponse.next();
  }

  // Check if route requires authentication
  if (isProtectedRoute(pathname)) {
    const sessionCookie = request.cookies.get(SESSION_CONFIG.cookieName);

    if (!sessionCookie) {
      // Redirect to login if no session
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Verify session token
    const session = await verifySession(sessionCookie.value);

    if (!session) {
      // Invalid or expired session - redirect to login
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      const response = NextResponse.redirect(loginUrl);

      // Clear invalid cookie
      response.cookies.set({
        name: SESSION_CONFIG.cookieName,
        value: '',
        httpOnly: true,
        maxAge: 0,
        path: '/',
      });

      return response;
    }

    // Valid session - allow request
    return NextResponse.next();
  }

  // Allow all other routes
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
