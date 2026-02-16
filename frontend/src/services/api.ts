/**
 * API client service for communicating with the backend
 */

import type { Category, Product, AuthResponse, Owner, CurrentUser } from '../types/index';

const API_BASE_URL = 'http://localhost:3000';

/**
 * Generic fetch wrapper with error handling
 */
async function fetchAPI<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  console.debug(`[API] ${options?.method || 'GET'} ${endpoint}`);
  if (options?.body) {
    try {
      console.debug('[API] Request body:', typeof options.body === 'string' ? options.body : JSON.stringify(options.body));
    } catch (e) {
      console.debug('[API] Request body: (unserializable)');
    }
  }
  if (options?.headers) {
    console.debug('[API] Request headers:', options.headers);
  }

  try {
    const mergedOptions: RequestInit = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(options?.headers as Record<string, string> | undefined),
      },
    };

    const response = await fetch(url, mergedOptions);

    if (!response.ok) {
      const text = await response.text().catch(() => '');
      let errorData: any = {};
      try { errorData = JSON.parse(text); } catch { errorData = { raw: text }; }
      console.error(`[API Error] ${response.status}: ${response.statusText}`, errorData);
      throw new Error(
        errorData?.message || `API error: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json() as T;
    console.debug(`[API] Success: ${endpoint}`, data);
    return data;
  } catch (error) {
    console.error(`[API] Failed to fetch ${endpoint}:`, error);
    throw error;
  }
}

/**
 * Authentication Services
 */
export const authService = {
  login: (email: string, password: string) =>
    fetchAPI<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  register: (email: string, password: string, username: string) =>
    fetchAPI<AuthResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, username }),
    }),

  logout: (token: string) =>
    fetchAPI<{ message: string }>('/auth/logout', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
    }),

  getCurrentUser: (token: string) =>
    fetchAPI<CurrentUser>('/auth/me', {
      headers: { Authorization: `Bearer ${token}` },
    }),

  updatePassword: (token: string, currentPassword: string, newPassword: string) =>
    fetchAPI<{ message: string }>('/auth/password', {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify({ currentPassword, newPassword }),
    }),
};

/**
 * Category Services
 */
export const categoryService = {
  getAll: () => fetchAPI<Category[]>('/api/categoria'),

  getById: (id: string) => fetchAPI<Category>(`/api/categoria/${id}`),

  create: (data: Partial<Category>, token: string) =>
    fetchAPI<Category>('/api/categoria', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { Authorization: `Bearer ${token}` },
    }),

  update: (id: string, data: Partial<Category>, token: string) =>
    fetchAPI<Category>(`/api/categoria/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: { Authorization: `Bearer ${token}` },
    }),

  delete: (id: string, token: string) =>
    fetchAPI<void>(`/api/categoria/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    }),
};

/**
 * Product Services
 */
export const productService = {
  getAll: () => fetchAPI<Product[]>('/api/producto'),

  getById: (id: string) => fetchAPI<Product>(`/api/producto/${id}`),

  create: (data: Partial<Product>, token: string) =>
    fetchAPI<Product>('/api/producto', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { Authorization: `Bearer ${token}` },
    }),

  update: (id: string, data: Partial<Product>, token: string) =>
    fetchAPI<Product>(`/api/producto/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: { Authorization: `Bearer ${token}` },
    }),

  delete: (id: string, token: string) =>
    fetchAPI<void>(`/api/producto/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    }),
};

/**
 * Owner Services
 */
export const ownerService = {
  getAll: () => fetchAPI<Owner[]>('/api/owner'),

  getById: (id: string) => fetchAPI<Owner>(`/api/owner/${id}`),
  create: (data: Partial<Owner>, token?: string) =>
    fetchAPI<Owner>('/api/owner', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { Authorization: token ? `Bearer ${token}` : '' },
    }),

  update: (id: string, data: Partial<Owner>, token?: string) =>
    fetchAPI<Owner>(`/api/owner/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: { Authorization: token ? `Bearer ${token}` : '' },
    }),

  delete: (id: string, token?: string) =>
    fetchAPI<void>(`/api/owner/${id}`, {
      method: 'DELETE',
      headers: { Authorization: token ? `Bearer ${token}` : '' },
    }),
};

/**
 * Pet Services
 */
export const petService = {
  getAll: () => fetchAPI<any[]>('/api/pet'),

  getByOwner: (ownerId: string) => fetchAPI<any[]>(`/api/pet/owner/${ownerId}`),

  getById: (id: string) => fetchAPI<any>(`/api/pet/${id}`),

  create: (data: any, token: string) =>
    fetchAPI<any>('/api/pet', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { Authorization: `Bearer ${token}` },
    }),

  update: (id: string, data: any, token: string) =>
    fetchAPI<any>(`/api/pet/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: { Authorization: `Bearer ${token}` },
    }),

  delete: (id: string, token: string) =>
    fetchAPI<void>(`/api/pet/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    }),
};

/**
 * Medical Record Services
 */
export const medicalRecordService = {
  getAll: (token: string) =>
    fetchAPI<any[]>('/api/medical-record', {
      headers: { Authorization: `Bearer ${token}` },
    }),

  getByPet: (petId: string, token: string) =>
    fetchAPI<any[]>(`/api/medical-record/pet/${petId}`, {
      headers: { Authorization: `Bearer ${token}` },
    }),

  getById: (id: string, token: string) =>
    fetchAPI<any>(`/api/medical-record/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    }),

  create: (data: any, token: string) =>
    fetchAPI<any>('/api/medical-record', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { Authorization: `Bearer ${token}` },
    }),

  update: (id: string, data: any, token: string) =>
    fetchAPI<any>(`/api/medical-record/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: { Authorization: `Bearer ${token}` },
    }),

  delete: (id: string, token: string) =>
    fetchAPI<void>(`/api/medical-record/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    }),
};

/**
 * User (Admin) Services
 */
export const usersService = {
  getAll: (token: string) =>
    fetchAPI<CurrentUser[]>('/api/user', {
      headers: { Authorization: `Bearer ${token}` },
    }),

  create: (data: { username: string; email: string; password: string; role: string }, token: string) =>
    fetchAPI<CurrentUser>('/api/user', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify(data),
    }),

  update: (id: string, data: Partial<{ username: string; email: string; password?: string; role: string }>, token: string) =>
    fetchAPI<CurrentUser>(`/api/user/${id}`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify(data),
    }),

  delete: (id: string, token: string) =>
    fetchAPI<{ message: string }>(`/api/user/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    }),
};

export default fetchAPI;
