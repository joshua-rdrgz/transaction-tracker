import { PrismaClient, User } from '@prisma/client';
import { TRPCError } from '@trpc/server';

import { z } from 'zod';
import sharedZodSchemas from 'shared-zod-schemas';

import { hashPassword, verifyCorrectPassword } from '@/utils/bcrypt';
import { authErrors } from '@/errorMessages';

type SignupInput = z.infer<typeof sharedZodSchemas.authRouteSchemas.signup>;
type LoginInput = z.infer<typeof sharedZodSchemas.authRouteSchemas.login>;

class PrismaUser {
  constructor(private readonly prismaUser: PrismaClient['user']) {}

  async createUser(input: SignupInput): Promise<User> {
    const hashedPassword = await hashPassword(input.password);

    const data = {
      name: input.name,
      email: input.email,
      passwordHash: hashedPassword,
    };

    return await this.prismaUser.create({ data });
  }

  async findUserCheckCredentials(input: LoginInput): Promise<User> {
    const user = await this.prismaUser.findUnique({
      where: { email: input.email },
    });

    if (
      !user ||
      !(await verifyCorrectPassword(
        input.password as string,
        user.passwordHash
      ))
    ) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: authErrors.incorrectUserOrPassword,
      });
    }
    return user;
  }
}

export default PrismaUser;
