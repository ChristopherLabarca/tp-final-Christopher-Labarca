import { body, ValidationChain } from 'express-validator';
import { UserRole } from '../types/auth';

export const createUserValidator: ValidationChain[] = [
  body('username')
    .trim()
    .isLength({ min: 3 })
    .withMessage('El usuario debe tener al menos 3 caracteres'),
  body('email')
    .isEmail()
    .withMessage('Email inválido'),
  body('password')
    .isLength({ min: 8 })
    .withMessage('La contraseña debe tener al menos 8 caracteres'),
  body('role')
    .optional()
    .isIn(Object.values(UserRole))
    .withMessage('Rol inválido'),
];

export const updateUserValidator: ValidationChain[] = [
  body('username')
    .optional()
    .trim()
    .isLength({ min: 3 })
    .withMessage('El usuario debe tener al menos 3 caracteres'),
  body('email')
    .optional()
    .isEmail()
    .withMessage('Email inválido'),
  body('role')
    .optional()
    .isIn(Object.values(UserRole))
    .withMessage('Rol inválido'),
];
