"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.update = exports.create = exports.getById = exports.getAll = void 0;
const categoriesService = __importStar(require("../services/categories.service"));
// getAll()
/**
 * Controller to get all categories.
 *
 * @param {Request} _req - Express request object.
 * @param {Response} res - Express response object.
 * @returns {Promise<Response>} JSON response with an array of categories or an error message.
 */
const getAll = async (_req, res) => {
    try {
        const categories = await categoriesService.getAllCategory();
        return res.status(200).json(categories);
    }
    catch (error) {
        return res.status(500).json({ mensaje: 'Error al obtener las categorías' });
    }
};
exports.getAll = getAll;
// getById()
/**
 * Controller to get a category by its ID.
 *
 * @param {Request} req - Express request object containing the category ID in params.
 * @param {Response} res - Express response object.
 * @returns {Promise<Response>} JSON response with the category data or an error message.
 */
const getById = async (req, res) => {
    const { id } = req.params;
    try {
        const category = await categoriesService.getCategoryById(id);
        if (!category) {
            return res.status(404).json({ mensaje: 'Categoría no encontrada' });
        }
        return res.status(200).json(category);
    }
    catch (error) {
        return res
            .status(500)
            .json({ mensaje: `Error al obtener la categoría ${id}` });
    }
};
exports.getById = getById;
// create()
/**
 * Controller to create a new category.
 *
 * @param {Request} req - Express request object containing category data in body.
 * @param {Response} res - Express response object.
 * @returns {Promise<Response>} JSON response with the created category or an error message.
 */
const create = async (req, res) => {
    try {
        const categoryData = req.body;
        console.log('categoryData', categoryData);
        console.log('Datos recibidos para crear categoría:', categoryData);
        const newCategory = await categoriesService.createCategory(categoryData);
        return res.status(201).json(newCategory);
    }
    catch (error) {
        return res.status(500).json({ mensaje: 'Error al crear la categoría' });
    }
};
exports.create = create;
// update()
/**
 * Controller to update an existing category.
 *
 * @param {Request} req - Express request object containing the category ID in params and updated data in body.
 * @param {Response} res - Express response object.
 * @returns {Promise<Response>} JSON response with the updated category or an error message.
 */
const update = async (req, res) => {
    try {
        const { id } = req.params;
        const categoryData = req.body;
        const updatedCategory = await categoriesService.updateCategory(id, categoryData);
        if (!updatedCategory) {
            return res.status(404).json({ mensaje: 'Categoría no encontrada' });
        }
        return res.status(200).json(updatedCategory);
    }
    catch (error) {
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
exports.update = update;
// remove ()
/**
 * Controller to delete a category.
 *
 * @param {Request} req - Express request object containing the category ID in params.
 * @param {Response} res - Express response object.
 * @returns {Promise<Response>} JSON response indicating success or an error message.
 */
const remove = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedCategory = await categoriesService.removeCategory(id);
        if (!deletedCategory) {
            return res.status(404).json({ mensaje: 'Categoría no encontrada' });
        }
        return res
            .status(200)
            .json({ mensaje: `Categoría con ID ${id} eliminada exitosamente` });
    }
    catch (error) {
        return res.status(500).json({ mensaje: 'Error al eliminar la categoría' });
    }
};
exports.remove = remove;
