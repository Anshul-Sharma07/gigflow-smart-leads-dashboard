import { User } from '../models/User';
import { generateToken, sendError } from '../utils/helpers';
import { Response } from 'express';

export interface RegisterInput {
  name: string;
  email: string;
  password: string;
  role?: 'admin' | 'sales';
}

export interface LoginInput {
  email: string;
  password: string;
}

export const registerUser = async (input: RegisterInput, res: Response) => {
  const existing = await User.findOne({ email: input.email });
  if (existing) {
    return sendError(res, 'Email already registered', 409);
  }

  const user = await User.create(input);
  const token = generateToken({ id: user._id.toString(), role: user.role, email: user.email });

  return {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
};

export const loginUser = async (input: LoginInput, res: Response) => {
  const user = await User.findOne({ email: input.email }).select('+password');
  if (!user) {
    return sendError(res, 'Invalid email or password', 401);
  }

  const isMatch = await user.comparePassword(input.password);
  if (!isMatch) {
    return sendError(res, 'Invalid email or password', 401);
  }

  const token = generateToken({ id: user._id.toString(), role: user.role, email: user.email });

  return {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
};
