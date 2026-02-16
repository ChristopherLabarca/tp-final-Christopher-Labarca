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
  imagen_url: string;
}

export interface MedicalRecord {
  id: number;
  mascota_id: number;
  fecha: string;
  hora: string;
  diagnostico: string;
  tratamiento: string;
}
