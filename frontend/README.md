# 🐾 PetCare - Frontend

¡Bienvenido a **PetCare**! Esta es la interfaz web de la plataforma de gestión de clínica veterinaria. Una aplicación moderna y fácil de usar para administrar mascotas, dueños, veterinarios y historiales médicos.

## 📌 ¿Qué es PetCare?

PetCare es un sistema completo de gestión veterinaria donde puedes:
- 🏥 **Registrar mascotas** con información y fotos automáticas por raza
- 👤 **Administrar dueños** de mascotas
- 👨‍⚕️ **Gestionar veterinarios y recepcionistas**
- 📋 **Crear historiales médicos** con diagnósticos y tratamientos
- 🔐 **Control de acceso** basado en roles (Admin, Veterinario, Recepcionista)

## 🛠️ Tecnologías

| Tecnología | Propósito |
|-----------|----------|
| [React 18+](https://react.dev/) | Framework de UI |
| [TypeScript](https://www.typescriptlang.org/) | Tipado estático |
| [Vite](https://vitejs.dev/) | Bundler rápido |
| [Tailwind CSS](https://tailwindcss.com/) | Estilos CSS |

## 📋 Requisitos Previos

Antes de empezar necesitas:

- **Node.js v16+** - [Descargar aquí](https://nodejs.org/)
  - Verificar: `node --version`
- **npm v8+** (incluido con Node.js)
  - Verificar: `npm --version`  
- **Backend corriendo** en `http://localhost:3000`
  - Para instrucciones, ve a `backend/README.md`

## ⚙️ Instalación Paso a Paso

### 1️⃣ Descargar el proyecto

```bash
# Si tiene Git
git clone <URL_DEL_REPOSITORIO>
cd frontend

# O descomprime el ZIP
cd frontend
```

### 2️⃣ Instalar dependencias

```bash
npm install
```

Esto descargará todos los packages necesarios (React, Vite, Tailwind, etc.)

### 3️⃣ Verificar que el backend esté corriendo

Abre otra terminal y asegúrate de que el backend está activo:

```bash
cd backend
npm run dev
# Deberías ver: Server is running on http://localhost:3000
```

## 🚀 Ejecutar la Aplicación

### En Desarrollo (con recarga automática)

```bash
npm run dev
```

Verás algo como:
```
  VITE v7.3.1 ready in 345 ms

  ➜  Local:   http://localhost:5174/
  ➜  press h to show help
```

**Abre tu navegador en:** http://localhost:5174

### En Producción

```bash
npm run build
# Crea una carpeta 'dist' con los archivos optimizados

npm start
# Inicia un servidor en puerto 4173
```

## 📚 Guía de Uso de la Aplicación

### 🔐 1. Login - Iniciar Sesión

Al abrir la app, verás la pantalla de login:

```
Email: admin@example.com
Contraseña: admin1234
```

**Usuarios disponibles:**

| Email | Contraseña | Rol | Acceso |
|-------|-----------|-----|--------|
| admin@example.com | admin1234 | ADMIN | Todo (gesión completa) |
| vet@example.com | vet1234 | VETERINARIO | Ver y crear historiales |
| recepcion@example.com | recep1234 | RECEPCIONISTA | Ver información |

Haz click en **"Iniciar Sesión"** para entrar.

### 🏠 2. Pantalla Principal

Una vez logueado, verás la página principal con 4 secciones:

#### 📊 Secciones Disponibles

**1. 🐾 Mascotas**
   - Ver lista de todas las mascotas registradas
   - **Crear mascota:** Click en "➕ Nueva Mascota"
     - Nombre, especie, raza, edad, peso y dueño
    - (Generación automática de imagen eliminada)
   - **Editar:** Haz click en "✏️ Editar"
   - **Eliminar:** Haz click en "🗑️ Eliminar"

**2. 👥 Dueños**
   - Ver lista de todos los dueños de mascotas
   - **Crear dueño:** Click en "➕ Nuevo Dueño"
     - Nombre, email, teléfono y dirección
   - **Editar:** Haz click en "✏️ Editar"
   - **Eliminar:** Haz click en "🗑️ Eliminar"

**3. 👨‍⚕️ Veterinarios** (Solo Admin)
   - Ver lista de veterinarios del sistema
   - Gestión completa (crear, editar, eliminar)

**4. 📞 Recepcionistas** (Solo Admin)
   - Ver lista de recepcionistas
   - Gestión completa (crear, editar, eliminar)

### 📋 3. Historiales Médicos

Haz click en "📋 Historial Clínico" en la navegación:

- **Ver historiales** de las mascotas
- **Crear nuevo historial:** Click en "➕ Nuevo Historial"
  - Selecciona mascota, fecha, hora (HH:MM), diagnóstico y tratamiento
- **Ver detalles:** Haz click en la mascota para ver su historial completo

### 🖼️ 4. Gestión de Imágenes (eliminada)

La gestión de imágenes fue retirada del proyecto. Las referencias a subida/almacenamiento local ya no están disponibles.

### ⚙️ 5. Configuración

Haz click en "⚙️ Configuración" para ver opciones:

- **Mis Datos:** Ver tu perfil actual
- **Cerrar Sesión:** Salir de la aplicación

## 💡 Características Destacadas

### 🎨 Interfaz Intuitiva
- Diseño moderno con Tailwind CSS
- Botones claramente etiquetados con emojis
- Tablas ordenadas y fáciles de leer
- Formularios amigables

### 📱 Responsivo
- Funciona perfectamente en PC, tablet y móvil
- Diseño adaptativo a cualquier pantalla

### 🔔 Notificaciones
- Mensajes de éxito (verde) cuando guardas datos
- Mensajes de error (rojo) si algo falla
- Notificaciones automáticas al crear/actualizar

### 🖼️ Imágenes Automáticas
La funcionalidad de imágenes automáticas y almacenamiento local fue retirada.

### 🔒 Seguridad
- Login con autenticación JWT
- Roles y permisos (Admin > Veterinario > Recepcionista)
- Token válido por 24 horas

## ❌ Solución de Problemas

### Error: "Cannot find module dependencies"
```bash
npm install
```

### Error: "Connection refused" (no llega al backend)
- Verifica que el backend esté corriendo en otro terminal
- Asegúrate de estar en `http://localhost:3000`
- Revisa la consola del navegador (F12) para ver errores

### Error: "Login failed"
- Verifica que el email y contraseña sean correctos
- Los emails son case-sensitive (admin@example.com ≠ Admin@example.com)
- Asegúrate de tener espacios o mayúsculas

### Las imágenes
La gestión y carga de imágenes fue retirada del proyecto; ya no es necesario revisar este apartado.

### Error: "Unauthorized" o "Token invalid"
- Tu sesión expiró (válida por 24 horas)
- Cierra sesión y vuelve a iniciar
- Borrar cookies/localStorage si hay conflicto

### El port 5174 ya está en uso
```bash
# Usa otro puerto
npm run dev -- --port 5175
```

## 📁 Estructura del Proyecto

```
frontend/
├── src/
│   ├── components/          # Componentes React
│   │   ├── Header.tsx       # Encabezado con navegación
│   │   ├── PetsSection.tsx  # Gestión de mascotas
│   │   ├── OwnersSection.tsx # Gestión de dueños
│   │   ├── HistorySection.tsx # Historiales médicos
│   │   ├── Login.tsx        # Pantalla de login
│   │   ├── Settings.tsx     # Configuración
│   │   └── ToastProvider.tsx # Sistema de notificaciones
│   ├── services/            # Lógica de API
│   │   ├── api.ts           # Cliente HTTP con autenticación
│   │   └── (imageService removed)
│   ├── types/               # Tipos TypeScript
│   ├── App.tsx              # Componente principal
│   └── main.tsx             # Punto de entrada
├── package.json             # Dependencias
├── vite.config.ts           # Configuración Vite
├── tailwind.config.js       # Configuración Tailwind
└── README.md                # Este archivo
```

## 🔧 Comandos Disponibles

```bash
# Desarrollo con recarga automática
npm run dev

# Verificar tipos TypeScript
npm run type-check

# Verificar código con ESLint
npm run lint

# Compilar para producción
npm run build

# Previsualizar build
npm run preview

# Iniciar servidor de producción
npm start
```

## 📄 Documentación de Código

El proyecto está documentado con **JSDoc** y **TypeScript**. Abre cualquier archivo en tu editor y coloca el cursor sobre componentes/funciones para ver la documentación.

## 🐛 Reportar Bugs

Si encuentras un problema:

1. Describe qué hiciste
2. Qué error viste
3. Incluye capturas de pantalla si es posible
4. Chequea la consola del navegador (F12 → Console)

## 📚 Recursos Útiles

- 📖 [React Docs](https://react.dev/learn)
- ⚡ [Vite Docs](https://vitejs.dev/guide/)
- 🎨 [Tailwind Docs](https://tailwindcss.com/docs)
- 🔐 [JWT Docs](https://jwt.io/introduction)
- 🐞 [MDN Docs](https://developer.mozilla.org/)

## 📝 Licencia

Proyecto desarrollado para UTN como trabajo final.

---

## ❓ ¿Necesitas ayuda?

1. **Revisa este README** - Probablemente tu pregunta esté aquí
2. **Abre la consola** (F12) para ver errores detallados
3. **Contacta al equipo** de desarrollo
4. **Reporta el bug** en el repositorio

---

**¡Disfruta usando PetCare! 🐾**
