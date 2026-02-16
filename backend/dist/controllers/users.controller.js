"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.createUser = exports.getUserById = exports.getAllUsers = void 0;
const express_validator_1 = require("express-validator");
const users_model_1 = require("../models/users.model");
const appError_1 = require("../types/appError");
const bcrypt_1 = __importDefault(require("bcrypt"));
const auth_1 = require("../types/auth");
const getAllUsers = async (req, res, next) => {
    try {
        const users = await users_model_1.User.find().select('-password');
        res.status(200).json(users);
    }
    catch (err) {
        next(new appError_1.AppError('Error al obtener usuarios', 500));
    }
};
exports.getAllUsers = getAllUsers;
const getUserById = async (req, res, next) => {
    try {
        const user = await users_model_1.User.findById(req.params.id).select('-password');
        if (!user) {
            return next(new appError_1.AppError('Usuario no encontrado', 404));
        }
        res.status(200).json(user);
    }
    catch (err) {
        next(new appError_1.AppError('Error al obtener usuario', 500));
    }
};
exports.getUserById = getUserById;
const createUser = async (req, res, next) => {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            const errorMessages = errors.array().map(err => err.msg).join(', ');
            return next(new appError_1.AppError(errorMessages, 400));
        }
        const { username, email, password, role } = req.body;
        // Check for duplicates
        const existingUser = await users_model_1.User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return next(new appError_1.AppError('El usuario o email ya existe', 400));
        }
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        const user = new users_model_1.User({
            username,
            email,
            password: hashedPassword,
            role: role || auth_1.UserRole.RECEPCIONISTA,
        });
        await user.save();
        const userResponse = user.toObject();
        userResponse.password = undefined;
        res.status(201).json(userResponse);
    }
    catch (err) {
        next(new appError_1.AppError('Error al crear usuario', 500));
    }
};
exports.createUser = createUser;
const updateUser = async (req, res, next) => {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            const errorMessages = errors.array().map(err => err.msg).join(', ');
            return next(new appError_1.AppError(errorMessages, 400));
        }
        const { username, email, role } = req.body;
        const userId = req.params.id;
        // Check for duplicate email/username (excluding current user)
        const existingUser = await users_model_1.User.findOne({
            $or: [{ email }, { username }],
            _id: { $ne: userId },
        });
        if (existingUser) {
            return next(new appError_1.AppError('El usuario o email ya existe', 400));
        }
        const user = await users_model_1.User.findByIdAndUpdate(userId, { username, email, role }, { new: true, runValidators: true }).select('-password');
        if (!user) {
            return next(new appError_1.AppError('Usuario no encontrado', 404));
        }
        res.status(200).json(user);
    }
    catch (err) {
        next(new appError_1.AppError('Error al actualizar usuario', 500));
    }
};
exports.updateUser = updateUser;
const deleteUser = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const currentUserId = req.user?.id;
        // Prevent deleting yourself
        if (userId === currentUserId) {
            return next(new appError_1.AppError('No puedes eliminar tu propia cuenta', 400));
        }
        const user = await users_model_1.User.findByIdAndDelete(userId);
        if (!user) {
            return next(new appError_1.AppError('Usuario no encontrado', 404));
        }
        res.status(200).json({
            message: 'Usuario eliminado exitosamente',
            user: { id: user._id, username: user.username, email: user.email },
        });
    }
    catch (err) {
        next(new appError_1.AppError('Error al eliminar usuario', 500));
    }
};
exports.deleteUser = deleteUser;
