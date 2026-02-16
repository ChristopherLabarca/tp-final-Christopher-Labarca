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
exports.deleteProduct = exports.updateProduct = exports.getProductById = exports.getAllProducts = exports.createProduct = void 0;
const productService = __importStar(require("../services/product.service"));
/**
 * Controller to create a new product.
 *
 * @param {Request} req - Express request object containing product data in body.
 * @param {Response} res - Express response object.
 * @returns {Promise<Response>} JSON response with the created product or an error message.
 */
const createProduct = async (req, res) => {
    try {
        console.log('createProduct');
        // validations de lo que viene este correcto
        const productData = req.body;
        console.log(productData);
        const product = await productService.createProduct(productData);
        return res.status(201).json(product);
    }
    catch (error) {
        console.log(error);
        if (error.code === 11000) {
            return res.status(400).json('duplicate key error');
        }
        return res.status(500).json('algo paso :(');
    }
};
exports.createProduct = createProduct;
/**
 * Controller to get all products.
 *
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @returns {Promise<Response>} JSON response with an array of products or an error message.
 */
const getAllProducts = async (req, res) => {
    try {
        console.log('getAllProducts');
        const product = await productService.getAllProducts();
        return res.status(200).json(product);
    }
    catch (error) {
        return res.status(500).json({ error: 'Error al obtener productos' });
    }
};
exports.getAllProducts = getAllProducts;
/**
 * Controller to get a product by its ID.
 *
 * @param {Request} req - Express request object containing the product ID in params.
 * @param {Response} res - Express response object.
 * @returns {Promise<Response>} JSON response with the product data or an error message.
 */
const getProductById = async (req, res) => {
    const id = req.params.id;
    try {
        console.log('getProductById');
        console.log(req.params);
        const product = await productService.getProductById(id);
        if (!product) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        return res.status(200).json(product);
    }
    catch (error) {
        return res
            .status(500)
            .json({ error: `Error al obtener el producto ${id}` });
    }
};
exports.getProductById = getProductById;
/**
 * Controller to update an existing product.
 *
 * @param {Request} req - Express request object containing the product ID in params and updated data in body.
 * @param {Response} res - Express response object.
 * @returns {Promise<Response>} JSON response with the updated product or an error message.
 */
const updateProduct = async (req, res) => {
    const id = req.params.id;
    try {
        console.log('updateProduct');
        // validations de lo que viene este correcto
        const productData = req.body;
        const product = await productService.updateProduct(id, productData);
        if (!product) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        return res.status(200).json(product);
    }
    catch (error) {
        return res
            .status(400)
            .json({ error: `Error al actualizar el producto ${id}` });
    }
};
exports.updateProduct = updateProduct;
/**
 * Controller to delete a product.
 *
 * @param {Request} req - Express request object containing the product ID in params.
 * @param {Response} res - Express response object.
 * @returns {Promise<Response>} JSON response indicating success or an error message.
 */
const deleteProduct = async (req, res) => {
    const id = req.params.id;
    try {
        console.log('deleteProduct');
        const product = await productService.deleteProduct(id);
        if (!product) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        return res.status(200).json({ message: 'Producto eliminado!' });
    }
    catch (error) {
        return res
            .status(500)
            .json({ error: `Error al eliminar el producto ${id}` });
    }
};
exports.deleteProduct = deleteProduct;
