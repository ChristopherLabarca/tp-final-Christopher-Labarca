import { Request, Response, NextFunction } from 'express';
import Owner, { IOwner } from '../models/owners.model';
import { AppError } from '../types/appError';

/**
 * Get all owners
 * @route GET /api/owner
 * @public
 */
export const getAllOwners = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const owners = await Owner.find();
    res.json(owners);
  } catch (error) {
    next(error);
  }
};

/**
 * Get owner by ID
 * @route GET /api/owner/:id
 * @public
 */
export const getOwnerById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const owner = await Owner.findById(id);

    if (!owner) {
      return next(new AppError('Propietario no encontrado', 404));
    }

    res.json(owner);
  } catch (error) {
    next(error);
  }
};

/**
 * Create a new owner
 * @route POST /api/owner
 * @public (sin requerir autenticación para simplificar - se puede cambiar si es necesario)
 */
export const createOwner = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { nombre, telefono, email, direccion } = req.body;

    // Verificar si el email ya existe
    const existingOwner = await Owner.findOne({ email: email.toLowerCase() });
    if (existingOwner) {
      return next(new AppError('El email ya está registrado', 400));
    }

    const newOwner = new Owner({
      nombre,
      telefono,
      email,
      direccion,
    });

    await newOwner.save();
    res.status(201).json(newOwner);
  } catch (error) {
    next(error);
  }
};

/**
 * Update an owner
 * @route PUT /api/owner/:id
 * @public
 */
export const updateOwner = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { nombre, telefono, email, direccion } = req.body;

    // Si se intenta actualizar el email, verificar que no esté en uso
    if (email) {
      const existingOwner = await Owner.findOne({ 
        email: email.toLowerCase(),
        _id: { $ne: id }
      });
      if (existingOwner) {
        return next(new AppError('El email ya está en uso', 400));
      }
    }

    const updatedOwner = await Owner.findByIdAndUpdate(
      id,
      { nombre, telefono, email, direccion },
      { new: true, runValidators: true }
    );

    if (!updatedOwner) {
      return next(new AppError('Propietario no encontrado', 404));
    }

    res.json(updatedOwner);
  } catch (error) {
    next(error);
  }
};

/**
 * Delete an owner
 * @route DELETE /api/owner/:id
 * @public
 */
export const deleteOwner = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const deletedOwner = await Owner.findByIdAndDelete(id);

    if (!deletedOwner) {
      return next(new AppError('Propietario no encontrado', 404));
    }

    res.json({ message: 'Propietario eliminado exitosamente', owner: deletedOwner });
  } catch (error) {
    next(error);
  }
};
