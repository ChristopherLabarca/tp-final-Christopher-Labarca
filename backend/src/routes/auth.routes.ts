import { Router } from 'express';
import { register, login, logout, getCurrentUser, updatePassword } from '../controllers/auth.controller';
import {
  registerValidator,
  loginValidator,
} from '../validators/auth.validator';
import { authenticate } from '../middlewares/auth.middleware';
// import rateLimit from 'express-rate-limit';

const router = Router();

// Limitar intentos de registro y login
// const authLimiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutos
//   max: 5, // máximo 5 intentos
//   message: 'Demasiados intentos, inténtalo de nuevo más tarde',
// });

// router.post('/register', authLimiter, registerValidator, register);
// router.post('/login', authLimiter, loginValidator, login);

router.post('/register', registerValidator, register);
router.post('/login', loginValidator, login);
router.post('/logout', authenticate, logout);
router.get('/me', authenticate, getCurrentUser);
router.patch('/password', authenticate, updatePassword);

export default router;
