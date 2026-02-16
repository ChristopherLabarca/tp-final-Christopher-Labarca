"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.getProductById = exports.getAllProducts = exports.createProduct = void 0;
const products_model_1 = require("../models/products.model");
// CRUD
/**
 * Creates a new product in the database.
 *
 * @param {IProduct} data - The product data to save.
 * @returns {Promise<IProduct>} A promise that resolves to the saved product.
 */
const createProduct = async (data) => {
    const product = new products_model_1.Product(data);
    return await product.save();
};
exports.createProduct = createProduct;
/**
 * Retrieves all products from the database, populating the category name.
 *
 * @returns {Promise<IProduct[]>} A promise that resolves to an array of products.
 */
const getAllProducts = async () => {
    return await products_model_1.Product.find().populate('categoryId', 'name');
};
exports.getAllProducts = getAllProducts;
/**
 * Retrieves a single product by its ID, populating the category name.
 *
 * @param {string} id - The ID of the product to retrieve.
 * @returns {Promise<IProduct | null>} A promise that resolves to the product if found, or null otherwise.
 */
const getProductById = async (id) => {
    return await products_model_1.Product.findById(id).populate('categoryId', 'name');
};
exports.getProductById = getProductById;
// id viene desde la url y el objeto viene desde el body
/**
 * Updates an existing product by its ID.
 *
 * @param {string} id - The ID of the product to update.
 * @param {Partial<IProduct>} data - The updated data for the product.
 * @returns {Promise<IProduct | null>} A promise that resolves to the updated product if successful, or null if not found.
 */
const updateProduct = async (id, data) => {
    return await products_model_1.Product.findByIdAndUpdate(id, data, { new: true }).populate('categoryId', 'name');
};
exports.updateProduct = updateProduct;
/**
 * Deletes a product from the database by its ID.
 *
 * @param {string} id - The ID of the product to delete.
 * @returns {Promise<IProduct | null>} A promise that resolves to the deleted product if successful, or null if not found.
 */
const deleteProduct = async (id) => {
    return await products_model_1.Product.findByIdAndDelete(id);
};
exports.deleteProduct = deleteProduct;
