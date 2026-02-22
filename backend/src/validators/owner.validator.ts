import { body } from 'express-validator';

/**
 * Validation rules for creating an owner
 */
export const createOwnerValidator = [
  body('nombre')
    .trim()
    .notEmpty()
    .withMessage('El nombre es requerido')
    .isLength({ min: 3 })
    .withMessage('El nombre debe tener al menos 3 caracteres'),
  body('telefono')
    .trim()
    .notEmpty()
    .withMessage('El teléfono es requerido')
    .isLength({ min: 7 })
    .withMessage('El teléfono debe ser válido'),
  body('email')
    .trim()
    .isEmail()
    .withMessage('El email es inválido')
    .normalizeEmail(),
  body('direccion')
    .optional()
    .trim()
    .isLength({ min: 3 })
    .withMessage('La dirección debe tener al menos 3 caracteres'),
];

/**
 * Validation rules for updating an owner
 */
export const updateOwnerValidator = [
  body('nombre')
    .optional()
    .trim()
    .isLength({ min: 3 })
    .withMessage('El nombre debe tener al menos 3 caracteres'),
  body('telefono')
    .optional()
    .trim()
    .isLength({ min: 7 })
    .withMessage('El teléfono debe ser válido'),
  body('email')
    .optional()
    .trim()
    .isEmail()
    .withMessage('El email es inválido')
    .normalizeEmail(),
  body('direccion')
    .optional()
    .trim()
    .isLength({ min: 3 })
    .withMessage('La dirección debe tener al menos 3 caracteres'),
];
