import { Router } from 'express';
import * as categoriesController from '../controllers/categories.controller';
import {
  createCategoryValidator,
  updateCategoryValidator,
} from '../validators/category.validator';
import { authenticate, authorize } from '../middlewares/auth.middleware';
import validateDto from '../middlewares/dto.middleware';

const router: Router = Router();

router.get('/', authenticate, categoriesController.getAll);
router.get('/:id', categoriesController.getById);

// Create Category
// viene desde el index.ts de routes
// evalua el token de autenticacion
// evalua el rol del usuario
// valida el dto
// llama al controller para que siga el flujo
router.post(
  '/',
  authenticate,
  authorize(['admin']),
  createCategoryValidator,
  validateDto,
  categoriesController.create,
);

router.put(
  '/:id',
  authenticate,
  authorize(['admin']),
  updateCategoryValidator,
  validateDto,
  categoriesController.update,
);
router.delete(
  '/:id',
  authenticate,
  authorize(['admin']),
  categoriesController.remove,
);

export default router;
