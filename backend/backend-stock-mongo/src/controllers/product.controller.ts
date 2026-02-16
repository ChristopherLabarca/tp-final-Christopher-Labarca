import { Request, Response } from 'express';
import * as productService from '../services/product.service';
import { IProduct, Product } from '../models/products.model';

/**
 * Controller to create a new product.
 * 
 * @param {Request} req - Express request object containing product data in body.
 * @param {Response} res - Express response object.
 * @returns {Promise<Response>} JSON response with the created product or an error message.
 */
export const createProduct = async (req: Request, res: Response) => {
  try {
    console.log('createProduct');

    // validations de lo que viene este correcto

    const productData: IProduct = req.body;

    console.log(productData);

    const product = await productService.createProduct(productData);
    return res.status(201).json(product);
  } catch (error: any) {
    console.log(error);
    if (error.code === 11000) {
      return res.status(400).json('duplicate key error');
    }
    return res.status(500).json('algo paso :(');
  }
};

/**
 * Controller to get all products.
 * 
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @returns {Promise<Response>} JSON response with an array of products or an error message.
 */
export const getAllProducts = async (req: Request, res: Response) => {
  try {
    console.log('getAllProducts');

    const product = await productService.getAllProducts();

    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({ error: 'Error al obtener productos' });
  }
};

/**
 * Controller to get a product by its ID.
 * 
 * @param {Request} req - Express request object containing the product ID in params.
 * @param {Response} res - Express response object.
 * @returns {Promise<Response>} JSON response with the product data or an error message.
 */
export const getProductById = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    console.log('getProductById');
    console.log(req.params);

    const product = await productService.getProductById(id);

    if (!product) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    return res.status(200).json(product);
  } catch (error) {
    return res
      .status(500)
      .json({ error: `Error al obtener el producto ${id}` });
  }
};

/**
 * Controller to update an existing product.
 * 
 * @param {Request} req - Express request object containing the product ID in params and updated data in body.
 * @param {Response} res - Express response object.
 * @returns {Promise<Response>} JSON response with the updated product or an error message.
 */
export const updateProduct = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    console.log('updateProduct');

    // validations de lo que viene este correcto

    const productData: IProduct = req.body;

    const product = await productService.updateProduct(id, productData);

    if (!product) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    return res.status(200).json(product);
  } catch (error) {
    return res
      .status(400)
      .json({ error: `Error al actualizar el producto ${id}` });
  }
};

/**
 * Controller to delete a product.
 * 
 * @param {Request} req - Express request object containing the product ID in params.
 * @param {Response} res - Express response object.
 * @returns {Promise<Response>} JSON response indicating success or an error message.
 */
export const deleteProduct = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    console.log('deleteProduct');

    const product = await productService.deleteProduct(id);

    if (!product) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    return res.status(200).json({ message: 'Producto eliminado!' });
  } catch (error) {
    return res
      .status(500)
      .json({ error: `Error al eliminar el producto ${id}` });
  }
};
