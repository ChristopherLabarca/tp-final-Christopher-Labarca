"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const database_1 = __importDefault(require("../config/database"));
const users_model_1 = require("../models/users.model");
const auth_1 = require("../types/auth");
dotenv_1.default.config();
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/stock_db';
async function run() {
    try {
        await database_1.default.connect(MONGODB_URI);
        console.log('Conectado a MongoDB para crear admin');
        const existing = await users_model_1.User.findOne({ email: 'admin@example.com' });
        if (existing) {
            console.log('Usuario admin ya existe:', existing.email);
            process.exit(0);
        }
        const password = 'admin1234';
        const hashed = await bcrypt_1.default.hash(password, 10);
        const admin = new users_model_1.User({
            username: 'admin',
            email: 'admin@example.com',
            password: hashed,
            role: auth_1.UserRole.ADMIN,
        });
        await admin.save();
        console.log('Usuario admin creado: admin@example.com (password: admin1234)');
        process.exit(0);
    }
    catch (err) {
        console.error('Error creando admin:', err);
        process.exit(1);
    }
}
run();
