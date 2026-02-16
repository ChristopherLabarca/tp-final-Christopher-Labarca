"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserValidator = exports.createUserValidator = void 0;
const express_validator_1 = require("express-validator");
const auth_1 = require("../types/auth");
exports.createUserValidator = [
    (0, express_validator_1.body)('username')
        .trim()
        .isLength({ min: 3 })
        .withMessage('El usuario debe tener al menos 3 caracteres'),
    (0, express_validator_1.body)('email')
        .isEmail()
        .withMessage('Email inválido'),
    (0, express_validator_1.body)('password')
        .isLength({ min: 8 })
        .withMessage('La contraseña debe tener al menos 8 caracteres'),
    (0, express_validator_1.body)('role')
        .optional()
        .isIn(Object.values(auth_1.UserRole))
        .withMessage('Rol inválido'),
];
exports.updateUserValidator = [
    (0, express_validator_1.body)('username')
        .optional()
        .trim()
        .isLength({ min: 3 })
        .withMessage('El usuario debe tener al menos 3 caracteres'),
    (0, express_validator_1.body)('email')
        .optional()
        .isEmail()
        .withMessage('Email inválido'),
    (0, express_validator_1.body)('role')
        .optional()
        .isIn(Object.values(auth_1.UserRole))
        .withMessage('Rol inválido'),
];
