import mongoose from 'mongoose';

import { accountErrors } from '@/errorMessages';
import User from '@/models/userModel';
import { TRPCError } from '@trpc/server';

export interface IAccount {
  id: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  name: string;
  bank: string;
  balance: number;
}

export type AccountDoc = mongoose.HydratedDocument<IAccount>;

const accountSchema = new mongoose.Schema<IAccount>({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, accountErrors.noAssociatedUser],
  },
  name: {
    type: String,
    required: [true, accountErrors.noName],
  },
  bank: {
    type: String,
    required: [true, accountErrors.noBank],
  },
  balance: {
    type: Number,
    required: [true, accountErrors.noBalance],
    min: [0, accountErrors.balanceBelowZero],
  },
});

/**
 * Validates user is real
 */
accountSchema.pre('save', async function(next) {
  const user = await User.findById(this.user);
  if (!user)
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: accountErrors.notAllowedAccess,
    });
  next();
});

const Account = mongoose.model<IAccount>('Account', accountSchema);

export default Account;
