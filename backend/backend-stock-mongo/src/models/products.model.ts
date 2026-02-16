import mongoose, { Schema, Document } from 'mongoose';

/**
 * Interface representing a Product document in MongoDB.
 * 
 * @interface IProduct
 * @extends {Document}
 */
export interface IProduct extends Document {
  /** The name of the product */
  name: string;
  /** An optional description of the product */
  description?: string;
  /** The price of the product */
  price: number;
  /** The current stock level of the product */
  stock: number;
  /** Reference to the category this product belongs to */
  categoryId: mongoose.Types.ObjectId;
  /** The date the product was created */
  createdAt?: Date;
  /** The date the product was last updated */
  updatedAt?: Date;
}

const productSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true, unique: true, trim: true },
    description: { type: String, required: false, trim: true },
    price: { type: Number, required: true, min: 0 },
    stock: { type: Number, required: true, min: 0 },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
  },
  { timestamps: true },
);

productSchema.index({ name: 1 });
productSchema.index({ categoryId: 1 });

export const Product = mongoose.model<IProduct>('Product', productSchema);
