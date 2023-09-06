import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import { TRPCError } from '@trpc/server';

import { authErrors, userErrors } from '@/errorMessages';

export interface IUser {
  id: mongoose.Types.ObjectId;
  name: string;
  email: string;
  password: string;
  passwordConfirm?: string;
  avatar?: string;
}

export interface IUserMethods {
  verifyCorrectPassword(
    passwordReceived: string,
    passwordActual: string
  ): Promise<boolean>;
}

export type UserDoc = mongoose.HydratedDocument<IUser>;
type UserModel = mongoose.Model<IUser, {}, IUserMethods>;

async function validateUniqueEmail(email: string) {
  const user = await User.findOne({ email });
  return !user;
}

const userSchema = new mongoose.Schema<IUser, UserModel>({
  name: { type: String, required: [true, userErrors.noName] },
  email: {
    type: String,
    required: [true, userErrors.noEmail],
    unique: true,
    lowercase: true,
    validate: [
      {
        validator: function(email: string) {
          return validator.isEmail(email);
        },
        message: userErrors.notValidEmail,
      },
      {
        validator: async function(email: string): Promise<boolean> {
          const result: boolean = await validateUniqueEmail(email);
          return result;
        },
        message: userErrors.notUniqueEmail,
      },
    ],
  },
  password: {
    type: String,
    required: [true, userErrors.noPassword],
    minLength: [8, userErrors.passwordTooSmall],
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, userErrors.noPasswordConfirm],
    validate: {
      validator: function(this: UserDoc, passwordConfirm: string) {
        return this.password === passwordConfirm;
      },
      message: userErrors.passwordsDoNotMatch,
    },
  },
  avatar: String,
});

/**
 * Hash Password for Database
 * Set passwordConfirm to undefined
 */
userSchema.pre('save', async function(next) {
  const SALT_LENGTH = 12;

  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, SALT_LENGTH);
  this.passwordConfirm = undefined;

  next();
});

/**
 * Compares two passwords
 * @param passwordReceived string
 * @param passwordActual string
 * @returns boolean
 */
userSchema.methods.verifyCorrectPassword = async function(
  passwordReceived: string,
  passwordActual: string
) {
  if (!passwordReceived || !passwordActual) {
    throw new TRPCError({
      code: 'BAD_REQUEST',
      message: authErrors.noCredentialsProvided,
    });
  }
  return await bcrypt.compare(passwordReceived, passwordActual);
};

const User = mongoose.model<IUser, UserModel>('User', userSchema);

export default User;
