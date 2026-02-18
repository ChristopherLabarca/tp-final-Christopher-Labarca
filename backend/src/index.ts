/**
 * @file index.ts
 * @description Main entry point for the Stock Management Backend API.
 * Configures Express, middleware, routes, and connects to MongoDB.
 */

import express, { Request, Response } from 'express';
import path from 'path';
import cors from 'cors';

import 'dotenv/config';
import authRoutes from './routes/auth.routes';
import categoriesRoutes from './routes/categories.routes';
import productsRoutes from './routes/product.routes';
import ownersRoutes from './routes/owners.routes';
import petsRoutes from './routes/pets.routes';
import medicalRecordsRoutes from './routes/medical-records.routes';
import usersRoutes from './routes/users.routes';
import { authenticate, authorize } from './middlewares/auth.middleware';
import { connectDB } from './config/database';
import { errorHandler } from './middlewares/error.middleware';
import { AppError } from './types/appError';
import { UserRole } from './types/auth';


const app = express();
const PORT = process.env.PORT || 3000;

// Middleware CORS para permitir conexiones desde el frontend
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175'],
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Middleware para interpretar JSON
app.use(express.json());

// Middleware para servir archivos estáticos desde la carpeta "public"
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use('/auth', authRoutes);

app.get('/public', (req: Request, res: Response) => {
  res.json({
    message: 'Cualquiera puede entrar!',
  });
});

app.get('/protected', authenticate, (req, res) => {
  res.json({
    message: 'Acceso permitido',
  });
});

// Ruta de administrador (requiere autenticación y rol admin)
app.get('/admin', authenticate, authorize([UserRole.ADMIN]), (req, res) => {
  res.json({
    message: 'Acceso de administrador permitido',
  });
});

app.get('/api/saludo', (req: Request, res: Response) => {
  res.json({ mensaje: 'Hola desde la API 🚀' });
});

app.use('/api/categoria', categoriesRoutes);
app.use('/api/producto', productsRoutes);
app.use('/api/owner', ownersRoutes);
app.use('/api/pet', petsRoutes);
app.use('/api/medical-record', medicalRecordsRoutes);
app.use('/api/user', usersRoutes);

app.get('/api/test-error', (req, res, next) => {
  next(new AppError('Este es un error de prueba!', 418));
});

// Middleware de manejo de errores global (debe ser el último)
app.use(errorHandler);

/**
 * Connects to the database and starts the HTTP server.
 */
const startServer = async () => {
  try {
    await connectDB();
  } catch (error) {
    console.warn('⚠️ Continuando sin base de datos inicialmente...');
  }

  app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    console.log(`📚 Lee API_INTEGRATION_GUIDE.md para documentación`);
  });
};

startServer().catch(err => {
  console.error('Error fatal al iniciar servidor:', err);
  process.exit(1);
});

