import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // If the user is trying to access the /admin page...
  if (request.nextUrl.pathname.startsWith('/admin')) {
    
    // Check if they have the secret cookie we gave them at login
    const session = request.cookies.get('clinic_admin_session')?.value;

    // If they don't have it, kick them out to our new /login page
    if (session !== 'authenticated') {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // Otherwise, let them through
  return NextResponse.next();
}

// Ensure middleware only runs on specific paths
export const config = {
  matcher: ['/admin/:path*'],
};