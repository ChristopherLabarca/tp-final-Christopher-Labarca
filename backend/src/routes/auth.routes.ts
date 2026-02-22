import { Router } from 'express';
import { register, login, logout, getCurrentUser, updatePassword } from '../controllers/auth.controller';
import {
  registerValidator,
  loginValidator,
} from '../validators/auth.validator';
import { authenticate } from '../middlewares/auth.middleware';
import validateDto from '../middlewares/dto.middleware';
// import rateLimit from 'express-rate-limit';

const router = Router();

// Limitar intentos de registro y login
// const authLimiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutos
//   max: 5, // máximo 5 intentos
//   message: 'Demasiados intentos, inténtalo de nuevo más tarde',
// });

// router.post('/register', authLimiter, registerValidator, validateDto, register);
// router.post('/login', authLimiter, loginValidator, validateDto, login);

router.post('/register', registerValidator, validateDto, register);
router.post('/login', loginValidator, validateDto, login);
router.post('/logout', authenticate, logout);
router.get('/me', authenticate, getCurrentUser);
router.patch('/password', authenticate, validateDto, updatePassword);

export default router;
