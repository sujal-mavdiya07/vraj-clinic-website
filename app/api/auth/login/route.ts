import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    // Change these to whatever username/password you want the doctor to use
    const correctUsername = process.env.ADMIN_USERNAME || "admin";
    const correctPassword = process.env.ADMIN_PASSWORD || "vraj123";

    if (username === correctUsername && password === correctPassword) {
      // Create a secure response
      const response = NextResponse.json({ success: true }, { status: 200 });
      
      // Set a secure, HTTP-only cookie that lasts for 7 days
      response.cookies.set('clinic_admin_session', 'authenticated', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        maxAge: 60 * 60 * 24 * 7 
      });

      return response;
    }

    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}