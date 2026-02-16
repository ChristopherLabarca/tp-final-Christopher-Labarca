import mongoose, { Schema, Document } from 'mongoose';

/**
 * Interface representing an Owner (Client) document in MongoDB.
 * 
 * @interface IOwner
 * @extends {Document}
 */
export interface IOwner extends Document {
  /** The full name of the owner */
  nombre: string;
  /** The telephone number of the owner */
  telefono: string;
  /** The email address of the owner */
  email: string;
  /** Optional address of the owner */
  direccion?: string;
  /** The date the owner was created */
  createdAt?: Date;
  /** The date the owner was last updated */
  updatedAt?: Date;
}

/**
 * Mongoose schema for Owner model
 */
const ownerSchema = new Schema<IOwner>(
  {
    nombre: {
      type: String,
      required: true,
      trim: true,
    },
    telefono: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: /.+\@.+\..+/,
    },
    direccion: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

/**
 * Owner model
 */
const Owner = mongoose.model<IOwner>('Owner', ownerSchema);

export default Owner;
