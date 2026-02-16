"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET;
/**
 * Middleware de autenticación
 *
 * Verifica que el token sea válido y lo almacena en req.user
 */
/**
 * Authentication middleware that verifies the JWT token from the Authorization header.
 * If valid, it decodes the token and attaches the user payload to the request object.
 *
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @param {NextFunction} next - Express next function.
 * @returns {void}
 */
const authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // Bearer <token>
    console.log('Token recibido en authenticate:', token);
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }
    jsonwebtoken_1.default.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token or expired' });
        }
        req.user = decoded;
        next();
    });
};
exports.authenticate = authenticate;
/**
 * Middleware de autorización
 *
 * Verifica que el usuario tenga uno de los roles permitidos
 */
/**
 * Authorization middleware that checks if the authenticated user has one of the required roles.
 *
 * @param {Array<UserRole>} roles - An array of allowed roles.
 * @returns {Function} An Express middleware function.
 */
const authorize = (roles) => {
    return (req, res, next) => {
        const userRole = req.user?.role;
        if (!userRole || !roles.includes(userRole)) {
            return res.status(403).json({ message: 'Acceso denegado' });
        }
        next();
    };
};
exports.authorize = authorize;
