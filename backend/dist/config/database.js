"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isConnected = exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/stock_db';
/**
 * Flag para rastrear estado de conexión
 */
let isDBConnected = false;
/**
 * Establishes a connection to the MongoDB database using the URI from environment variables.
 * Si la conexión falla, continúa pero permite que el servidor arrange endpoints sin datos.
 * Esto es útil para desarrollo cuando MongoDB aún no está disponible.
 *
 * @returns {Promise<void>} A promise that resolves when the connection is attempted.
 * @throws Will NOT throw - solo loguea errores
 */
const connectDB = async () => {
    try {
        await mongoose_1.default.connect(MONGODB_URI);
        isDBConnected = true;
        console.log('✅ MongoDB conectado exitosamente');
    }
    catch (error) {
        isDBConnected = false;
        console.error('⚠️ Error al conectar MongoDB - El servidor continuará sin BD:\n', error instanceof Error ? error.message : error);
        console.warn('ℹ️ Asegúrate de que MongoDB esté corriendo en', MONGODB_URI);
        // Reintenta conexión cada 10 segundos
        setTimeout(() => {
            console.log('🔄 Reintentando conexión a MongoDB...');
            (0, exports.connectDB)().catch(err => {
                console.error('Reintento fallido:', err);
            });
        }, 10000);
    }
};
exports.connectDB = connectDB;
/**
 * Getter para verificar si MongoDB está conectado
 */
const isConnected = () => isDBConnected;
exports.isConnected = isConnected;
mongoose_1.default.connection.on('error', (err) => {
    console.error('❌ Error de MongoDB:', err);
    isDBConnected = false;
});
mongoose_1.default.connection.on('disconnected', () => {
    console.warn('⚠️ MongoDB desconectado');
    isDBConnected = false;
});
mongoose_1.default.connection.on('connected', () => {
    console.log('✅ MongoDB reconectado');
    isDBConnected = true;
});
exports.default = mongoose_1.default;
