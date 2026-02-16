export interface JwtPayload {
  //jsonwebtoken Payload personalizado
  id: string;
  username: string;
  email: string;
  role: UserRole;
}

export enum UserRole {
  ADMIN = 'admin',
  VETERINARIO = 'veterinario',
  RECEPCIONISTA = 'recepcionista',
}
