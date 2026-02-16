import { Router } from 'express';
import * as petsController from '../controllers/pets.controller';
import { createPetValidator, updatePetValidator } from '../validators/pet.validator';
import validateDto from '../middlewares/dto.middleware';
import { authenticate, authorize } from '../middlewares/auth.middleware';
import { UserRole } from '../types/auth';

const router = Router();

// Get all pets
router.get('/', petsController.getAllPets);

// Get pets by owner
router.get('/owner/:ownerId', petsController.getPetsByOwnerId);

// Get pet by id
router.get('/:id', petsController.getPetById);

// Create pet - RECEPCIONISTA, ADMIN only
router.post(
  '/',
  authenticate,
  authorize([UserRole.RECEPCIONISTA, UserRole.ADMIN]),
  createPetValidator,
  validateDto,
  petsController.createPet
);

// Update pet - RECEPCIONISTA, ADMIN only
router.put(
  '/:id',
  authenticate,
  authorize([UserRole.RECEPCIONISTA, UserRole.ADMIN]),
  updatePetValidator,
  validateDto,
  petsController.updatePet
);

// Delete pet - RECEPCIONISTA, ADMIN only
router.delete(
  '/:id',
  authenticate,
  authorize([UserRole.RECEPCIONISTA, UserRole.ADMIN]),
  petsController.deletePet
);

export default router;
