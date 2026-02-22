import { Request, Response, NextFunction } from 'express';
import MedicalRecord from '../models/medical-records.model';
import { AppError } from '../types/appError';

export const getAllMedicalRecords = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const records = await MedicalRecord.find();
    res.status(200).json(records);
  } catch (err) {
    next(new AppError('Error al obtener historiales clínicos', 500));
  }
};

export const getMedicalRecordById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const record = await MedicalRecord.findById(req.params.id);
    if (!record) {
      return next(new AppError('Historial clínico no encontrado', 404));
    }
    res.status(200).json(record);
  } catch (err) {
    next(new AppError('Error al obtener historial clínico', 500));
  }
};

export const getMedicalRecordsByPetId = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const records = await MedicalRecord.find({ petId: req.params.petId });
    res.status(200).json(records);
  } catch (err) {
    next(new AppError('Error al obtener historiales clínicos de la mascota', 500));
  }
};

export const createMedicalRecord = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const record = new MedicalRecord(req.body);
    await record.save();
    res.status(201).json(record);
  } catch (err) {
    next(new AppError('Error al crear historial clínico', 500));
  }
};

export const updateMedicalRecord = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const record = await MedicalRecord.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!record) {
      return next(new AppError('Historial clínico no encontrado', 404));
    }

    res.status(200).json(record);
  } catch (err) {
    next(new AppError('Error al actualizar historial clínico', 500));
  }
};

export const deleteMedicalRecord = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const record = await MedicalRecord.findByIdAndDelete(req.params.id);

    if (!record) {
      return next(new AppError('Historial clínico no encontrado', 404));
    }

    res.status(200).json({
      message: 'Historial clínico eliminado exitosamente',
      record,
    });
  } catch (err) {
    next(new AppError('Error al eliminar historial clínico', 500));
  }
};
