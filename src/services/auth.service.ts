import jwt from 'jsonwebtoken';
import { env } from '../config/env';
import { AppError } from '../utils/AppError';

export async function authenticateUser({ username, password }: { username: string; password: string }) {
  console.log(`Authentication attempt for username: ${username}`);
  
  // Hardcoded credentials as requested
  const VALID_USERNAME = 'admin';
  const VALID_PASSWORD = 'pass@123';
  
  if (username !== VALID_USERNAME || password !== VALID_PASSWORD) {
    console.log('Authentication failed: Invalid credentials');
    throw new AppError('Invalid username or password', 401);
  }
  
  // Generate JWT token
  const token = jwt.sign(
    { username, role: 'admin' },
    env.JWT_SECRET,
    { expiresIn: '24h' }
  );
  
  console.log('Authentication successful');
  
  return {
    message: 'hello, welcome to Joylo Powered backend',
    token,
  };
}