# Guía de Integración Backend-Frontend

Esta guía documenta la arquitectura y buenas prácticas utilisadas para la integración del frontend y backend.

## Filosofía de API Design

### Endpoints de Lectura (GET)
- ✅ **Públicos por defecto** - Sin requerir autenticación
- ✅ Retorna datos de forma consistente
- ✅ Soportan paginación y filtrado (en desarrollo futuro)

### Endpoints de Escritura (POST, PUT, DELETE)
- 🔐 **Protegidos con JWT** - Requieren token válido
- 🔐 **Autorizados por rol** - Solo admin puede modificar
- 🔐 Validación de DTO antes de procesar

## Estructura de Proyecto

```
backend/backend-stock-mongo/
├── src/
│   ├── config/           # Configuración (BD, env vars)
│   ├── controllers/       # Lógica de negocio
│   ├── middlewares/       # Auth, validación, error handling
│   ├── models/           # Esquemas Mongoose
│   ├── routes/           # Definición de endpoints
│   ├── services/         # (Futuro) Lógica compartida
│   ├── types/            # Interfaces TypeScript
│   ├── validators/       # Validación de entrada
│   └── index.ts          # Entry point

frontend/
├── src/
│   ├── components/       # Componentes React
│   ├── services/         # api.ts (cliente HTTP)
│   ├── types/            # Interfaces (sync con backend)
│   ├── App.tsx          # App principal
│   └── main.tsx         # Entry point
```

## Convenciones

### Tipos de Datos
- **Dates**: ISO 8601 format (YYYY-MM-DDTHH:mm:ss.sssZ)
- **IDs**: MongoDB ObjectId (string de 24 caracteres hexadecimales)
- **Booleans**: JSON primitivo (true/false)

### Respuestas de Error
```json
{
  "status": "error",
  "message": "Descripción del error",
  "code": 400
}
```

### Status HTTP
- `200 OK` - Operación exitosa
- `201 Created` - Recurso creado
- `400 Bad Request` - Validación fallida
- `401 Unauthorized` - Token faltante o inválido
- `403 Forbidden` - Usuario no autorizado (sin rol requerido)
- `404 Not Found` - Recurso no encontrado
- `500 Internal Server Error` - Error del servidor

## Autenticación

### Login
```bash
POST /auth/login
Content-Type: application/json

{
  "email": "usuario@example.com",
  "password": "Password123!"
}
```

**Respuesta:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "username": "usuario",
    "email": "usuario@example.com",
    "role": "admin"
  }
}
```

### Headers Requeridos para Endpoints Protegidos
```
Authorization: Bearer <JWT_TOKEN>
```

## Endpoints API

### Categorías
| Método | Endpoint | Auth | Descripción |
|--------|----------|------|-------------|
| GET | `/api/categoria` | ❌ | Listar todas las categorías |
| GET | `/api/categoria/:id` | ❌ | Obtener categoría por ID |
| POST | `/api/categoria` | ✅ Admin | Crear categoría |
| PUT | `/api/categoria/:id` | ✅ Admin | Actualizar categoría |
| DELETE | `/api/categoria/:id` | ✅ Admin | Eliminar categoría |

### Productos
| Método | Endpoint | Auth | Descripción |
|--------|----------|------|-------------|
| GET | `/api/producto` | ❌ | Listar todos los productos |
| GET | `/api/producto/:id` | ❌ | Obtener producto por ID |
| POST | `/api/producto` | ✅ Admin | Crear producto |
| PUT | `/api/producto/:id` | ✅ Admin | Actualizar producto |
| DELETE | `/api/producto/:id` | ✅ Admin | Eliminar producto |

### Autenticación
| Método | Endpoint | Auth | Descripción |
|--------|----------|------|-------------|
| POST | `/auth/register` | ❌ | Registrar nuevo usuario |
| POST | `/auth/login` | ❌ | Login y obtener token |

## CORS y Dominios Permitidos

El backend está configurado para aceptar requests desde:
- `http://localhost:5173` (Frontend Vite desarrollo)
- `http://localhost:5174` (Frontend Vite fallback)
- `http://localhost:5175` (Frontend Vite fallback 2)

**Configuración:**
```typescript
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
  optionsSuccessStatus: 200,
}));
```

## Variables de Entorno Requeridas

**Backend (.env):**
```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/stock_db
JWT_SECRET=tu-secret-key-aqui
JWT_EXPIRES_IN=1d
```

**Frontend (.env - si necesario):**
```
VITE_API_URL=http://localhost:3000
```

## Ejecución

### Backend
```bash
cd backend/backend-stock-mongo
npm install
npm run dev  # puerto 3000
```

### Frontend
```bash
cd frontend
npm install
npm run dev  # puerto 5173+
```

## Troubleshooting

### "No token provided"
- **Causa**: Endpoint protegido sin Authorization header
- **Solución**: Incluir `Authorization: Bearer <token>` en headers

### "Invalid token or expired"
- **Causa**: Token inválido, expirado o JWT_SECRET no coincide
- **Solución**: Verificar JWT_SECRET en .env, re-loguear usuario

### "CORS error"
- **Causa**: Frontend en puerto diferente not configured
- **Solución**: Actualizar whitelist en CORS config

### "MongoDB connection failed"
- **Causa**: MongoDB no está corriendo
- **Solución**: Verificar MongoDB local o connection string

## Próximas Mejoras

- [ ] Rate limiting en auth endpoints
- [ ] Refresh tokens
- [ ] Paginación en GET /api/categoria y /api/producto
- [ ] Filtrado y búsqueda
- [ ] Documentación con Swagger/OpenAPI
- [ ] Tests (Jest, Supertest)
- [ ] CI/CD pipeline
