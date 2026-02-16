import { Request, Response } from 'express';
import * as categoriesService from '../services/categories.service';
import { CreateCategoryDTO, UpdateCategoryDTO } from '../types/categories';
import { validationResult } from 'express-validator';

// getAll()
/**
 * Controller to get all categories.
 * 
 * @param {Request} _req - Express request object.
 * @param {Response} res - Express response object.
 * @returns {Promise<Response>} JSON response with an array of categories or an error message.
 */
export const getAll = async (_req: Request, res: Response) => {
  try {
    const categories = await categoriesService.getAllCategory();
    return res.status(200).json(categories);
  } catch (error) {
    return res.status(500).json({ mensaje: 'Error al obtener las categorías' });
  }
};

// getById()
/**
 * Controller to get a category by its ID.
 * 
 * @param {Request} req - Express request object containing the category ID in params.
 * @param {Response} res - Express response object.
 * @returns {Promise<Response>} JSON response with the category data or an error message.
 */
export const getById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const category = await categoriesService.getCategoryById(id);
    if (!category) {
      return res.status(404).json({ mensaje: 'Categoría no encontrada' });
    }
    return res.status(200).json(category);
  } catch (error) {
    return res
      .status(500)
      .json({ mensaje: `Error al obtener la categoría ${id}` });
  }
};

// create()
/**
 * Controller to create a new category.
 * 
 * @param {Request} req - Express request object containing category data in body.
 * @param {Response} res - Express response object.
 * @returns {Promise<Response>} JSON response with the created category or an error message.
 */
export const create = async (req: Request, res: Response) => {
  try {
    const categoryData: CreateCategoryDTO = req.body;

    console.log('categoryData', categoryData);

    console.log('Datos recibidos para crear categoría:', categoryData);

    const newCategory = await categoriesService.createCategory(categoryData);
    return res.status(201).json(newCategory);
  } catch (error) {
    return res.status(500).json({ mensaje: 'Error al crear la categoría' });
  }
};

// update()
/**
 * Controller to update an existing category.
 * 
 * @param {Request} req - Express request object containing the category ID in params and updated data in body.
 * @param {Response} res - Express response object.
 * @returns {Promise<Response>} JSON response with the updated category or an error message.
 */
export const update = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const categoryData: UpdateCategoryDTO = req.body;
    const updatedCategory = await categoriesService.updateCategory(
      id,
      categoryData,
    );

    if (!updatedCategory) {
      return res.status(404).json({ mensaje: 'Categoría no encontrada' });
    }
    return res.status(200).json(updatedCategory);
  } catch (error: any) {
    // Manejo específico para error de clave duplicada
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ mensaje: 'El nombre de la categoría ya existe' });
    }

    return res
      .status(500)
      .json({ mensaje: 'Error al actualizar la categoría' });
  }
};

// remove ()
/**
 * Controller to delete a category.
 * 
 * @param {Request} req - Express request object containing the category ID in params.
 * @param {Response} res - Express response object.
 * @returns {Promise<Response>} JSON response indicating success or an error message.
 */
export const remove = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedCategory = await categoriesService.removeCategory(id);
    if (!deletedCategory) {
      return res.status(404).json({ mensaje: 'Categoría no encontrada' });
    }
    return res
      .status(200)
      .json({ mensaje: `Categoría con ID ${id} eliminada exitosamente` });
  } catch (error) {
    return res.status(500).json({ mensaje: 'Error al eliminar la categoría' });
  }
};
