import { Request, Response } from 'express';
import * as authService from '../services/auth.service';

/**
 * Controller to register a new user.
 * 
 * @param {Request} req - Express request object containing username, email, and password in body.
 * @param {Response} res - Express response object.
 * @returns {Promise<Response>} JSON response indicating success or an error message.
 */
export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    await authService.register(username, email, password);

    return res.status(201).json({ message: 'Usuario creado exitosamente' });
  } catch (error: any) {
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ error: 'El usuario o email ya existe' });
    }

    console.error('Error during registration:', error);
    return res.status(500).json({ error: 'Error al registrar el usuario' });
  }
};

/**
 * Controller to authenticate a user and return a JWT.
 * 
 * @param {Request} req - Express request object containing email and password in body.
 * @param {Response} res - Express response object.
 * @returns {Promise<Response>} JSON response with the JWT and user data or an error message.
 */
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const response = await authService.login(email, password);

    return res.json(response);
  } catch (error: any) {
    if (error.message === 'Credenciales inválidas') {
      return res.status(401).json({ error: error.message });
    }
    return res.status(500).json({ error: 'Error al iniciar sesión' });
  }
};

/**
 * Controller to logout a user (JWT-based, so mainly for frontend cleanup)
 * 
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @returns {Response} JSON response confirming logout.
 */
export const logout = async (req: Request, res: Response) => {
  // En JWT, el logout es manejado por el cliente (eliminar el token)
  // Aquí solo confirmamos el logout
  return res.json({ message: 'Sesión cerrada exitosamente' });
};

/**
 * Controller to get current user info
 * 
 * @param {Request} req - Express request object with user in middleware.
 * @param {Response} res - Express response object.
 * @returns {Response} JSON response with user data.
 */
export const getCurrentUser = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    if (!user) {
      return res.status(401).json({ error: 'Usuario no autenticado' });
    }

    return res.json({
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    });
  } catch (error: any) {
    return res.status(500).json({ error: 'Error al obtener usuario' });
  }
};

/**
 * Controller to update user password
 * 
 * @param {Request} req - Express request object with currentPassword and newPassword in body.
 * @param {Response} res - Express response object.
 * @returns {Response} JSON response indicating success or error.
 */
export const updatePassword = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    const { currentPassword, newPassword } = req.body;

    if (!userId) {
      return res.status(401).json({ error: 'Usuario no autenticado' });
    }

    await authService.updatePassword(userId, currentPassword, newPassword);
    return res.json({ message: 'Contraseña actualizada exitosamente' });
  } catch (error: any) {
    if (error.message === 'Contraseña actual incorrecta') {
      return res.status(401).json({ error: error.message });
    }
    if (error.message === 'Usuario no encontrado') {
      return res.status(404).json({ error: error.message });
    }
    return res.status(500).json({ error: 'Error al actualizar contraseña' });
  }
};
