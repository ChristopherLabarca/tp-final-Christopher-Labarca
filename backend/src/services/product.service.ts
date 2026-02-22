import { IProduct, Product } from '../models/products.model';

// CRUD

/**
 * Creates a new product in the database.
 * 
 * @param {IProduct} data - The product data to save.
 * @returns {Promise<IProduct>} A promise that resolves to the saved product.
 */
export const createProduct = async (data: IProduct) => {
  const product = new Product(data);
  return await product.save();
};

/**
 * Retrieves all products from the database, populating the category name.
 * 
 * @returns {Promise<IProduct[]>} A promise that resolves to an array of products.
 */
export const getAllProducts = async () => {
  return await Product.find().populate('categoryId', 'name');
};

/**
 * Retrieves a single product by its ID, populating the category name.
 * 
 * @param {string} id - The ID of the product to retrieve.
 * @returns {Promise<IProduct | null>} A promise that resolves to the product if found, or null otherwise.
 */
export const getProductById = async (id: string) => {
  return await Product.findById(id).populate('categoryId', 'name');
};

// id viene desde la url y el objeto viene desde el body
/**
 * Updates an existing product by its ID.
 * 
 * @param {string} id - The ID of the product to update.
 * @param {Partial<IProduct>} data - The updated data for the product.
 * @returns {Promise<IProduct | null>} A promise that resolves to the updated product if successful, or null if not found.
 */
export const updateProduct = async (id: string, data: Partial<IProduct>) => {
  return await Product.findByIdAndUpdate(id, data, { new: true }).populate(
    'categoryId',
    'name',
  );
};

/**
 * Deletes a product from the database by its ID.
 * 
 * @param {string} id - The ID of the product to delete.
 * @returns {Promise<IProduct | null>} A promise that resolves to the deleted product if successful, or null if not found.
 */
export const deleteProduct = async (id: string) => {
  return await Product.findByIdAndDelete(id);
};
