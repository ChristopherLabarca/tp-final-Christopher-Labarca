export interface Client {
  id: number;
  nombre: string;
  telefono: string;
  email: string;
  direccion: string;
}

export interface Pet {
  id: number;
  nombre: string;
  especie: string;
  raza: string;
  peso: string;
  fecha_nacimiento: string;
  cliente_id: number;
}

export interface MedicalRecord {
  id: number;
  mascota_id: number;
  fecha: string;
  hora: string;
  diagnostico: string;
  tratamiento: string;
}

/**
 * Backend API Types
 */

export interface Category {
  _id: string;
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Product {
  _id: string;
  name: string;
  description?: string;
  price: number;
  stock: number;
  categoryId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Owner {
  _id: string;
  nombre: string;
  telefono: string;
  email: string;
  direccion: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    username: string;
    email: string;
    role: UserRole;
  };
}

export type UserRole = 'admin' | 'veterinario' | 'recepcionista';

export interface CurrentUser {
  id: string;
  username: string;
  email: string;
  role: UserRole;
}

export interface UserItem {
  id: string;
  username: string;
  email: string;
  role: UserRole;
}
