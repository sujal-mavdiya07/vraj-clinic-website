import { NextResponse } from 'next/server';

export function middleware(request) {
  // 1. Only act as a bouncer for the /admin area
  if (request.nextUrl.pathname.startsWith('/admin')) {
    
    // 2. Check if the user has tried to send a password
    const basicAuth = request.headers.get('authorization');

    if (basicAuth) {
      // 3. Unscramble the password the browser sent
      const authValue = basicAuth.split(' ')[1];
      const [user, pwd] = atob(authValue).split(':');

      // 4. THE SECRET LOGIN DETAILS
      if (user === 'drshruti' && pwd === 'vraj2026') {
        return NextResponse.next(); // Success! Open the door.
      }
    }

    // 5. If no password or wrong password, force the login popup
    return new NextResponse('Unauthorized access. Please log in.', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Secure Admin Area"',
      },
    });
  }
}

// 6. Tell Next.js which URLs to protect (Bulletproof version)
export const config = {
  matcher: ['/admin', '/admin/:path*'],
};