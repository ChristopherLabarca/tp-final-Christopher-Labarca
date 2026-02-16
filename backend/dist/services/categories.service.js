"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeCategory = exports.updateCategory = exports.createCategory = exports.getCategoryById = exports.getAllCategory = void 0;
// Manage Logic for Categories
const categories_model_1 = require("../models/categories.model");
/**
 * Maps a Category document to a CategoryResponseDTO.
 *
 * @param {ICategory} category - The category document to map.
 * @returns {CategoryResponseDTO} The mapped category data transfer object.
 */
const mapToResponseDTO = (category) => {
    // return {...category.toObject(), id: category._id as string}
    return {
        name: category.name,
        description: category.description,
        createdAt: category.createdAt,
        updatedAt: category.updatedAt,
        id: category._id,
    };
};
/**
 * Retrieves all categories from the database.
 *
 * @returns {Promise<CategoryResponseDTO[]>} A promise that resolves to an array of categories.
 */
const getAllCategory = async () => {
    const categories = await categories_model_1.Category.find();
    return categories.map(mapToResponseDTO);
};
exports.getAllCategory = getAllCategory;
/**
 * Retrieves a single category by its ID.
 *
 * @param {string} id - The ID of the category to retrieve.
 * @returns {Promise<CategoryResponseDTO | null>} A promise that resolves to the category if found, or null otherwise.
 */
const getCategoryById = async (id) => {
    const category = await categories_model_1.Category.findById(id);
    return category ? mapToResponseDTO(category) : null;
};
exports.getCategoryById = getCategoryById;
/**
 * Creates a new category in the database.
 *
 * @param {CreateCategoryDTO} data - The data for the new category.
 * @returns {Promise<CategoryResponseDTO>} A promise that resolves to the newly created category.
 */
const createCategory = async (data) => {
    const newCategory = new categories_model_1.Category(data);
    const savedCategory = await newCategory.save();
    return mapToResponseDTO(savedCategory);
};
exports.createCategory = createCategory;
/**
 * Updates an existing category by its ID.
 *
 * @param {string} id - The ID of the category to update.
 * @param {UpdateCategoryDTO} data - The updated data for the category.
 * @returns {Promise<CategoryResponseDTO | null>} A promise that resolves to the updated category if successful, or null if not found.
 */
const updateCategory = async (id, data) => {
    const category = await categories_model_1.Category.findByIdAndUpdate(id, data, {
        new: true,
    });
    return category ? mapToResponseDTO(category) : null;
};
exports.updateCategory = updateCategory;
/**
 * Removes a category from the database by its ID.
 *
 * @param {string} id - The ID of the category to remove.
 * @returns {Promise<CategoryResponseDTO | null>} A promise that resolves to the removed category if successful, or null if not found.
 */
const removeCategory = async (id) => {
    const category = await categories_model_1.Category.findByIdAndDelete(id);
    return category ? mapToResponseDTO(category) : null;
};
exports.removeCategory = removeCategory;
