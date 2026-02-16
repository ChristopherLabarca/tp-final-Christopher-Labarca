"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
/**
 * Middleware to validate the request body against a DTO using express-validator.
 * If validation errors are found, it returns a 400 Bad Request response with the errors.
 *
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @param {NextFunction} next - Express next function.
 * @returns {void}
 */
const validateDto = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    console.log('Validating DTO for request to', errors);
    if (errors.isEmpty()) {
        return next(); // No errors, continue to the controller
    }
    console.log('Errores de validación:', errors.array());
    return res.status(400).json({ errors: errors.array() });
};
exports.default = validateDto;
