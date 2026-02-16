import { Request, Response, NextFunction } from 'express';
import { AppError } from '../types/appError';

/**
 * Global error handler middleware for Express.
 * Handles different types of errors (AppError, Mongoose CastError, ValidationError, etc.)
 * and returns a structured JSON response.
 * 
 * @param {Error} err - The error object.
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @param {NextFunction} next - Express next function.
 * @returns {Response} JSON response with error details.
 */
export const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            status: 'error',
            message: err.message,
        });
    }

    // Errores de Mongoose (ID no válido)
    if (err.name === 'CastError') {
        return res.status(400).json({
            status: 'error',
            message: 'ID inválido',
        });
    }

    // Errores de validación de Mongoose
    if (err.name === 'ValidationError') {
        return res.status(400).json({
            status: 'error',
            message: err.message,
        });
    }

    // Error de duplicado en MongoDB (ej. nombre de categoría único)
    if ((err as any).code === 11000) {
        return res.status(400).json({
            status: 'error',
            message: 'Valor duplicado en la base de datos',
        });
    }

    // Errores inesperados
    console.error('ERROR 💥:', err);
    return res.status(500).json({
        status: 'error',
        message: 'Algo salió mal en el servidor',
    });
};
