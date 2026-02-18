"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePet = exports.updatePet = exports.createPet = exports.getPetsByOwnerId = exports.getPetById = exports.getAllPets = void 0;
const express_validator_1 = require("express-validator");
const pets_model_1 = __importDefault(require("../models/pets.model"));
const appError_1 = require("../types/appError");
// image generation removed
const getAllPets = async (req, res, next) => {
    try {
        const pets = await pets_model_1.default.find();
        res.status(200).json(pets);
    }
    catch (err) {
        next(new appError_1.AppError('Error al obtener mascotas', 500));
    }
};
exports.getAllPets = getAllPets;
const getPetById = async (req, res, next) => {
    try {
        const pet = await pets_model_1.default.findById(req.params.id);
        if (!pet) {
            return next(new appError_1.AppError('Mascota no encontrada', 404));
        }
        res.status(200).json(pet);
    }
    catch (err) {
        next(new appError_1.AppError('Error al obtener mascota', 500));
    }
};
exports.getPetById = getPetById;
const getPetsByOwnerId = async (req, res, next) => {
    try {
        const pets = await pets_model_1.default.find({ ownerId: req.params.ownerId });
        res.status(200).json(pets);
    }
    catch (err) {
        next(new appError_1.AppError('Error al obtener mascotas del propietario', 500));
    }
};
exports.getPetsByOwnerId = getPetsByOwnerId;
const createPet = async (req, res, next) => {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            const errorMessages = errors.array().map(err => err.msg).join(', ');
            return next(new appError_1.AppError(errorMessages, 400));
        }
        const pet = new pets_model_1.default(Object.assign({}, req.body));
        await pet.save();
        res.status(201).json(pet);
    }
    catch (err) {
        next(new appError_1.AppError('Error al crear mascota', 500));
    }
};
exports.createPet = createPet;
const updatePet = async (req, res, next) => {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            const errorMessages = errors.array().map(err => err.msg).join(', ');
            return next(new appError_1.AppError(errorMessages, 400));
        }
        const pet = await pets_model_1.default.findByIdAndUpdate(req.params.id, Object.assign({}, req.body), {
            new: true,
            runValidators: true,
        });
        if (!pet) {
            return next(new appError_1.AppError('Mascota no encontrada', 404));
        }
        res.status(200).json(pet);
    }
    catch (err) {
        next(new appError_1.AppError('Error al actualizar mascota', 500));
    }
};
exports.updatePet = updatePet;
const deletePet = async (req, res, next) => {
    try {
        const pet = await pets_model_1.default.findByIdAndDelete(req.params.id);
        if (!pet) {
            return next(new appError_1.AppError('Mascota no encontrada', 404));
        }
        res.status(200).json({
            message: 'Mascota eliminada exitosamente',
            pet,
        });
    }
    catch (err) {
        next(new appError_1.AppError('Error al eliminar mascota', 500));
    }
};
exports.deletePet = deletePet;
