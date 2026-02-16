# Backend Stock Management - MongoDB

Este es el backend para un sistema de gestión de stock, desarrollado como parte del curso de UTN. Utiliza Express, MongoDB (con Mongoose) y TypeScript.

## 🚀 Características

- **Autenticación JWT:** Registro e inicio de sesión de usuarios con roles (user/admin).
- **Gestión de Categorías:** CRUD completo para categorías de productos.
- **Gestión de Productos:** CRUD completo para productos, con relación a categorías.
- **Validaciones:** Uso de `express-validator` para asegurar la integridad de los datos.
- **Manejo de Errores:** Sistema de manejo de errores global y centralizado.
- **Documentación:** Código documentado con JSDoc.

## 🛠️ Tecnologías

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/) & [Mongoose](https://mongoosejs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)
- [bcrypt](https://github.com/kelektiv/node.bcrypt.js)
- [express-validator](https://express-validator.github.io/docs/)

## 📋 Requisitos Previos

- Node.js (v14 o superior)
- MongoDB instalado y corriendo localmente o una URI de MongoDB Atlas.

## ⚙️ Instalación

1. Clona el repositorio:
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd backend-stock-mongo
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Configura las variables de entorno:
   Crea un archivo `.env` en la raíz del proyecto basándote en `.env.example`:
   ```env
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/stock_db
   JWT_SECRET=tu_secreto_super_seguro
   JWT_EXPIRES_IN=1h
   ```

## 🚀 Ejecución

### Desarrollo
```bash
npm run dev
```

### Producción
```bash
npm run build
npm start
```

## 🛣️ API Endpoints

### Autenticación
- `POST /auth/register`: Registrar un nuevo usuario.
- `POST /auth/login`: Iniciar sesión y obtener token JWT.

### Categorías
- `GET /api/categoria`: Obtener todas las categorías.
- `GET /api/categoria/:id`: Obtener una categoría por ID.
- `POST /api/categoria`: Crear una nueva categoría (Requiere Admin).
- `PUT /api/categoria/:id`: Actualizar una categoría (Requiere Admin).
- `DELETE /api/categoria/:id`: Eliminar una categoría (Requiere Admin).

### Productos
- `GET /api/producto`: Obtener todos los productos.
- `GET /api/producto/:id`: Obtener un producto por ID.
- `POST /api/producto`: Crear un nuevo producto (Requiere Admin).
- `PUT /api/producto/:id`: Actualizar un producto (Requiere Admin).
- `DELETE /api/producto/:id`: Eliminar un producto (Requiere Admin).

## 🧪 Pruebas con Insomnia

Se incluye una colección de Insomnia para facilitar las pruebas de la API.

1. Abre [Insomnia](https://insomnia.rest/).
2. Haz clic en **Import**.
3. Selecciona el archivo `Insomnia_2026-01-27.yaml` ubicado en la raíz del proyecto.
4. Una vez importado, podrás ver todas las rutas configuradas, incluyendo ejemplos de cuerpo de petición para registro, login, productos y categorías.

> [!TIP]
> Asegúrate de ejecutar el login primero para obtener el token JWT y configurarlo en las peticiones protegidas.


## 📄 Documentación de Código
El proyecto utiliza **JSDoc** para documentar funciones, interfaces y controladores. Puedes ver la documentación directamente en tu editor de código al pasar el cursor sobre los elementos.

## 📝 Licencia
Este proyecto es para fines educativos.
