"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.optionalAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET;
/**
 * Optional authentication middleware
 * Intenta verificar el token si existe, pero no falla si no está presente.
 * Útil para endpoints que pueden ser públicos pero tener funcionalidades extras si autenticado.
 *
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @param {NextFunction} next - Express next function.
 * @returns {void}
 */
const optionalAuth = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // Bearer <token>
    if (!token) {
        // No token provided, pero continuamos sin autenticación
        req.user = undefined;
        return next();
    }
    jsonwebtoken_1.default.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            // Token inválido o expirado, continuamos sin usuario
            console.warn('Invalid token received:', err.message);
            req.user = undefined;
        }
        else {
            req.user = decoded;
        }
        next();
    });
};
exports.optionalAuth = optionalAuth;
