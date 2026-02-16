"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const auth_validator_1 = require("../validators/auth.validator");
const auth_middleware_1 = require("../middlewares/auth.middleware");
// import rateLimit from 'express-rate-limit';
const router = (0, express_1.Router)();
// Limitar intentos de registro y login
// const authLimiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutos
//   max: 5, // máximo 5 intentos
//   message: 'Demasiados intentos, inténtalo de nuevo más tarde',
// });
// router.post('/register', authLimiter, registerValidator, register);
// router.post('/login', authLimiter, loginValidator, login);
router.post('/register', auth_validator_1.registerValidator, auth_controller_1.register);
router.post('/login', auth_validator_1.loginValidator, auth_controller_1.login);
router.post('/logout', auth_middleware_1.authenticate, auth_controller_1.logout);
router.get('/me', auth_middleware_1.authenticate, auth_controller_1.getCurrentUser);
router.patch('/password', auth_middleware_1.authenticate, auth_controller_1.updatePassword);
exports.default = router;
