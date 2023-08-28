import mongoose from 'mongoose';

import { accountErrors } from '@/errorMessages';

export interface IAccount {
  id: mongoose.Types.ObjectId;
  name: string;
  bank: string;
  balance: number;
}

export type AccountDoc = mongoose.HydratedDocument<IAccount>;

const accountSchema = new mongoose.Schema<IAccount>({
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

const Account = mongoose.model<IAccount>('Account', accountSchema);

export default Account;
