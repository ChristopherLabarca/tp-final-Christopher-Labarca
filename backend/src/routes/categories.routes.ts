import { Router } from 'express';
import * as categoriesController from '../controllers/categories.controller';
import {
  createCategoryValidator,
  updateCategoryValidator,
} from '../validators/category.validator';
import { authenticate, authorize } from '../middlewares/auth.middleware';
import validateDto from '../middlewares/dto.middleware';
import { UserRole } from '../types/auth';

const router: Router = Router();

// Public GET endpoints - lectura de categorías disponible para todos
router.get('/', categoriesController.getAll);
router.get('/:id', categoriesController.getById);

// Protected endpoints - solo admin puede crear, actualizar o eliminar
// Create Category
// evalua el token de autenticacion
// evalua el rol del usuario
// valida el dto
// llama al controller para que siga el flujo
router.post(
  '/',
  authenticate,
  authorize([UserRole.ADMIN]),
  createCategoryValidator,
  validateDto,
  categoriesController.create,
);

router.put(
  '/:id',
  authenticate,
  authorize([UserRole.ADMIN]),
  updateCategoryValidator,
  validateDto,
  categoriesController.update,
);
router.delete(
  '/:id',
  authenticate,
  authorize([UserRole.ADMIN]),
  categoriesController.remove,
);

export default router;
