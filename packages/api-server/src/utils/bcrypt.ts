import bcrypt from 'bcryptjs';

import { TRPCError } from '@trpc/server';
import { authErrors } from '@/errorMessages';

export const hashPassword = async (password: string) => {
  const SALT_LENGTH = 12;
  const hashedPassword = await bcrypt.hash(password, SALT_LENGTH);
  return hashedPassword;
};

export const verifyCorrectPassword = async function(
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
