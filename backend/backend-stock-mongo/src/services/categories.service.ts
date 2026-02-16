// Manage Logic for Categories
import { Category, ICategory } from '../models/categories.model';
import {
  CategoryResponseDTO,
  CreateCategoryDTO,
  UpdateCategoryDTO,
} from '../types/categories';

/**
 * Maps a Category document to a CategoryResponseDTO.
 * 
 * @param {ICategory} category - The category document to map.
 * @returns {CategoryResponseDTO} The mapped category data transfer object.
 */
const mapToResponseDTO = (category: ICategory): CategoryResponseDTO => {
  // return {...category.toObject(), id: category._id as string}
  return {
    name: category.name,
    description: category.description,
    createdAt: category.createdAt,
    updatedAt: category.updatedAt,
    id: category._id as string,
  };
};

/**
 * Retrieves all categories from the database.
 * 
 * @returns {Promise<CategoryResponseDTO[]>} A promise that resolves to an array of categories.
 */
export const getAllCategory = async (): Promise<CategoryResponseDTO[]> => {
  const categories = await Category.find();
  return categories.map(mapToResponseDTO);
};

/**
 * Retrieves a single category by its ID.
 * 
 * @param {string} id - The ID of the category to retrieve.
 * @returns {Promise<CategoryResponseDTO | null>} A promise that resolves to the category if found, or null otherwise.
 */
export const getCategoryById = async (
  id: string,
): Promise<CategoryResponseDTO | null> => {
  const category = await Category.findById(id);
  return category ? mapToResponseDTO(category) : null;
};

/**
 * Creates a new category in the database.
 * 
 * @param {CreateCategoryDTO} data - The data for the new category.
 * @returns {Promise<CategoryResponseDTO>} A promise that resolves to the newly created category.
 */
export const createCategory = async (
  data: CreateCategoryDTO,
): Promise<CategoryResponseDTO> => {
  const newCategory = new Category(data);
  const savedCategory = await newCategory.save();
  return mapToResponseDTO(savedCategory);
};

/**
 * Updates an existing category by its ID.
 * 
 * @param {string} id - The ID of the category to update.
 * @param {UpdateCategoryDTO} data - The updated data for the category.
 * @returns {Promise<CategoryResponseDTO | null>} A promise that resolves to the updated category if successful, or null if not found.
 */
export const updateCategory = async (
  id: string,
  data: UpdateCategoryDTO,
): Promise<CategoryResponseDTO | null> => {
  const category = await Category.findByIdAndUpdate(id, data, {
    new: true,
  });

  return category ? mapToResponseDTO(category) : null;
};

/**
 * Removes a category from the database by its ID.
 * 
 * @param {string} id - The ID of the category to remove.
 * @returns {Promise<CategoryResponseDTO | null>} A promise that resolves to the removed category if successful, or null if not found.
 */
export const removeCategory = async (
  id: string,
): Promise<CategoryResponseDTO | null> => {
  const category = await Category.findByIdAndDelete(id);
  return category ? mapToResponseDTO(category) : null;
};
