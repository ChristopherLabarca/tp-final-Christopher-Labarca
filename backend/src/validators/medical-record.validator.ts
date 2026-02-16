import { body, ValidationChain } from 'express-validator';

export const createMedicalRecordValidator: ValidationChain[] = [
  body('petId')
    .notEmpty()
    .withMessage('El ID de la mascota es requerido'),
  body('fecha')
    .isISO8601()
    .withMessage('Fecha inválida'),
  body('hora')
    .matches(/^\d{2}:\d{2}$/)
    .withMessage('La hora debe ser en formato HH:MM'),
  body('diagnostico')
    .trim()
    .isLength({ min: 5 })
    .withMessage('El diagnóstico debe tener al menos 5 caracteres'),
  body('tratamiento')
    .trim()
    .isLength({ min: 5 })
    .withMessage('El tratamiento debe tener al menos 5 caracteres'),
];

export const updateMedicalRecordValidator: ValidationChain[] = [
  body('fecha')
    .optional()
    .isISO8601()
    .withMessage('Fecha inválida'),
  body('hora')
    .optional()
    .matches(/^\d{2}:\d{2}$/)
    .withMessage('La hora debe ser en formato HH:MM'),
  body('diagnostico')
    .optional()
    .trim()
    .isLength({ min: 5 })
    .withMessage('El diagnóstico debe tener al menos 5 caracteres'),
  body('tratamiento')
    .optional()
    .trim()
    .isLength({ min: 5 })
    .withMessage('El tratamiento debe tener al menos 5 caracteres'),
];
