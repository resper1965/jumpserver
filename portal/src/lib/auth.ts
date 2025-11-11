import { SignJWT, jwtVerify } from 'jose';
import bcrypt from 'bcryptjs';
import { JWT_SECRET, SESSION_CONFIG, type User } from '../../auth.config';
import { getUserByUsernameOrEmail, updateLastLogin } from './users';

const secret = new TextEncoder().encode(JWT_SECRET);

export interface SessionPayload {
  id: string;
  username: string;
  email: string;
  name: string;
  role: string;
  exp: number;
}

/**
 * Verify user credentials
 */
export async function verifyCredentials(
  usernameOrEmail: string,
  password: string
): Promise<User | null> {
  const user = await getUserByUsernameOrEmail(usernameOrEmail);

  if (!user) {
    return null;
  }

  const isValid = await bcrypt.compare(password, user.passwordHash);

  if (!isValid) {
    return null;
  }

  // Update last login
  await updateLastLogin(user.id);

  return user;
}

/**
 * Create a JWT session token
 */
export async function createSession(user: User): Promise<string> {
  const payload: SessionPayload = {
    id: user.id,
    username: user.username,
    email: user.email,
    name: user.name,
    role: user.role,
    exp: Math.floor(Date.now() / 1000) + SESSION_CONFIG.maxAge,
  };

  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('8h')
    .sign(secret);

  return token;
}

/**
 * Verify and decode a JWT session token
 */
export async function verifySession(token: string): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload as SessionPayload;
  } catch (error) {
    return null;
  }
}

/**
 * Get session from request cookies
 */
export function getSessionFromCookie(cookieValue: string | undefined): string | null {
  if (!cookieValue) {
    return null;
  }

  try {
    // Cookie format: "session=token"
    const match = cookieValue.match(/session=([^;]+)/);
    return match ? match[1] : null;
  } catch {
    return null;
  }
}

/**
 * Check if a route requires authentication
 */
export function isProtectedRoute(pathname: string): boolean {
  const protectedPaths = ['/docs', '/questionnaire', '/admin'];
  return protectedPaths.some((path) => pathname.startsWith(path));
}

/**
 * Check if a route is public
 */
export function isPublicRoute(pathname: string): boolean {
  const publicPaths = ['/', '/api/auth/login', '/api/auth/logout', '/login'];
  return publicPaths.some((path) => pathname === path || pathname.startsWith('/login'));
}

/**
 * Check if user is admin
 */
export function isAdmin(session: SessionPayload | null): boolean {
  return session?.role === 'admin';
}
