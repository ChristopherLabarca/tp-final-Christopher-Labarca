"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMedicalRecord = exports.updateMedicalRecord = exports.createMedicalRecord = exports.getMedicalRecordsByPetId = exports.getMedicalRecordById = exports.getAllMedicalRecords = void 0;
const express_validator_1 = require("express-validator");
const medical_records_model_1 = __importDefault(require("../models/medical-records.model"));
const appError_1 = require("../types/appError");
const getAllMedicalRecords = async (req, res, next) => {
    try {
        const records = await medical_records_model_1.default.find();
        res.status(200).json(records);
    }
    catch (err) {
        next(new appError_1.AppError('Error al obtener historiales clínicos', 500));
    }
};
exports.getAllMedicalRecords = getAllMedicalRecords;
const getMedicalRecordById = async (req, res, next) => {
    try {
        const record = await medical_records_model_1.default.findById(req.params.id);
        if (!record) {
            return next(new appError_1.AppError('Historial clínico no encontrado', 404));
        }
        res.status(200).json(record);
    }
    catch (err) {
        next(new appError_1.AppError('Error al obtener historial clínico', 500));
    }
};
exports.getMedicalRecordById = getMedicalRecordById;
const getMedicalRecordsByPetId = async (req, res, next) => {
    try {
        const records = await medical_records_model_1.default.find({ petId: req.params.petId });
        res.status(200).json(records);
    }
    catch (err) {
        next(new appError_1.AppError('Error al obtener historiales clínicos de la mascota', 500));
    }
};
exports.getMedicalRecordsByPetId = getMedicalRecordsByPetId;
const createMedicalRecord = async (req, res, next) => {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            const errorMessages = errors.array().map(err => err.msg).join(', ');
            return next(new appError_1.AppError(errorMessages, 400));
        }
        const record = new medical_records_model_1.default(req.body);
        await record.save();
        res.status(201).json(record);
    }
    catch (err) {
        next(new appError_1.AppError('Error al crear historial clínico', 500));
    }
};
exports.createMedicalRecord = createMedicalRecord;
const updateMedicalRecord = async (req, res, next) => {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            const errorMessages = errors.array().map(err => err.msg).join(', ');
            return next(new appError_1.AppError(errorMessages, 400));
        }
        const record = await medical_records_model_1.default.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!record) {
            return next(new appError_1.AppError('Historial clínico no encontrado', 404));
        }
        res.status(200).json(record);
    }
    catch (err) {
        next(new appError_1.AppError('Error al actualizar historial clínico', 500));
    }
};
exports.updateMedicalRecord = updateMedicalRecord;
const deleteMedicalRecord = async (req, res, next) => {
    try {
        const record = await medical_records_model_1.default.findByIdAndDelete(req.params.id);
        if (!record) {
            return next(new appError_1.AppError('Historial clínico no encontrado', 404));
        }
        res.status(200).json({
            message: 'Historial clínico eliminado exitosamente',
            record,
        });
    }
    catch (err) {
        next(new appError_1.AppError('Error al eliminar historial clínico', 500));
    }
};
exports.deleteMedicalRecord = deleteMedicalRecord;
