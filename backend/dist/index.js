"use strict";
/**
 * @file index.ts
 * @description Main entry point for the Stock Management Backend API.
 * Configures Express, middleware, routes, and connects to MongoDB.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const categories_routes_1 = __importDefault(require("./routes/categories.routes"));
const product_routes_1 = __importDefault(require("./routes/product.routes"));
const owners_routes_1 = __importDefault(require("./routes/owners.routes"));
const pets_routes_1 = __importDefault(require("./routes/pets.routes"));
const medical_records_routes_1 = __importDefault(require("./routes/medical-records.routes"));
const users_routes_1 = __importDefault(require("./routes/users.routes"));
const auth_middleware_1 = require("./middlewares/auth.middleware");
const database_1 = require("./config/database");
const error_middleware_1 = require("./middlewares/error.middleware");
const appError_1 = require("./types/appError");
const auth_1 = require("./types/auth");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// Middleware CORS para permitir conexiones desde el frontend
app.use((0, cors_1.default)({
    origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175'],
    credentials: true,
    optionsSuccessStatus: 200,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
// Middleware para interpretar JSON
app.use(express_1.default.json());
// Middleware para servir archivos estáticos desde la carpeta "public"
app.use(express_1.default.static(path_1.default.join(__dirname, '..', 'public')));
app.use('/auth', auth_routes_1.default);
app.get('/public', (req, res) => {
    res.json({
        message: 'Cualquiera puede entrar!',
    });
});
app.get('/protected', auth_middleware_1.authenticate, (req, res) => {
    res.json({
        message: 'Acceso permitido',
    });
});
// Ruta de administrador (requiere autenticación y rol admin)
app.get('/admin', auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)([auth_1.UserRole.ADMIN]), (req, res) => {
    res.json({
        message: 'Acceso de administrador permitido',
    });
});
app.get('/api/saludo', (req, res) => {
    res.json({ mensaje: 'Hola desde la API 🚀' });
});
app.use('/api/categoria', categories_routes_1.default);
app.use('/api/producto', product_routes_1.default);
app.use('/api/owner', owners_routes_1.default);
app.use('/api/pet', pets_routes_1.default);
app.use('/api/medical-record', medical_records_routes_1.default);
app.use('/api/user', users_routes_1.default);
app.get('/api/test-error', (req, res, next) => {
    next(new appError_1.AppError('Este es un error de prueba!', 418));
});
// Middleware de manejo de errores global (debe ser el último)
app.use(error_middleware_1.errorHandler);
/**
 * Connects to the database and starts the HTTP server.
 */
const startServer = async () => {
    try {
        await (0, database_1.connectDB)();
    }
    catch (error) {
        console.warn('⚠️ Continuando sin base de datos inicialmente...');
    }
    app.listen(PORT, () => {
        console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
        console.log(`📝 Frontend: http://localhost:5173`);
        console.log(`📚 Lee API_INTEGRATION_GUIDE.md para documentación`);
    });
};
startServer().catch(err => {
    console.error('Error fatal al iniciar servidor:', err);
    process.exit(1);
});
// Manejo de señales para shutdown limpio
process.on('SIGINT', () => {
    console.log('\n\n👋 Deteniendo servidor...');
    process.exit(0);
});
