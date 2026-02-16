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
const express_1 = require("express");
const medicalRecordsController = __importStar(require("../controllers/medical-records.controller"));
const medical_record_validator_1 = require("../validators/medical-record.validator");
const dto_middleware_1 = __importDefault(require("../middlewares/dto.middleware"));
const auth_middleware_1 = require("../middlewares/auth.middleware");
const auth_1 = require("../types/auth");
const router = (0, express_1.Router)();
// Get all medical records - VETERINARIO, ADMIN, RECEPCIONISTA
router.get('/', auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)([auth_1.UserRole.VETERINARIO, auth_1.UserRole.ADMIN, auth_1.UserRole.RECEPCIONISTA]), medicalRecordsController.getAllMedicalRecords);
// Get medical records by pet - VETERINARIO, ADMIN, RECEPCIONISTA
router.get('/pet/:petId', auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)([auth_1.UserRole.VETERINARIO, auth_1.UserRole.ADMIN, auth_1.UserRole.RECEPCIONISTA]), medicalRecordsController.getMedicalRecordsByPetId);
// Get medical record by id - VETERINARIO, ADMIN, RECEPCIONISTA
router.get('/:id', auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)([auth_1.UserRole.VETERINARIO, auth_1.UserRole.ADMIN, auth_1.UserRole.RECEPCIONISTA]), medicalRecordsController.getMedicalRecordById);
// Create medical record - RECEPCIONISTA, ADMIN only
router.post('/', auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)([auth_1.UserRole.RECEPCIONISTA, auth_1.UserRole.ADMIN]), medical_record_validator_1.createMedicalRecordValidator, dto_middleware_1.default, medicalRecordsController.createMedicalRecord);
// Update medical record - RECEPCIONISTA, ADMIN only
router.put('/:id', auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)([auth_1.UserRole.RECEPCIONISTA, auth_1.UserRole.ADMIN]), medical_record_validator_1.updateMedicalRecordValidator, dto_middleware_1.default, medicalRecordsController.updateMedicalRecord);
// Delete medical record - RECEPCIONISTA, ADMIN only
router.delete('/:id', auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)([auth_1.UserRole.RECEPCIONISTA, auth_1.UserRole.ADMIN]), medicalRecordsController.deleteMedicalRecord);
exports.default = router;
