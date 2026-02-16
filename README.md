# 🐾 PetCare - Sistema de Gestión Veterinaria

¡Bienvenido a **PetCare**! Un sistema completo de gestión para clínicas veterinarias modernas. Construido con React, Node.js y MongoDB.

![Version](https://img.shields.io/badge/Version-1.0.0-blue)
![License](https://img.shields.io/badge/License-UTN-green)
![Status](https://img.shields.io/badge/Status-Production%20Ready-brightgreen)

## 📌 ¿Qué es PetCare?

PetCare es una plataforma completa diseñada para simplificar la gestión de clínicas veterinarias:

- 🐾 **Gestión de Mascotas** - Registro con información y fotos automáticas por raza
- 👤 **Gestión de Dueños** - Control de información de propietarios
- 👨‍⚕️ **Gestión de Personal** - Veterinarios y recepcionistas
- 📋 **Historiales Médicos** - Registro de diagnósticos y tratamientos
- 🖼️ **Gestión de Imágenes** - Organiza y guarda fotos de mascotas y personal
- 🔐 **Control de Acceso** - Roles y permisos (Admin, Veterinario, Recepcionista)

## 🎯 Características Principales

✅ **Interfaz moderna y responsive** - Funciona en PC, tablet y móvil  
✅ **Autenticación JWT segura** - Tokens de 24 horas  
✅ **Imágenes automáticas de razas** - Integración con APIs de perros y gatos  
✅ **Base de datos MongoDB** - Persistencia confiable  
✅ **TypeScript completo** - Código seguro y mantenible  
✅ **Validaciones de datos** - Integridad garantizada  
✅ **Notificaciones en tiempo real** - Toasts amigables  
✅ **Totalmente documentado** - JSDoc en todo el código  

## 🏗️ Arquitectura

El proyecto está dividido en dos partes principales:

```
PetCare/
├── 🔵 Backend (Node.js + Express)
│   ├── API REST con autenticación
│   ├── Gestión de base de datos MongoDB
│   └── Imágenes automáticas de razas
│
├── 🟦 Frontend (React + TypeScript)
│   ├── Interfaz web moderna
│   ├── Gestión de imágenes locales
│   └── Sistema de notificaciones
│
└── 📦 Base de Datos (MongoDB Atlas)
    ├── Usuarios
    ├── Mascotas
    ├── Dueños
    └── Historiales Médicos
```

## 📋 Requisitos del Sistema

### Requisitos Básicos (Todos)
- **Node.js v16+** - [Descargar](https://nodejs.org/)
- **npm v8+** (incluido con Node.js)
- **Git** (opcional) - [Descargar](https://git-scm.com/)

### Para el Backend
- **MongoDB** (elige una opción):
  - 🌐 **MongoDB Atlas** (recomendado, gratis) - [Crear cuenta](https://www.mongodb.com/cloud/atlas)
  - 🖥️ **MongoDB Local** - [Descargar](https://www.mongodb.com/try/download/community)
  - 🐳 **Docker** - `docker run -d -p 27017:27017 mongo`

## 🚀 Guía de Inicio Rápido

### Opción 1: Para los Apurados ⚡

```bash
# 1. Clone o descomprima el proyecto
cd PetCare

# 2. Backend (Terminal 1)
cd backend
npm install
# Crea .env con tu MONGODB_URI
npm run dev

# 3. Frontend (Terminal 2)
cd frontend
npm install
npm run dev

# 4. Abre en el navegador: http://localhost:5174
# Login: admin@example.com / admin1234
```

### Opción 2: Guía Detallada Paso a Paso

#### Paso 1: Preparar Backend

```bash
cd backend

# Instalar dependencias
npm install

# Crear archivo .env
# En Windows:
copy backend-stock-mongo\README.md  # Ve ahí para ver el .env.example
# En macOS/Linux:
cp backend-stock-mongo/config/.env.example .env

# Edita .env y agrega tu MONGODB_URI
# Ejemplo:
# PORT=3000
# MONGODB_URI=mongodb+srv://USER:PASS@cluster.mongodb.net/petcare_db
# JWT_SECRET=supersecretkey123
# JWT_EXPIRES_IN=24h

# Inicia el backend
npm run dev
# Deberías ver: Server is running on http://localhost:3000 ✅
```

#### Paso 2: Preparar Frontend

En **otra terminal**:

```bash
cd frontend

# Instalar dependencias
npm install

# Inicia el servidor de desarrollo
npm run dev
# Deberías ver: Local: http://localhost:5174/
```

#### Paso 3: Acceder a la Aplicación

Abre tu navegador en: **http://localhost:5174**

**Credenciales de prueba:**

| Email | Contraseña | Rol |
|-------|-----------|-----|
| `admin@example.com` | `admin1234` | Admin |
| `vet@example.com` | `vet1234` | Veterinario |
| `recepcion@example.com` | `recep1234` | Recepcionista |

## 📚 Documentación Detallada

Para información más detallada, consulta:

- **Backend:** [Backend README](backend/backend-stock-mongo/README.md)
  - Configuración de MongoDB
  - Endpoints de la API
  - Manejo de errores
  - Solución de problemas

- **Frontend:** [Frontend README](frontend/README.md)
  - Cómo usar la interfaz
  - Gestión de imágenes
  - Características detalladas
  - Solución de problemas

## 💻 Comandos Disponibles

### Backend

```bash
cd backend

# Desarrollo (con recarga automática)
npm run dev

# Construcción para producción
npm run build

# Iniciar en producción
npm start
```

### Frontend

```bash
cd frontend

# Desarrollo (con recarga automática)
npm run dev

# Verificar tipos TypeScript
npm run type-check

# Verificar código
npm run lint

# Construcción para producción
npm run build

# Previsualizar build
npm run preview

# Iniciar servidor de producción
npm start
```

## 🔍 Guía de Uso Rápida

### Para Admins

1. **Ir a PetCare** → Inicia sesión como `admin@example.com`
2. **Gestionar Mascotas** → Ver, crear, editar y eliminar
3. **Gestionar Dueños** → Control completo de propietarios
4. **Gestionar Personnel** → Veterinarios y recepcionistas
5. **Imágenes** → Configración → Imagen → Carga y organiza fotos
6. **Historiales** → Ver registros médicos de mascotas

### Para Veterinarios

1. **Ver Mascotas** → Lista completa disponible
2. **Historiales Médicos** → Crear y ver registros médicos
3. **Ver Dueños** → Información de propietarios

### Para Recepcionistas

1. **Ver Mascotas** → Acceso de lectura
2. **Ver Dueños** → Acceso de lectura
3. **Ver Historiales** → Acceso de lectura

## 🐛 Solución Rápida de Problemas

### Backend no inicia

```bash
# Asegurate de tener Node.js
node --version  # Debe ser v16+

# Reinstala dependencias
rm -rf node_modules package-lock.json
npm install

# Verifica MongoDB
# Si usas Atlas: verifica el MONGODB_URI
# Si usas local: asegúrate que mongod esté corriendo
```

### Frontend no conecta al backend

```bash
# Verifica que backend esté en puerto 3000
# Recarga el navegador: Ctrl+F5 (limpia caché)
# Abre Developer Tools: F12 → Console
# Verifica que no haya errores de conexión
```

### Error de Login

- Verifica email y contraseña exactos
- Mayúsculas/minúsculas importan
- Intenta: `admin@example.com` con `admin1234`

### Puerto ya en uso

```bash
# Backend (cambiar puerto)
PORT=3001 npm run dev

# Frontend (cambiar puerto)
npm run dev -- --port 5175
```

## 📁 Estructura del Proyecto

```
PetCare/
├── backend/
│   ├── src/
│   │   ├── controllers/      # Lógica de negocio
│   │   ├── services/         # Servicios (incluye imágenes de razas)
│   │   ├── models/           # Esquemas MongoDB
│   │   ├── routes/           # Definición de rutas
│   │   ├── middlewares/      # Autenticación y validación
│   │   ├── types/            # Tipos TypeScript
│   │   ├── config/           # Configuración
│   │   └── validators/       # Validación de datos
│   ├── package.json
│   └── README.md             # Documentación Backend
│
├── frontend/
│   ├── src/
│   │   ├── components/       # Componentes React
│   │   ├── services/         # Cliente API
│   │   ├── types/            # Tipos TypeScript
│   │   ├── App.tsx           # Componente principal
│   │   └── main.tsx          # Punto de entrada
│   ├── public/               # Archivos estáticos
│   ├── package.json
│   └── README.md             # Documentación Frontend
│
├── mock/                     # Datos de ejemplo
└── README.md                 # Este archivo
```

## 🛠️ Tecnologías Utilizadas

### Backend
- **Express.js** - Framework web
- **Node.js** - Runtime de JavaScript
- **MongoDB + Mongoose** - Base de datos NoSQL
- **TypeScript** - Tipado estático
- **JWT** - Autenticación segura
- **bcrypt** - Hash de contraseñas

### Frontend
- **React 18+** - Framework de UI
- **TypeScript** - Tipado estático
- **Vite** - Bundler ultra rápido
- **Tailwind CSS** - Estilos modernos
- **Fetch API** - Comunicación con backend

## 🔐 Seguridad

- ✅ Contraseñas hasheadas con bcrypt
- ✅ Autenticación con JWT (24 horas)
- ✅ Validación de inputs en frontend y backend
- ✅ Control de acceso basado en roles
- ✅ Variables de entorno para datos sensibles
- ✅ CORS configurado apropiadamente

## 📊 Base de Datos

### Colecciones

- **users** - Usuarios del sistema
- **owners** - Dueños de mascotas
- **pets** - Mascotas registradas
- **medical_records** - Historiales clínicos

### Relaciones

```
Usuarios (1) → Muchas Mascotas
Dueños (1) → Muchas Mascotas
Mascotas (1) → Muchos Historiales
```

## 🚢 Deployment (Producción)

### Backend a Vercel/Render
1. Sube a GitHub
2. Conecta repo con Vercel/Render
3. Configura variables de entorno
4. Deploy automático

### Frontend a Vercel/Netlify
1. Ejecuta: `npm run build`
2. Sube carpeta `dist` a Netlify
3. Configura redirecciones (para SPA)

**Más detalles:** Ver READMEs individuales

## 🤝 Contribuir

Este es un proyecto educativo desarrollado para UTN. Las contribuciones son bienvenidas:

1. Fork el proyecto
2. Crea una rama (`git checkout -b feature/AmazingFeature`)
3. Comitea cambios (`git commit -m 'Add AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## ❌ Problemas Comunes Solucionados

| Problema | Solución |
|----------|----------|
| "Cannot find module" | `npm install` |
| MongoDB connection refused | Verifica MONGODB_URI en .env |
| Port already in use | Usa otro puerto con flag `--port` |
| Frontend no ve backend | Recarga con Ctrl+F5 |
| Token expired | Cierra sesión y vuelve a iniciar |
| Imágenes no cargan | Revisa caché (Ctrl+Shift+Del) |

## 📞 Soporte

- 📖 Lee los READMEs detallados primero
- 🐞 Abre browser console (F12) para ver errores
- 📧 Contacta al equipo de desarrollo
- 💬 Revisa los logs del servidor

## 📝 Notas de Versión

### v1.0.0 (Actual)
- ✅ CRUD completo de mascotas, dueños, historiales
- ✅ Autenticación JWT con roles
- ✅ Gestión de imágenes automáticas y personalizadas
- ✅ Interfaz responsive
- ✅ TypeScript en todo el código
- ✅ Documentación completa

## 📄 Licencia

Proyecto desarrollado para **UTN - Universidad Tecnológica Nacional** como trabajo final.

## 👨‍💼 Equipo

Desarrollado por: **Christopher Labarca**

---

## 🎉 ¡Listo para Empezar!

Sigue la **Guía de Inicio Rápido** arriba y tendrás PetCare funcionando en minutos.

### Primeros Pasos:

1. **Lee este README** ← Estás aquí 👈
2. **Sigue guía de inicio** - Fase backend + frontend
3. **Lee documentación detallada** - `backend/README.md` y `frontend/README.md`
4. **Experimenta** - Crea mascotas, dueños, historiales
5. **Personaliza** - Agrega tus propias características

---

**¡Disfruta usando PetCare! 🐾**

Para más ayuda, consulta los READMEs específicos:
- [Backend Documentation](backend/backend-stock-mongo/README.md)
- [Frontend Documentation](frontend/README.md)
