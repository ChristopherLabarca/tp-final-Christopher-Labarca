import bcrypt from 'bcrypt';
import * as userModel from '../models/users.model';
import jwt, { SignOptions } from 'jsonwebtoken';
import { JwtPayload, UserRole } from '../types/auth';

if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET no definido');
}

const secretKey: string = process.env.JWT_SECRET;

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
 * @returns {Promise<string>} A promise that resolves to a JWT string.
 * @throws {Error} Throws "Credenciales inválidas" if authentication fails.
 */
export const login = async (
  email: string,
  password: string
): Promise<string> => {
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
    role: user.role as UserRole,
  };

  /**
   * Configuración del token JWT
   * expiresIn: tiempo de expiración
   * issuer: emisor del token
   */
  const options: SignOptions = {
    expiresIn: (process.env.JWT_EXPIRES_IN as any) || '1h',
    issuer: 'curso-utn-backend',
  };

  /**
   * Generación del token JWT
   * Se firma el payload con el secreto y las opciones definidas
   */
  return jwt.sign(payload, secretKey, options);
};
