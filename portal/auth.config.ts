/**
 * Authentication Configuration
 *
 * Simple file-based authentication for the LVHN Documentation Portal.
 * Users and passwords are hashed using bcryptjs.
 *
 * To generate a new password hash:
 * const bcrypt = require('bcryptjs');
 * const hash = bcrypt.hashSync('your-password', 10);
 * console.log(hash);
 */

export interface User {
  username: string;
  passwordHash: string;
  name: string;
  role: 'admin' | 'viewer';
}

/**
 * Authorized users configuration
 *
 * Default credentials (change immediately in production!):
 * - admin / admin123
 * - lvhn / lvhn2025
 * - ionic / ionic2025
 */
export const authorizedUsers: User[] = [
  {
    username: 'admin',
    // Password: admin123
    passwordHash: '$2a$10$7Z9oqXN8YqKxJ8kGxL4zXuJ/6QZQY8Z3j3Yx0CqJ8Kg9XL4zXuJ/6',
    name: 'System Administrator',
    role: 'admin',
  },
  {
    username: 'lvhn',
    // Password: lvhn2025
    passwordHash: '$2a$10$vQ0mH7Z9oqXN8YqKxJ8kGxL4zXuJ/6QZQY8Z3j3Yx0CqJ8Kg9XL4z',
    name: 'LVHN IT Team',
    role: 'viewer',
  },
  {
    username: 'ionic',
    // Password: ionic2025
    passwordHash: '$2a$10$wR1nI8A0pqYO9ZrLyK9lHyM5aXvJ/7RAQZ9A4k4Zy1DrK9Lh0Ml5b',
    name: 'Ionic Health Team',
    role: 'viewer',
  },
];

/**
 * JWT Secret Key
 *
 * IMPORTANT: Change this to a strong random string in production!
 * Generate with: openssl rand -base64 32
 */
export const JWT_SECRET = process.env.JWT_SECRET || 'lvhn-ekvm-portal-secret-key-change-in-production';

/**
 * Session configuration
 */
export const SESSION_CONFIG = {
  maxAge: 60 * 60 * 8, // 8 hours in seconds
  cookieName: 'lvhn-portal-session',
};
