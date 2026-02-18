# 🐾 PetCare - Backend API

¡Bienvenido! Este es el servidor backend de **PetCare**, una plataforma completa de gestión de clínica veterinaria. Aquí se gestionan usuarios, mascotas, dueños e historiales médicos con autenticación segura y control de acceso basado en roles.

## 📌 ¿Qué es PetCare?

PetCare es un sistema veterinario que permite:
- 👤 **Gestionar usuarios** con diferentes roles (Admin, Veterinario, Recepcionista)
 - 🐾 **Registrar mascotas** con información sobre raza y especie
- 👥 **Administrar dueños** de mascotas
- 📋 **Crear historiales médicos** con diagnósticos, tratamientos y horarios

## 🚀 Características Principales

- ✅ **Autenticación JWT segura** (tokens de 24 horas)
- ✅ **Control de acceso por roles** (ADMIN, VETERINARIO, RECEPCIONISTA)
- ✅ **Imágenes automáticas de razas** (integración con APIs de perros y gatos)
 - ✅ (Funcionalidad de imágenes eliminada)
- ✅ **Validaciones completas** de datos entrada
- ✅ **Manejo centralizado de errores** 
- ✅ **Base de datos MongoDB** con Mongoose
- ✅ **Código TypeScript** para mayor seguridad
- ✅ **Documentación JSDoc** completa

## 🛠️ Tecnologías

| Tecnología | Propósito |
|-----------|----------|
| [Node.js](https://nodejs.org/) | Runtime de JavaScript |
| [Express](https://expressjs.com/) | Framework web |
| [MongoDB](https://www.mongodb.com/) | Base de datos NoSQL |
| [Mongoose](https://mongoosejs.com/) | ODM para MongoDB |
| [TypeScript](https://www.typescriptlang.org/) | Tipado estático |
| [JWT](https://jwt.io/) | Autenticación segura |
| [bcrypt](https://www.npmjs.com/package/bcrypt) | Hash de contraseñas |

## 📋 Requisitos Previos

Antes de empezar, asegúrate de tener:

- **Node.js v16+** - [Descargar aquí](https://nodejs.org/)
  - Verificar: `node --version`
- **npm v8+** (incluido con Node.js)
  - Verificar: `npm --version`
- **MongoDB** - Puedes usar:
  - 🔗 **MongoDB Atlas** (gratis, en la nube) - [Crear cuenta](https://www.mongodb.com/cloud/atlas)
  - 🖥️ **MongoDB local** - [Descargar aquí](https://www.mongodb.com/try/download/community)
  - 🐳 **Docker** - `docker run -d -p 27017:27017 --name mongodb mongo`

## ⚙️ Instalación Paso a Paso

### 1️⃣ Descargar el proyecto

```bash
# Si tienes Git
git clone <URL_DEL_REPOSITORIO>
cd backend

# O descargalo como ZIP y descomprimelo
cd backend
```

### 2️⃣ Instalar dependencias

```bash
npm install
```

### 3️⃣ Configurar variables de entorno

Crea un archivo `.env` en la carpeta `backend/`:

```env
# Puerto donde correrá el servidor
PORT=3000

# MongoDB Connection String
# Opción 1: Conexión local
MONGODB_URI=mongodb://localhost:27017/petcare_db

# Opción 2: MongoDB Atlas (reemplaza USER, PASSWORD y CLUSTER)
# MONGODB_URI=mongodb+srv://USER:PASSWORD@CLUSTER.mongodb.net/petcare_db?retryWrites=true&w=majority

# JWT Configuration
JWT_SECRET=tu_secreto_super_seguro_1234567890
JWT_EXPIRES_IN=24h
```

### 4️⃣ Verificar que MongoDB esté corriendo

```bash
# Si usas MongoDB local, abre otra terminal:
mongod

# Si usas Docker:
docker start mongodb
```

## 🚀 Ejecutar la Aplicación

### En Desarrollo (con recarga automática)

```bash
npm run dev
```

Verás algo como:
```
Server is running on http://localhost:3000
```

### En Producción

```bash
npm run build
npm start
```

## 📚 Guía de Uso de la API

### 🔐 1. Autenticación - Obtener Token

Primero, debes registrarte o iniciar sesión:

```bash
# REGISTRAR nuevo usuario
POST http://localhost:3000/api/auth/register
Content-Type: application/json

{
  "email": "admin@example.com",
  "password": "admin1234"
}
```

**Respuesta exitosa:**
```json
{
  "message": "Usuario creado exitosamente",
  "user": {
    "_id": "123abc",
    "email": "admin@example.com",
    "rol": "ADMIN"
  }
}
```

```bash
# INICIAR SESIÓN (Login)
POST http://localhost:3000/api/auth/login
Content-Type: application/json

{
  "email": "admin@example.com",
  "password": "admin1234"
}
```

**Respuesta exitosa:**
```json
{
  "message": "Inicio de sesión exitoso",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "123abc",
    "email": "admin@example.com",
    "rol": "ADMIN"
  }
}
```

**⚠️ Guarda el `token` - lo necesitarás para el resto de peticiones**

### 🐾 2. Mascotas (Pets)

```bash
# OBTENER todas las mascotas
GET http://localhost:3000/api/pet
Authorization: Bearer tu_token_aqui

# CREAR nueva mascota
POST http://localhost:3000/api/pet
Authorization: Bearer tu_token_aqui
Content-Type: application/json

{
  "nombre": "Luna",
  "especie": "Perro",
  "raza": "Golden Retriever",
  "edad": 3,
  "peso": 25.5,
  "dueno_id": "ID_DEL_DUENO"
}
# Nota: La generación automática de imágenes fue removida del proyecto

# ACTUALIZAR mascota
PUT http://localhost:3000/api/pet/:id
Authorization: Bearer tu_token_aqui
Content-Type: application/json

{
  "nombre": "Luna Updated",
  "peso": 26
}

# ELIMINAR mascota
DELETE http://localhost:3000/api/pet/:id
Authorization: Bearer tu_token_aqui
```

### 👥 3. Dueños (Owners)

```bash
# OBTENER todos los dueños
GET http://localhost:3000/api/owner
Authorization: Bearer tu_token_aqui

# CREAR nuevo dueño
POST http://localhost:3000/api/owner
Authorization: Bearer tu_token_aqui
Content-Type: application/json

{
  "nombre": "Juan Pérez",
  "email": "juan@example.com",
  "telefono": "555-1234",
  "direccion": "Calle Principal 123"
}

# ACTUALIZAR dueño
PUT http://localhost:3000/api/owner/:id
Authorization: Bearer tu_token_aqui

# ELIMINAR dueño
DELETE http://localhost:3000/api/owner/:id
Authorization: Bearer tu_token_aqui
```

### 📋 4. Historiales Médicos (Medical Records)

```bash
# OBTENER historiales
GET http://localhost:3000/api/medical-record
Authorization: Bearer tu_token_aqui

# CREAR historial médico
POST http://localhost:3000/api/medical-record
Authorization: Bearer tu_token_aqui
Content-Type: application/json

{
  "pet_id": "ID_DE_MASCOTA",
  "fecha": "2026-02-16",
  "hora": "14:30",
  "diagnostico": "Revisión de rutina",
  "tratamiento": "Vacunas actualizadas"
}

# ACTUALIZAR historial
PUT http://localhost:3000/api/medical-record/:id
Authorization: Bearer tu_token_aqui

# ELIMINAR historial
DELETE http://localhost:3000/api/medical-record/:id
Authorization: Bearer tu_token_aqui
```

## 🧪 Probar con Insomnia

Se incluye una colección de Insomnia con todos los endpoints configurados:

1. Descarga [Insomnia](https://insomnia.rest/)
2. Abre Insomnia → Click en **Import**
3. Busca `Insomnia_2026-01-27.yaml` en la carpeta `backend/`
4. Haz click en el botón **Login** primero para obtener el token
5. El token se guardará automáticamente y usarás en los demás requests

## 🔑 Credenciales de Prueba

Cuando inicies el servidor por primera vez, se crean estos usuarios automáticamente:

| Email | Contraseña | Rol |
|-------|-----------|-----|
| admin@example.com | admin1234 | ADMIN |
| vet@example.com | vet1234 | VETERINARIO |
| recepcion@example.com | recep1234 | RECEPCIONISTA |

## ❌ Solución de Problemas

### Error: "Cannot find module 'express'"
```bash
npm install
```

### Error: "connect ECONNREFUSED" (MongoDB)
- Verifica que MongoDB esté corriendo
- Revisa tu `MONGODB_URI` en `.env`
- Si usas MongoDB Atlas, asegúrate de agregar tu IP a la whitelist

### Error: "PORT 3000 already in use"
```bash
# Usa otro puerto
PORT=3001 npm run dev

# O mata el proceso que usa 3000
# Windows: netstat -ano | findstr :3000
# macOS/Linux: lsof -i :3000
```

### Error: "Invalid token" o "Unauthorized"
- Verifica que incluyas el header `Authorization: Bearer TOKEN`
- Asegúrate que el token no haya expirado (válido por 24 horas)

### Notas sobre imágenes
La funcionalidad de imágenes fue retirada del proyecto; ya no depende de APIs externas.

## 📄 Documentación Adicional

- 📖 [Express Docs](https://expressjs.com/docs/)
- 🗄️ [MongoDB Docs](https://docs.mongodb.com/)
- 🔐 [JWT Docs](https://jwt.io/introduction)
- 🎯 [TypeScript Docs](https://www.typescriptlang.org/docs/)

## 📝 Licencia

Proyecto desarrollado para UTN como trabajo final.

---

## ❓ ¿Necesitas ayuda?

- 📧 Contacta al equipo de desarrollo
- 🐛 Reporta bugs en el repositorio
- 💬 Revisa los logs del servidor para más detalles
Este proyecto es para fines educativos.
