import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import Pet from '../models/pets.model';
import { AppError } from '../types/appError';


export const getAllPets = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const pets = await Pet.find();
    res.status(200).json(pets);
  } catch (err) {
    next(new AppError('Error al obtener mascotas', 500));
  }
};

export const getPetById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const pet = await Pet.findById(req.params.id);
    if (!pet) {
      return next(new AppError('Mascota no encontrada', 404));
    }
    res.status(200).json(pet);
  } catch (err) {
    next(new AppError('Error al obtener mascota', 500));
  }
};

export const getPetsByOwnerId = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const pets = await Pet.find({ ownerId: req.params.ownerId });
    res.status(200).json(pets);
  } catch (err) {
    next(new AppError('Error al obtener mascotas del propietario', 500));
  }
};

export const createPet = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map(err => err.msg).join(', ');
      return next(new AppError(errorMessages, 400));
    }

    const pet = new Pet({ ...req.body });
    await pet.save();
    res.status(201).json(pet);
  } catch (err) {
    next(new AppError('Error al crear mascota', 500));
  }
};

export const updatePet = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map(err => err.msg).join(', ');
      return next(new AppError(errorMessages, 400));
    }

    const pet = await Pet.findByIdAndUpdate(req.params.id, { ...req.body }, {
      new: true,
      runValidators: true,
    });

    if (!pet) {
      return next(new AppError('Mascota no encontrada', 404));
    }

    res.status(200).json(pet);
  } catch (err) {
    next(new AppError('Error al actualizar mascota', 500));
  }
};

export const deletePet = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const pet = await Pet.findByIdAndDelete(req.params.id);

    if (!pet) {
      return next(new AppError('Mascota no encontrada', 404));
    }

    res.status(200).json({
      message: 'Mascota eliminada exitosamente',
      pet,
    });
  } catch (err) {
    next(new AppError('Error al eliminar mascota', 500));
  }
};
