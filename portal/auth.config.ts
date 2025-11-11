/**
 * Authentication Configuration
 *
 * User authentication system for the LVHN Documentation Portal.
 * Passwords are hashed using bcryptjs with 10 rounds.
 *
 * SECURITY NOTES:
 * - Change default passwords immediately in production
 * - Set a strong JWT_SECRET environment variable
 * - Users are stored in users.json for dynamic management
 */

export interface User {
  id: string;
  username: string;
  email: string;
  passwordHash: string;
  name: string;
  role: 'admin' | 'viewer';
  createdAt: string;
  lastLogin?: string;
}

/**
 * Default authorized users
 *
 * These are the initial users. The system will migrate to users.json
 * for dynamic user management through the admin interface.
 */
export const defaultUsers: User[] = [
  {
    id: 'admin-001',
    username: 'admin',
    email: 'admin@ionic.health',
    // Password: admin123
    passwordHash: '$2a$10$uV5pK0D3rsAQ1BtNzM1nJzO7cZxL/9TCSC1C6m6Ba3FtM1Nj2On7d',
    name: 'System Administrator',
    role: 'admin',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'user-001',
    username: 'resper',
    email: 'resper@ionic.health',
    // Password: ionic2025
    passwordHash: '$2a$10$rQ3nI8B1pqYO9ZrLyK9lHyM5aXvJ/7RAQZ9A4k4Zy1DrK9Lh0Ml5b',
    name: 'Roberto Esper',
    role: 'admin',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'user-002',
    username: 'raraujo',
    email: 'raraujo@ionic.health',
    // Password: ionic2025
    passwordHash: '$2a$10$sT4oJ9C2qrZP0AsMyL0mIzN6bYwK/8SBRAA0B5l5Az2EsL0Mi1Nm6c',
    name: 'Ricardo Araujo',
    role: 'admin',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'user-003',
    username: 'lvhn',
    email: 'lvhn@lvhn.org',
    // Password: lvhn2025
    passwordHash: '$2a$10$vQ0mH7Z9oqXN8YqKxJ8kGxL4zXuJ/6QZQY8Z3j3Yx0CqJ8Kg9XL4z',
    name: 'LVHN IT Team',
    role: 'viewer',
    createdAt: new Date().toISOString(),
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

/**
 * Path to users data file
 */
export const USERS_FILE_PATH = process.env.USERS_FILE_PATH || './data/users.json';
