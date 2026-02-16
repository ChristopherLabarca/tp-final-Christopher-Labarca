"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateMedicalRecordValidator = exports.createMedicalRecordValidator = void 0;
const express_validator_1 = require("express-validator");
exports.createMedicalRecordValidator = [
    (0, express_validator_1.body)('petId')
        .notEmpty()
        .withMessage('El ID de la mascota es requerido'),
    (0, express_validator_1.body)('fecha')
        .isISO8601()
        .withMessage('Fecha inválida'),
    (0, express_validator_1.body)('hora')
        .matches(/^\d{2}:\d{2}$/)
        .withMessage('La hora debe ser en formato HH:MM'),
    (0, express_validator_1.body)('diagnostico')
        .trim()
        .isLength({ min: 5 })
        .withMessage('El diagnóstico debe tener al menos 5 caracteres'),
    (0, express_validator_1.body)('tratamiento')
        .trim()
        .isLength({ min: 5 })
        .withMessage('El tratamiento debe tener al menos 5 caracteres'),
];
exports.updateMedicalRecordValidator = [
    (0, express_validator_1.body)('fecha')
        .optional()
        .isISO8601()
        .withMessage('Fecha inválida'),
    (0, express_validator_1.body)('hora')
        .optional()
        .matches(/^\d{2}:\d{2}$/)
        .withMessage('La hora debe ser en formato HH:MM'),
    (0, express_validator_1.body)('diagnostico')
        .optional()
        .trim()
        .isLength({ min: 5 })
        .withMessage('El diagnóstico debe tener al menos 5 caracteres'),
    (0, express_validator_1.body)('tratamiento')
        .optional()
        .trim()
        .isLength({ min: 5 })
        .withMessage('El tratamiento debe tener al menos 5 caracteres'),
];
