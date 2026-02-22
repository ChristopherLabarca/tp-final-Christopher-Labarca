import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JwtPayload } from '../types/auth';
import { extractBearerToken } from '../utils/token.utils';

const JWT_SECRET = process.env.JWT_SECRET as string;

/**
 * Optional authentication middleware
 * Intenta verificar el token si existe, pero no falla si no está presente.
 * Útil para endpoints que pueden ser públicos pero tener funcionalidades extras si autenticado.
 * 
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @param {NextFunction} next - Express next function.
 * @returns {void}
 */
export const optionalAuth = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = extractBearerToken(req);

  if (!token) {
    // No token provided, pero continuamos sin autenticación
    req.user = undefined;
    return next();
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      // Token inválido o expirado, continuamos sin usuario
      console.warn('Invalid token received:', err.message);
      req.user = undefined;
    } else {
      req.user = decoded as JwtPayload;
    }
    next();
  });
};
