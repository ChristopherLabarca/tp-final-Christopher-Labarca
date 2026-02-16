"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOwner = exports.updateOwner = exports.createOwner = exports.getOwnerById = exports.getAllOwners = void 0;
const owners_model_1 = __importDefault(require("../models/owners.model"));
const appError_1 = require("../types/appError");
/**
 * Get all owners
 * @route GET /api/owner
 * @public
 */
const getAllOwners = async (req, res, next) => {
    try {
        const owners = await owners_model_1.default.find();
        res.json(owners);
    }
    catch (error) {
        next(error);
    }
};
exports.getAllOwners = getAllOwners;
/**
 * Get owner by ID
 * @route GET /api/owner/:id
 * @public
 */
const getOwnerById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const owner = await owners_model_1.default.findById(id);
        if (!owner) {
            return next(new appError_1.AppError('Propietario no encontrado', 404));
        }
        res.json(owner);
    }
    catch (error) {
        next(error);
    }
};
exports.getOwnerById = getOwnerById;
/**
 * Create a new owner
 * @route POST /api/owner
 * @public (sin requerir autenticación para simplificar - se puede cambiar si es necesario)
 */
const createOwner = async (req, res, next) => {
    try {
        const { nombre, telefono, email, direccion } = req.body;
        // Verificar si el email ya existe
        const existingOwner = await owners_model_1.default.findOne({ email: email.toLowerCase() });
        if (existingOwner) {
            return next(new appError_1.AppError('El email ya está registrado', 400));
        }
        const newOwner = new owners_model_1.default({
            nombre,
            telefono,
            email,
            direccion,
        });
        await newOwner.save();
        res.status(201).json(newOwner);
    }
    catch (error) {
        next(error);
    }
};
exports.createOwner = createOwner;
/**
 * Update an owner
 * @route PUT /api/owner/:id
 * @public
 */
const updateOwner = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { nombre, telefono, email, direccion } = req.body;
        // Si se intenta actualizar el email, verificar que no esté en uso
        if (email) {
            const existingOwner = await owners_model_1.default.findOne({
                email: email.toLowerCase(),
                _id: { $ne: id }
            });
            if (existingOwner) {
                return next(new appError_1.AppError('El email ya está en uso', 400));
            }
        }
        const updatedOwner = await owners_model_1.default.findByIdAndUpdate(id, { nombre, telefono, email, direccion }, { new: true, runValidators: true });
        if (!updatedOwner) {
            return next(new appError_1.AppError('Propietario no encontrado', 404));
        }
        res.json(updatedOwner);
    }
    catch (error) {
        next(error);
    }
};
exports.updateOwner = updateOwner;
/**
 * Delete an owner
 * @route DELETE /api/owner/:id
 * @public
 */
const deleteOwner = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deletedOwner = await owners_model_1.default.findByIdAndDelete(id);
        if (!deletedOwner) {
            return next(new appError_1.AppError('Propietario no encontrado', 404));
        }
        res.json({ message: 'Propietario eliminado exitosamente', owner: deletedOwner });
    }
    catch (error) {
        next(error);
    }
};
exports.deleteOwner = deleteOwner;
