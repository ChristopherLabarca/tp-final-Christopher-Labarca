"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePassword = exports.getCurrentUser = exports.logout = exports.login = exports.register = void 0;
const authService = __importStar(require("../services/auth.service"));
const express_validator_1 = require("express-validator");
/**
 * Controller to register a new user.
 *
 * @param {Request} req - Express request object containing username, email, and password in body.
 * @param {Response} res - Express response object.
 * @returns {Promise<Response>} JSON response indicating success or an error message.
 */
const register = async (req, res) => {
    try {
        // Verificar errores de validación
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { username, email, password } = req.body;
        console.log('Registering user:', username, email, password);
        await authService.register(username, email, password);
        return res.status(201).json({ message: 'Usuario creado exitosamente' });
    }
    catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ error: 'El usuario o email ya existe' });
        }
        console.log('Error during registration:', error);
        return res.status(500).json({ error: 'Error al registrar el usuario' });
    }
};
exports.register = register;
/**
 * Controller to authenticate a user and return a JWT.
 *
 * @param {Request} req - Express request object containing email and password in body.
 * @param {Response} res - Express response object.
 * @returns {Promise<Response>} JSON response with the JWT and user data or an error message.
 */
const login = async (req, res) => {
    try {
        // Verificar errores de validación
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { email, password } = req.body;
        const response = await authService.login(email, password);
        return res.json(response);
    }
    catch (error) {
        if (error.message === 'Credenciales inválidas') {
            return res.status(401).json({ error: error.message });
        }
        return res.status(500).json({ error: 'Error al iniciar sesión' });
    }
};
exports.login = login;
/**
 * Controller to logout a user (JWT-based, so mainly for frontend cleanup)
 *
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @returns {Response} JSON response confirming logout.
 */
const logout = async (req, res) => {
    // En JWT, el logout es manejado por el cliente (eliminar el token)
    // Aquí solo confirmamos el logout
    return res.json({ message: 'Sesión cerrada exitosamente' });
};
exports.logout = logout;
/**
 * Controller to get current user info
 *
 * @param {Request} req - Express request object with user in middleware.
 * @param {Response} res - Express response object.
 * @returns {Response} JSON response with user data.
 */
const getCurrentUser = async (req, res) => {
    try {
        const user = req.user;
        if (!user) {
            return res.status(401).json({ error: 'Usuario no autenticado' });
        }
        return res.json({
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role,
        });
    }
    catch (error) {
        return res.status(500).json({ error: 'Error al obtener usuario' });
    }
};
exports.getCurrentUser = getCurrentUser;
/**
 * Controller to update user password
 *
 * @param {Request} req - Express request object with currentPassword and newPassword in body.
 * @param {Response} res - Express response object.
 * @returns {Response} JSON response indicating success or error.
 */
const updatePassword = async (req, res) => {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const userId = req.user?.id;
        const { currentPassword, newPassword } = req.body;
        if (!userId) {
            return res.status(401).json({ error: 'Usuario no autenticado' });
        }
        await authService.updatePassword(userId, currentPassword, newPassword);
        return res.json({ message: 'Contraseña actualizada exitosamente' });
    }
    catch (error) {
        if (error.message === 'Contraseña actual incorrecta') {
            return res.status(401).json({ error: error.message });
        }
        if (error.message === 'Usuario no encontrado') {
            return res.status(404).json({ error: error.message });
        }
        return res.status(500).json({ error: 'Error al actualizar contraseña' });
    }
};
exports.updatePassword = updatePassword;
