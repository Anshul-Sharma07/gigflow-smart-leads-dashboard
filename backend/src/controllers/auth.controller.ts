import { Request, Response } from 'express';
import { registerUser, loginUser } from '../services/auth.service';
import { sendSuccess, sendError } from '../utils/helpers';
import { AuthRequest } from '../types/index';
import { User } from '../models/User';

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await registerUser(req.body, res);
    if (result && 'token' in result) {
      sendSuccess(res, 'Registration successful', result, 201);
    }
  } catch (error) {
    sendError(res, 'Registration failed', 500, String(error));
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await loginUser(req.body, res);
    if (result && 'token' in result) {
      sendSuccess(res, 'Login successful', result);
    }
  } catch (error) {
    sendError(res, 'Login failed', 500, String(error));
  }
};

export const getMe = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.user?.id);
    if (!user) {
      sendError(res, 'User not found', 404);
      return;
    }
    sendSuccess(res, 'User fetched', {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    sendError(res, 'Failed to fetch user', 500, String(error));
  }
};
