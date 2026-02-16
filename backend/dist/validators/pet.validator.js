"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePetValidator = exports.createPetValidator = void 0;
const express_validator_1 = require("express-validator");
exports.createPetValidator = [
    (0, express_validator_1.body)('nombre')
        .trim()
        .isLength({ min: 2 })
        .withMessage('El nombre debe tener al menos 2 caracteres'),
    (0, express_validator_1.body)('especie')
        .isIn(['Perro', 'Gato', 'Conejo', 'Pajaro', 'Reptil', 'Otro'])
        .withMessage('Especie no válida'),
    (0, express_validator_1.body)('raza')
        .trim()
        .notEmpty()
        .withMessage('La raza es requerida'),
    (0, express_validator_1.body)('peso')
        .isFloat({ min: 0.1 })
        .withMessage('El peso debe ser mayor a 0'),
    (0, express_validator_1.body)('fecha_nacimiento')
        .isISO8601()
        .withMessage('Fecha de nacimiento inválida'),
    (0, express_validator_1.body)('ownerId')
        .notEmpty()
        .withMessage('El ID del propietario es requerido'),
];
exports.updatePetValidator = [
    (0, express_validator_1.body)('nombre')
        .optional()
        .trim()
        .isLength({ min: 2 })
        .withMessage('El nombre debe tener al menos 2 caracteres'),
    (0, express_validator_1.body)('especie')
        .optional()
        .isIn(['Perro', 'Gato', 'Conejo', 'Pajaro', 'Reptil', 'Otro'])
        .withMessage('Especie no válida'),
    (0, express_validator_1.body)('raza')
        .optional()
        .trim()
        .notEmpty()
        .withMessage('La raza es requerida'),
    (0, express_validator_1.body)('peso')
        .optional()
        .isFloat({ min: 0.1 })
        .withMessage('El peso debe ser mayor a 0'),
    (0, express_validator_1.body)('fecha_nacimiento')
        .optional()
        .isISO8601()
        .withMessage('Fecha de nacimiento inválida'),
];
