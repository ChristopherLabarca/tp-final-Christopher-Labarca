import { Router } from 'express';
import * as usersController from '../controllers/users.controller';
import { createUserValidator, updateUserValidator } from '../validators/user.validator';
import validateDto from '../middlewares/dto.middleware';
import { authenticate, authorize } from '../middlewares/auth.middleware';
import { UserRole } from '../types/auth';

const router = Router();

// Admin only routes
router.get('/', authenticate, authorize([UserRole.ADMIN]), usersController.getAllUsers);
router.get('/:id', authenticate, authorize([UserRole.ADMIN]), usersController.getUserById);
router.post('/', authenticate, authorize([UserRole.ADMIN]), createUserValidator, validateDto, usersController.createUser);
router.put('/:id', authenticate, authorize([UserRole.ADMIN]), updateUserValidator, validateDto, usersController.updateUser);
router.delete('/:id', authenticate, authorize([UserRole.ADMIN]), usersController.deleteUser);

export default router;
