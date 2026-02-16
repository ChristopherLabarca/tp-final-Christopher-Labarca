import { body, ValidationChain } from 'express-validator';

export const createPetValidator: ValidationChain[] = [
  body('nombre')
    .trim()
    .isLength({ min: 2 })
    .withMessage('El nombre debe tener al menos 2 caracteres'),
  body('especie')
    .isIn(['Perro', 'Gato', 'Conejo', 'Pajaro', 'Reptil', 'Otro'])
    .withMessage('Especie no válida'),
  body('raza')
    .trim()
    .notEmpty()
    .withMessage('La raza es requerida'),
  body('peso')
    .isFloat({ min: 0.1 })
    .withMessage('El peso debe ser mayor a 0'),
  body('fecha_nacimiento')
    .isISO8601()
    .withMessage('Fecha de nacimiento inválida'),
  body('ownerId')
    .notEmpty()
    .withMessage('El ID del propietario es requerido'),
];

export const updatePetValidator: ValidationChain[] = [
  body('nombre')
    .optional()
    .trim()
    .isLength({ min: 2 })
    .withMessage('El nombre debe tener al menos 2 caracteres'),
  body('especie')
    .optional()
    .isIn(['Perro', 'Gato', 'Conejo', 'Pajaro', 'Reptil', 'Otro'])
    .withMessage('Especie no válida'),
  body('raza')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('La raza es requerida'),
  body('peso')
    .optional()
    .isFloat({ min: 0.1 })
    .withMessage('El peso debe ser mayor a 0'),
  body('fecha_nacimiento')
    .optional()
    .isISO8601()
    .withMessage('Fecha de nacimiento inválida'),
];
