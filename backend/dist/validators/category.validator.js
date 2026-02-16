"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCategoryValidator = exports.createCategoryValidator = void 0;
const express_validator_1 = require("express-validator");
const description = [
    (0, express_validator_1.body)('description')
        .optional()
        .isString()
        .withMessage('La descripción debe ser una cadena de texto')
        .isLength({ max: 200 })
        .withMessage('La descripción no puede exceder los 200 caracteres'),
];
const name = [
    (0, express_validator_1.body)('name')
        .notEmpty()
        .withMessage('El nombre de la categoría es obligatorio')
        .isString()
        .withMessage('El nombre de la categoría debe ser una cadena de texto')
        .isLength({ max: 50, min: 3 })
        .withMessage('El nombre de la categoría debe tener entre 3 y 50 caracteres'),
];
exports.createCategoryValidator = [
    ...name,
    ...description,
];
exports.updateCategoryValidator = [
    ...name,
    ...description,
];
