"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const petSchema = new mongoose_1.Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre de la mascota es requerido'],
        trim: true,
        minlength: [2, 'El nombre debe tener al menos 2 caracteres'],
    },
    especie: {
        type: String,
        required: [true, 'La especie es requerida'],
        enum: ['Perro', 'Gato', 'Conejo', 'Pajaro', 'Reptil', 'Otro'],
    },
    raza: {
        type: String,
        required: [true, 'La raza es requerida'],
        trim: true,
    },
    peso: {
        type: Number,
        required: [true, 'El peso es requerido'],
        min: [0.1, 'El peso debe ser mayor a 0'],
    },
    fecha_nacimiento: {
        type: Date,
        required: [true, 'La fecha de nacimiento es requerida'],
    },
    ownerId: {
        type: String,
        required: [true, 'El ID del propietario es requerido'],
    },
    imagen_url: {
        type: String,
        default: 'https://via.placeholder.com/200?text=Mascota',
    },
    microchip: {
        type: String,
        sparse: true,
    },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('Pet', petSchema);
