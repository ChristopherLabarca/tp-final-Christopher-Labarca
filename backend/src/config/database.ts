import mongoose from 'mongoose';

const MONGODB_URI =
  process.env.MONGODB_URI || 'mongodb://localhost:27017/stock_db';

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
export const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(MONGODB_URI);
    isDBConnected = true;
    console.log('✅ MongoDB conectado exitosamente');
  } catch (error) {
    isDBConnected = false;
    console.error(
      '⚠️ Error al conectar MongoDB - El servidor continuará sin BD:\n',
      error instanceof Error ? error.message : error
    );
    console.warn('ℹ️ Asegúrate de que MongoDB esté corriendo en', MONGODB_URI);
    
    // Reintenta conexión cada 10 segundos
    setTimeout(() => {
      console.log('🔄 Reintentando conexión a MongoDB...');
      connectDB().catch(err => {
        console.error('Reintento fallido:', err);
      });
    }, 10000);
  }
};

/**
 * Getter para verificar si MongoDB está conectado
 */
export const isConnected = () => isDBConnected;

mongoose.connection.on('error', (err) => {
  console.error('❌ Error de MongoDB:', err);
  isDBConnected = false;
});

mongoose.connection.on('disconnected', () => {
  console.warn('⚠️ MongoDB desconectado');
  isDBConnected = false;
});

mongoose.connection.on('connected', () => {
  console.log('✅ MongoDB reconectado');
  isDBConnected = true;
});

export default mongoose;
