"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOwnerValidator = exports.createOwnerValidator = void 0;
const express_validator_1 = require("express-validator");
/**
 * Validation rules for creating an owner
 */
exports.createOwnerValidator = [
    (0, express_validator_1.body)('nombre')
        .trim()
        .notEmpty()
        .withMessage('El nombre es requerido')
        .isLength({ min: 3 })
        .withMessage('El nombre debe tener al menos 3 caracteres'),
    (0, express_validator_1.body)('telefono')
        .trim()
        .notEmpty()
        .withMessage('El teléfono es requerido')
        .isLength({ min: 7 })
        .withMessage('El teléfono debe ser válido'),
    (0, express_validator_1.body)('email')
        .trim()
        .isEmail()
        .withMessage('El email es inválido')
        .normalizeEmail(),
    (0, express_validator_1.body)('direccion')
        .optional()
        .trim()
        .isLength({ min: 3 })
        .withMessage('La dirección debe tener al menos 3 caracteres'),
];
/**
 * Validation rules for updating an owner
 */
exports.updateOwnerValidator = [
    (0, express_validator_1.body)('nombre')
        .optional()
        .trim()
        .isLength({ min: 3 })
        .withMessage('El nombre debe tener al menos 3 caracteres'),
    (0, express_validator_1.body)('telefono')
        .optional()
        .trim()
        .isLength({ min: 7 })
        .withMessage('El teléfono debe ser válido'),
    (0, express_validator_1.body)('email')
        .optional()
        .trim()
        .isEmail()
        .withMessage('El email es inválido')
        .normalizeEmail(),
    (0, express_validator_1.body)('direccion')
        .optional()
        .trim()
        .isLength({ min: 3 })
        .withMessage('La dirección debe tener al menos 3 caracteres'),
];
