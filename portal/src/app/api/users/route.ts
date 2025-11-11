import { NextRequest, NextResponse } from 'next/server';
import { verifySession, isAdmin } from '@/lib/auth';
import { getAllUsers, createUser } from '@/lib/users';
import { SESSION_CONFIG } from '../../../../auth.config';

// GET /api/users - List all users (admin only)
export async function GET(request: NextRequest) {
  try {
    // Verify session
    const sessionCookie = request.cookies.get(SESSION_CONFIG.cookieName);
    if (!sessionCookie) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const session = await verifySession(sessionCookie.value);
    if (!session || !isAdmin(session)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Get all users
    const users = await getAllUsers();

    // Remove password hashes from response
    const safeUsers = users.map(({ passwordHash, ...user }) => user);

    return NextResponse.json({ users: safeUsers });
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST /api/users - Create new user (admin only)
export async function POST(request: NextRequest) {
  try {
    // Verify session
    const sessionCookie = request.cookies.get(SESSION_CONFIG.cookieName);
    if (!sessionCookie) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const session = await verifySession(sessionCookie.value);
    if (!session || !isAdmin(session)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const body = await request.json();
    const { username, email, password, name, role } = body;

    // Validate input
    if (!username || !email || !password || !name || !role) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    if (!['admin', 'viewer'].includes(role)) {
      return NextResponse.json(
        { error: 'Invalid role' },
        { status: 400 }
      );
    }

    // Create user
    const newUser = await createUser({
      username,
      email,
      password,
      name,
      role,
    });

    // Remove password hash from response
    const { passwordHash, ...safeUser } = newUser;

    return NextResponse.json({ user: safeUser }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating user:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: error.message === 'Username or email already exists' ? 409 : 500 }
    );
  }
}
