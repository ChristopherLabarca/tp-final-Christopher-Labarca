"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = exports.findUser = exports.User = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const auth_1 = require("../types/auth");
const userSchema = new mongoose_1.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, 'Por favor ingresa un email válido'],
    },
    password: { type: String, required: true, minlength: 8 },
    role: { type: String, enum: Object.values(auth_1.UserRole), default: auth_1.UserRole.RECEPCIONISTA },
}, { timestamps: true });
userSchema.index({ email: 1 });
userSchema.index({ username: 1 });
exports.User = mongoose_1.default.model('User', userSchema);
/**
 * Finds a user by their email or username.
 *
 * @param {string} [email=''] - The email address to search for.
 * @param {string} [username=''] - The username to search for.
 * @returns {Promise<UserData | null>} A promise that resolves to the user data if found, or null otherwise.
 */
const findUser = async (email = '', username = '') => {
    const user = await exports.User.findOne({ $or: [{ email }, { username }] }).lean();
    if (!user)
        return null;
    return {
        id: user._id.toString(),
        username: user.username,
        email: user.email,
        password: user.password,
        role: user.role,
    };
};
exports.findUser = findUser;
/**
 * Creates a new user in the database.
 *
 * @param {Omit<UserData, 'id' | 'role'>} user - The user data to create (excluding id and role).
 * @returns {Promise<string>} A promise that resolves to the ID of the newly created user as a string.
 */
const createUser = async (user) => {
    const newUser = new exports.User({
        username: user.username,
        email: user.email,
        password: user.password,
        role: auth_1.UserRole.RECEPCIONISTA,
    });
    const saved = await newUser.save();
    return saved._id.toString();
};
exports.createUser = createUser;
