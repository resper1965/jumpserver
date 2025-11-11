import fs from 'fs/promises';
import path from 'path';
import bcrypt from 'bcryptjs';
import { defaultUsers, USERS_FILE_PATH, type User } from '../../auth.config';

const dataDir = path.join(process.cwd(), 'data');
const usersFilePath = path.join(process.cwd(), 'data', 'users.json');

/**
 * Initialize users file if it doesn't exist
 */
async function initializeUsersFile() {
  try {
    // Create data directory if it doesn't exist
    await fs.mkdir(dataDir, { recursive: true });

    // Check if users file exists
    try {
      await fs.access(usersFilePath);
    } catch {
      // File doesn't exist, create it with default users
      await fs.writeFile(usersFilePath, JSON.stringify(defaultUsers, null, 2));
    }
  } catch (error) {
    console.error('Error initializing users file:', error);
  }
}

/**
 * Get all users from the file
 */
export async function getAllUsers(): Promise<User[]> {
  try {
    await initializeUsersFile();
    const data = await fs.readFile(usersFilePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading users:', error);
    return defaultUsers;
  }
}

/**
 * Get user by username or email
 */
export async function getUserByUsernameOrEmail(usernameOrEmail: string): Promise<User | null> {
  const users = await getAllUsers();
  return users.find(
    (u) => u.username === usernameOrEmail || u.email === usernameOrEmail
  ) || null;
}

/**
 * Get user by ID
 */
export async function getUserById(id: string): Promise<User | null> {
  const users = await getAllUsers();
  return users.find((u) => u.id === id) || null;
}

/**
 * Create a new user
 */
export async function createUser(userData: {
  username: string;
  email: string;
  password: string;
  name: string;
  role: 'admin' | 'viewer';
}): Promise<User> {
  const users = await getAllUsers();

  // Check if username or email already exists
  const existingUser = users.find(
    (u) => u.username === userData.username || u.email === userData.email
  );

  if (existingUser) {
    throw new Error('Username or email already exists');
  }

  // Hash password
  const passwordHash = await bcrypt.hash(userData.password, 10);

  // Create new user
  const newUser: User = {
    id: `user-${Date.now()}`,
    username: userData.username,
    email: userData.email,
    passwordHash,
    name: userData.name,
    role: userData.role,
    createdAt: new Date().toISOString(),
  };

  // Add to users array
  users.push(newUser);

  // Save to file
  await fs.writeFile(usersFilePath, JSON.stringify(users, null, 2));

  return newUser;
}

/**
 * Update user
 */
export async function updateUser(
  id: string,
  updates: Partial<{
    username: string;
    email: string;
    password: string;
    name: string;
    role: 'admin' | 'viewer';
  }>
): Promise<User> {
  const users = await getAllUsers();
  const userIndex = users.findIndex((u) => u.id === id);

  if (userIndex === -1) {
    throw new Error('User not found');
  }

  // Check if new username/email conflicts with other users
  if (updates.username || updates.email) {
    const conflict = users.find(
      (u, idx) =>
        idx !== userIndex &&
        (u.username === updates.username || u.email === updates.email)
    );
    if (conflict) {
      throw new Error('Username or email already exists');
    }
  }

  // Update user
  const updatedUser = { ...users[userIndex], ...updates };

  // Hash new password if provided
  if (updates.password) {
    updatedUser.passwordHash = await bcrypt.hash(updates.password, 10);
  }

  users[userIndex] = updatedUser;

  // Save to file
  await fs.writeFile(usersFilePath, JSON.stringify(users, null, 2));

  return updatedUser;
}

/**
 * Delete user
 */
export async function deleteUser(id: string): Promise<void> {
  const users = await getAllUsers();
  const filteredUsers = users.filter((u) => u.id !== id);

  if (filteredUsers.length === users.length) {
    throw new Error('User not found');
  }

  // Prevent deleting the last admin
  const adminCount = filteredUsers.filter((u) => u.role === 'admin').length;
  if (adminCount === 0) {
    throw new Error('Cannot delete the last admin user');
  }

  // Save to file
  await fs.writeFile(usersFilePath, JSON.stringify(filteredUsers, null, 2));
}

/**
 * Update last login timestamp
 */
export async function updateLastLogin(id: string): Promise<void> {
  const users = await getAllUsers();
  const userIndex = users.findIndex((u) => u.id === id);

  if (userIndex !== -1) {
    users[userIndex].lastLogin = new Date().toISOString();
    await fs.writeFile(usersFilePath, JSON.stringify(users, null, 2));
  }
}
