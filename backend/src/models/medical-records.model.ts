import { Document, Schema, model } from 'mongoose';

export interface IMedicalRecord extends Document {
  petId: string;
  fecha: Date;
  hora: string;
  diagnostico: string;
  tratamiento: string;
  veterinario?: string;
  notas?: string;
  createdAt: Date;
  updatedAt: Date;
}

const medicalRecordSchema = new Schema<IMedicalRecord>(
  {
    petId: {
      type: String,
      required: [true, 'El ID de la mascota es requerido'],
    },
    fecha: {
      type: Date,
      required: [true, 'La fecha es requerida'],
    },
    hora: {
      type: String,
      required: [true, 'La hora es requerida'],
      match: [/^\d{2}:\d{2}$/, 'La hora debe ser en formato HH:MM'],
    },
    diagnostico: {
      type: String,
      required: [true, 'El diagnóstico es requerido'],
      minlength: [5, 'El diagnóstico debe tener al menos 5 caracteres'],
    },
    tratamiento: {
      type: String,
      required: [true, 'El tratamiento es requerido'],
      minlength: [5, 'El tratamiento debe tener al menos 5 caracteres'],
    },
    veterinario: {
      type: String,
      default: 'Dr. Sistema',
    },
    notas: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);

export default model<IMedicalRecord>('MedicalRecord', medicalRecordSchema);
