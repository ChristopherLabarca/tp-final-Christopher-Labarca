import mongoose from 'mongoose';

const MONGODB_URI =
  process.env.MONGODB_URI || 'mongodb://localhost:27017/stock_db';

/**
 * Establishes a connection to the MongoDB database using the URI from environment variables.
 * If the connection fails, the process will exit with a failure code.
 * 
 * @returns {Promise<void>} A promise that resolves when the connection is successful.
 * @throws Will log the error and exit the process if the connection fails.
 */
export const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ MongoDB conectado exitosamente');
  } catch (error) {
    console.error('❌ Error al conectar MongoDB:', error);
    process.exit(1);
  }
};

mongoose.connection.on('error', (err) => {
  console.error('❌ Error de MongoDB:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('⚠️ MongoDB desconectado');
});

export default mongoose;
