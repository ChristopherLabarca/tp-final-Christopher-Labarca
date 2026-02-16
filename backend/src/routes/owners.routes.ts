import { Router } from 'express';
import * as ownersController from '../controllers/owners.controller';
import {
  createOwnerValidator,
  updateOwnerValidator,
} from '../validators/owner.validator';
import validateDto from '../middlewares/dto.middleware';
import { authenticate, authorize } from '../middlewares/auth.middleware';
import { UserRole } from '../types/auth';

const router = Router();

/**
 * Public GET endpoints - lectura de propietarios disponible para todos
 */
router.get('/', ownersController.getAllOwners);
router.get('/:id', ownersController.getOwnerById);

/**
 * Protected POST/PUT/DELETE endpoints - requiresRECEPCIONISTA or ADMIN
 */
router.post(
  '/',
  authenticate,
  authorize([UserRole.RECEPCIONISTA, UserRole.ADMIN]),
  createOwnerValidator,
  validateDto,
  ownersController.createOwner
);

router.put(
  '/:id',
  authenticate,
  authorize([UserRole.RECEPCIONISTA, UserRole.ADMIN]),
  updateOwnerValidator,
  validateDto,
  ownersController.updateOwner
);

router.delete(
  '/:id',
  authenticate,
  authorize([UserRole.RECEPCIONISTA, UserRole.ADMIN]),
  ownersController.deleteOwner
);

export default router;
