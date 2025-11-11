import { NextResponse } from 'next/server';
import { SESSION_CONFIG } from '../../../../../auth.config';

export async function POST() {
  const response = NextResponse.json({ success: true });

  // Clear the session cookie
  response.cookies.set({
    name: SESSION_CONFIG.cookieName,
    value: '',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 0,
    path: '/',
  });

  return response;
}
