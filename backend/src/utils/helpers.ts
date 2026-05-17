import jwt from 'jsonwebtoken';
import { Response } from 'express';
import { JwtPayload, UserRole, ApiResponse } from '../types/index';

export const generateToken = (payload: JwtPayload): string => {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error('JWT_SECRET not configured');
  return jwt.sign(payload, secret, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  } as jwt.SignOptions);
};

export const verifyToken = (token: string): JwtPayload => {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error('JWT_SECRET not configured');
  return jwt.verify(token, secret) as JwtPayload;
};

export const sendSuccess = <T>(
  res: Response,
  message: string,
  data?: T,
  statusCode = 200
): Response => {
  const response: ApiResponse<T> = { success: true, message, data };
  return res.status(statusCode).json(response);
};

export const sendError = (
  res: Response,
  message: string,
  statusCode = 500,
  error?: string
): Response => {
  const response: ApiResponse = { success: false, message, error };
  return res.status(statusCode).json(response);
};

export const parseIntSafe = (value: unknown, fallback: number): number => {
  const parsed = parseInt(String(value), 10);
  return isNaN(parsed) ? fallback : parsed;
};

export const isValidRole = (role: string): role is UserRole => {
  return ['admin', 'sales'].includes(role);
};
