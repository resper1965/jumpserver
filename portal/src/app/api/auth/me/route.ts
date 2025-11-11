import { NextRequest, NextResponse } from 'next/server';
import { verifySession } from '@/lib/auth';
import { SESSION_CONFIG } from '../../../../../auth.config';

// GET /api/auth/me - Get current user info
export async function GET(request: NextRequest) {
  try {
    const sessionCookie = request.cookies.get(SESSION_CONFIG.cookieName);

    if (!sessionCookie) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const session = await verifySession(sessionCookie.value);

    if (!session) {
      return NextResponse.json({ error: 'Invalid session' }, { status: 401 });
    }

    return NextResponse.json({
      user: {
        id: session.id,
        username: session.username,
        email: session.email,
        name: session.name,
        role: session.role,
      },
    });
  } catch (error) {
    console.error('Error fetching user info:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
