import { Request } from 'express';

/**
 * Extracts the Bearer token from the Authorization header.
 * 
 * @param {Request} req - Express request object.
 * @returns {string | undefined} The extracted token, or undefined if not present.
 */
export const extractBearerToken = (req: Request): string | undefined =>
  req.headers.authorization?.split(' ')[1];
