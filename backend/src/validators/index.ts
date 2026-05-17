import { body, query } from 'express-validator';

export const registerValidator = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 2, max: 50 }).withMessage('Name must be 2-50 characters'),
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Valid email required')
    .normalizeEmail(),
  body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('role')
    .optional()
    .isIn(['admin', 'sales']).withMessage('Role must be admin or sales'),
];

export const loginValidator = [
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Valid email required')
    .normalizeEmail(),
  body('password')
    .notEmpty().withMessage('Password is required'),
];

export const createLeadValidator = [
  body('name')
    .trim()
    .notEmpty().withMessage('Lead name is required')
    .isLength({ min: 2, max: 100 }).withMessage('Name must be 2-100 characters'),
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Valid email required')
    .normalizeEmail(),
  body('status')
    .optional()
    .isIn(['New', 'Contacted', 'Qualified', 'Lost']).withMessage('Invalid status'),
  body('source')
    .notEmpty().withMessage('Source is required')
    .isIn(['Website', 'Instagram', 'Referral']).withMessage('Invalid source'),
];

export const updateLeadValidator = [
  body('name')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 }).withMessage('Name must be 2-100 characters'),
  body('email')
    .optional()
    .trim()
    .isEmail().withMessage('Valid email required')
    .normalizeEmail(),
  body('status')
    .optional()
    .isIn(['New', 'Contacted', 'Qualified', 'Lost']).withMessage('Invalid status'),
  body('source')
    .optional()
    .isIn(['Website', 'Instagram', 'Referral']).withMessage('Invalid source'),
];

export const leadQueryValidator = [
  query('status').optional().isIn(['New', 'Contacted', 'Qualified', 'Lost']),
  query('source').optional().isIn(['Website', 'Instagram', 'Referral']),
  query('sort').optional().isIn(['latest', 'oldest']),
  query('page').optional().isInt({ min: 1 }),
  query('limit').optional().isInt({ min: 1, max: 100 }),
];
