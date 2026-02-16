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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePassword = exports.login = exports.register = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const userModel = __importStar(require("../models/users.model"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET no definido');
}
const secretKey = process.env.JWT_SECRET;
/**
 * Registers a new user by hashing their password and saving them to the database.
 *
 * @param {string} username - The username for the new user.
 * @param {string} email - The email address for the new user.
 * @param {string} password - The plain text password to be hashed.
 * @returns {Promise<string>} A promise that resolves to the newly created user's ID.
 */
const register = async (username, email, password) => {
    const hashedPassword = await bcrypt_1.default.hash(password, 10);
    const userId = await userModel.createUser({
        username,
        email,
        password: hashedPassword,
    });
    return userId;
};
exports.register = register;
/**
 * Authenticates a user with their email and password, returning a JWT if successful.
 *
 * @param {string} email - The user's email address.
 * @param {string} password - The user's plain text password.
 * @returns {Promise<LoginResponse>} A promise that resolves to a response with token and user data.
 * @throws {Error} Throws "Credenciales inválidas" if authentication fails.
 */
const login = async (email, password) => {
    const invalidCredentialsError = new Error('Credenciales inválidas');
    const user = await userModel.findUser(email);
    if (!user)
        throw invalidCredentialsError;
    const isValid = await bcrypt_1.default.compare(password, user.password);
    if (!isValid)
        throw invalidCredentialsError;
    /**
     * Payload del token JWT
     * Contiene la información básica del usuario
     */
    const payload = {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
    };
    /**
     * Configuración del token JWT
     * expiresIn: tiempo de expiración
     * issuer: emisor del token
     */
    const options = {
        expiresIn: process.env.JWT_EXPIRES_IN || '24h',
        issuer: 'curso-utn-backend',
    };
    /**
     * Generación del token JWT
     * Se firma el payload con el secreto y las opciones definidas
     */
    const token = jsonwebtoken_1.default.sign(payload, secretKey, options);
    return {
        token,
        user: {
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role,
        },
    };
};
exports.login = login;
/**
 * Updates a user's password
 *
 * @param {string} userId - The ID of the user to update
 * @param {string} currentPassword - The user's current password
 * @param {string} newPassword - The new password
 * @returns {Promise<void>}
 * @throws {Error} If current password is invalid
 */
const updatePassword = async (userId, currentPassword, newPassword) => {
    const user = await userModel.User.findById(userId);
    if (!user)
        throw new Error('Usuario no encontrado');
    const isValid = await bcrypt_1.default.compare(currentPassword, user.password);
    if (!isValid)
        throw new Error('Contraseña actual incorrecta');
    user.password = await bcrypt_1.default.hash(newPassword, 10);
    await user.save();
};
exports.updatePassword = updatePassword;
