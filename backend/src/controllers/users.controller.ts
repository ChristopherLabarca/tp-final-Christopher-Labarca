import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { User } from '../models/users.model';
import { AppError } from '../types/appError';
import bcrypt from 'bcrypt';
import { UserRole } from '../types/auth';

export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await User.find().select('-password');
    res.status(200).json(users);
  } catch (err) {
    next(new AppError('Error al obtener usuarios', 500));
  }
};

export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return next(new AppError('Usuario no encontrado', 404));
    }
    res.status(200).json(user);
  } catch (err) {
    next(new AppError('Error al obtener usuario', 500));
  }
};

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map(err => err.msg).join(', ');
      return next(new AppError(errorMessages, 400));
    }

    const { username, email, password, role } = req.body;

    // Check for duplicates
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return next(new AppError('El usuario o email ya existe', 400));
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      username,
      email,
      password: hashedPassword,
      role: role || UserRole.RECEPCIONISTA,
    });

    await user.save();
    const userResponse = user.toObject();
    (userResponse as any).password = undefined;
    
    res.status(201).json(userResponse);
  } catch (err) {
    next(new AppError('Error al crear usuario', 500));
  }
};

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map(err => err.msg).join(', ');
      return next(new AppError(errorMessages, 400));
    }

    const { username, email, role } = req.body;
    const userId = req.params.id;

    // Check for duplicate email/username (excluding current user)
    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
      _id: { $ne: userId },
    });

    if (existingUser) {
      return next(new AppError('El usuario o email ya existe', 400));
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { username, email, role },
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return next(new AppError('Usuario no encontrado', 404));
    }

    res.status(200).json(user);
  } catch (err) {
    next(new AppError('Error al actualizar usuario', 500));
  }
};

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.params.id;
    const currentUserId = (req as any).user?.id;

    // Prevent deleting yourself
    if (userId === currentUserId) {
      return next(new AppError('No puedes eliminar tu propia cuenta', 400));
    }

    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      return next(new AppError('Usuario no encontrado', 404));
    }

    res.status(200).json({
      message: 'Usuario eliminado exitosamente',
      user: { id: user._id, username: user.username, email: user.email },
    });
  } catch (err) {
    next(new AppError('Error al eliminar usuario', 500));
  }
};
