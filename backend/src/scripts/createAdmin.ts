import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import mongoose from '../config/database';
import { User } from '../models/users.model';
import { UserRole } from '../types/auth';

dotenv.config();
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/stock_db';

async function run() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Conectado a MongoDB para crear admin');

    const existing = await User.findOne({ email: 'admin@example.com' });
    if (existing) {
      console.log('Usuario admin ya existe:', existing.email);
      process.exit(0);
    }

    const password = 'admin1234';
    const hashed = await bcrypt.hash(password, 10);

    const admin = new User({
      username: 'admin',
      email: 'admin@example.com',
      password: hashed,
      role: UserRole.ADMIN,
    });

    await admin.save();
    console.log('Usuario admin creado: admin@example.com (password: admin1234)');
    process.exit(0);
  } catch (err) {
    console.error('Error creando admin:', err);
    process.exit(1);
  }
}

run();
