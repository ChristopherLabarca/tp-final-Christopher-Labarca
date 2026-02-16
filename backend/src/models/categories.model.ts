import mongoose, { Schema, Document } from 'mongoose';

/**
 * Interface representing a Category document in MongoDB.
 * 
 * @interface ICategory
 * @extends {Document}
 */
export interface ICategory extends Document {
  /** The name of the category */
  name: string;
  /** An optional description of the category */
  description?: string;
  /** The date the category was created */
  createdAt: Date;
  /** The date the category was last updated */
  updatedAt: Date;
}

// Necesito definir el Schema
const categorySchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true, // el trim elimina espacios al inicio y al final
    },
    description: { type: String, trim: true },
  },
  { timestamps: true },
);

// Definir el modelo
export const Category = mongoose.model<ICategory>('Category', categorySchema);
