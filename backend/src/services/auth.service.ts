import bcrypt from 'bcrypt';
import * as userModel from '../models/users.model';
import jwt, { SignOptions } from 'jsonwebtoken';
import { JwtPayload, UserRole } from '../types/auth';

if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET no definido');
}

const secretKey: string = process.env.JWT_SECRET;

export interface LoginResponse {
  token: string;
  user: {
    id: string;
    username: string;
    email: string;
    role: UserRole;
  };
}

/**
 * Registers a new user by hashing their password and saving them to the database.
 * 
 * @param {string} username - The username for the new user.
 * @param {string} email - The email address for the new user.
 * @param {string} password - The plain text password to be hashed.
 * @returns {Promise<string>} A promise that resolves to the newly created user's ID.
 */
export const register = async (
  username: string,
  email: string,
  password: string
): Promise<string> => {
  const hashedPassword = await bcrypt.hash(password, 10);

  const userId = await userModel.createUser({
    username,
    email,
    password: hashedPassword,
  });

  return userId;
};

/**
 * Authenticates a user with their email and password, returning a JWT if successful.
 * 
 * @param {string} email - The user's email address.
 * @param {string} password - The user's plain text password.
 * @returns {Promise<LoginResponse>} A promise that resolves to a response with token and user data.
 * @throws {Error} Throws "Credenciales inválidas" if authentication fails.
 */
export const login = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  const invalidCredentialsError = new Error('Credenciales inválidas');

  const user = await userModel.findUser(email);
  if (!user) throw invalidCredentialsError;

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) throw invalidCredentialsError;

  /**
   * Payload del token JWT
   * Contiene la información básica del usuario
   */
  const payload: JwtPayload = {
    id: user.id,
    username: user.username,
    email: user.email,
    role: user.role as UserRole,
  };

  /**
   * Configuración del token JWT
   * expiresIn: tiempo de expiración
   * issuer: emisor del token
   */
  const options: SignOptions = {
    expiresIn: (process.env.JWT_EXPIRES_IN as any) || '24h',
    issuer: 'curso-utn-backend',
  };

  /**
   * Generación del token JWT
   * Se firma el payload con el secreto y las opciones definidas
   */
  const token = jwt.sign(payload, secretKey, options);

  return {
    token,
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role as UserRole,
    },
  };
};

/**
 * Updates a user's password
 * 
 * @param {string} userId - The ID of the user to update
 * @param {string} currentPassword - The user's current password
 * @param {string} newPassword - The new password
 * @returns {Promise<void>}
 * @throws {Error} If current password is invalid
 */
export const updatePassword = async (
  userId: string,
  currentPassword: string,
  newPassword: string
): Promise<void> => {
  const user = await userModel.User.findById(userId);
  if (!user) throw new Error('Usuario no encontrado');

  const isValid = await bcrypt.compare(currentPassword, user.password);
  if (!isValid) throw new Error('Contraseña actual incorrecta');

  user.password = await bcrypt.hash(newPassword, 10);
  await user.save();
};
