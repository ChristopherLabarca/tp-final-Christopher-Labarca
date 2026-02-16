import { Router } from 'express';
import * as medicalRecordsController from '../controllers/medical-records.controller';
import { createMedicalRecordValidator, updateMedicalRecordValidator } from '../validators/medical-record.validator';
import validateDto from '../middlewares/dto.middleware';
import { authenticate, authorize } from '../middlewares/auth.middleware';
import { UserRole } from '../types/auth';

const router = Router();

// Get all medical records - VETERINARIO, ADMIN, RECEPCIONISTA
router.get(
  '/',
  authenticate,
  authorize([UserRole.VETERINARIO, UserRole.ADMIN, UserRole.RECEPCIONISTA]),
  medicalRecordsController.getAllMedicalRecords
);

// Get medical records by pet - VETERINARIO, ADMIN, RECEPCIONISTA
router.get(
  '/pet/:petId',
  authenticate,
  authorize([UserRole.VETERINARIO, UserRole.ADMIN, UserRole.RECEPCIONISTA]),
  medicalRecordsController.getMedicalRecordsByPetId
);

// Get medical record by id - VETERINARIO, ADMIN, RECEPCIONISTA
router.get(
  '/:id',
  authenticate,
  authorize([UserRole.VETERINARIO, UserRole.ADMIN, UserRole.RECEPCIONISTA]),
  medicalRecordsController.getMedicalRecordById
);

// Create medical record - RECEPCIONISTA, ADMIN only
router.post(
  '/',
  authenticate,
  authorize([UserRole.RECEPCIONISTA, UserRole.ADMIN]),
  createMedicalRecordValidator,
  validateDto,
  medicalRecordsController.createMedicalRecord
);

// Update medical record - RECEPCIONISTA, ADMIN only
router.put(
  '/:id',
  authenticate,
  authorize([UserRole.RECEPCIONISTA, UserRole.ADMIN]),
  updateMedicalRecordValidator,
  validateDto,
  medicalRecordsController.updateMedicalRecord
);

// Delete medical record - RECEPCIONISTA, ADMIN only
router.delete(
  '/:id',
  authenticate,
  authorize([UserRole.RECEPCIONISTA, UserRole.ADMIN]),
  medicalRecordsController.deleteMedicalRecord
);

export default router;
