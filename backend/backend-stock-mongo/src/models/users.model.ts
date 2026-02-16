import mongoose, { Schema, Document } from 'mongoose';
import { UserRole } from '../types/auth';

/**
 * Interface representing a User document in MongoDB.
 * 
 * @interface IUser
 * @extends {Document}
 */
export interface IUser extends Document {
  /** The unique username of the user */
  username: string;
  /** The unique email address of the user */
  email: string;
  /** The hashed password of the user */
  password: string;
  /** The assigned role of the user (e.g., 'admin', 'user') */
  role: UserRole;
  /** The date the user was created */
  createdAt: Date;
  /** The date the user was last updated */
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
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
    role: { type: String, enum: Object.values(UserRole), default: 'user' } as any,
  },
  { timestamps: true }
);

userSchema.index({ email: 1 });
userSchema.index({ username: 1 });

export const User = mongoose.model<IUser>('User', userSchema);

export interface UserData {
  id: string;
  username: string;
  email: string;
  password: string;
  role: UserRole;
}

/**
 * Finds a user by their email or username.
 * 
 * @param {string} [email=''] - The email address to search for.
 * @param {string} [username=''] - The username to search for.
 * @returns {Promise<UserData | null>} A promise that resolves to the user data if found, or null otherwise.
 */
export const findUser = async (
  email: string = '',
  username: string = ''
): Promise<UserData | null> => {
  const user = await User.findOne({ $or: [{ email }, { username }] }).lean();
  if (!user) return null;

  return {
    id: user._id.toString(),
    username: user.username,
    email: user.email,
    password: user.password,
    role: user.role as UserRole,
  };
};

/**
 * Creates a new user in the database.
 * 
 * @param {Omit<UserData, 'id' | 'role'>} user - The user data to create (excluding id and role).
 * @returns {Promise<string>} A promise that resolves to the ID of the newly created user as a string.
 */
export const createUser = async (
  user: Omit<UserData, 'id' | 'role'>
): Promise<string> => {
  const newUser = new User({
    username: user.username,
    email: user.email,
    password: user.password,
    role: 'user',
  });
  const saved = await newUser.save();
  return saved._id.toString();
};
