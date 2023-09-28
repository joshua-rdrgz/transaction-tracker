import { PrismaClient, User } from '@prisma/client';
import { TRPCError } from '@trpc/server';

import { z } from 'zod';
import sharedZodSchemas from 'shared-zod-schemas';

import { hashPassword, verifyCorrectPassword } from '@/utils/bcrypt';
import { authErrors } from '@/errorMessages';

type SignupInput = z.infer<typeof sharedZodSchemas.authRouteSchemas.signup>;
type LoginInput = z.infer<typeof sharedZodSchemas.authRouteSchemas.login>;
type UpdatePasswordInput = z.infer<
  typeof sharedZodSchemas.authRouteSchemas.updateCurUserPassword
> & { userId: string };

class PrismaUser {
  constructor(private readonly prismaUser: PrismaClient['user']) {}

  // ****
  // ROUTE FUNCTIONS

  async createUser(input: SignupInput): Promise<User> {
    return await this.prismaUser.create({
      data: {
        name: input.name,
        email: input.email,
        passwordHash: await hashPassword(input.password),
        accounts: {
          create: [
            {
              name: 'Initial Account',
              bank: 'Initial Bank',
              balance: 0,
            },
          ],
        },
        categories: {
          create: [
            {
              name: 'Initial Category',
              categoryBucket: {
                create: {
                  name: 'Initial Category Bucket',
                },
              },
              targets: {
                create: [
                  {
                    date: new Date(),
                    target: 0,
                  },
                ],
              },
            },
          ],
        },
      },
      include: {
        accounts: true,
        categories: {
          include: {
            categoryBucket: true,
            targets: true,
          },
        },
      },
    });
  }

  async loginUser(input: LoginInput): Promise<User> {
    const user = await this.prismaUser.findUnique({
      where: { email: input.email },
    });
    const checkedUser = await this.checkUserCredentials(
      user,
      input.password as string,
      {
        code: 'UNAUTHORIZED',
        message: authErrors.incorrectUserOrPassword,
      }
    );
    return checkedUser;
  }

  async updateUserPassword(input: UpdatePasswordInput): Promise<User> {
    const user = await this.prismaUser.findUnique({
      where: { id: input.userId },
    });

    const checkedUser = await this.checkUserCredentials(
      user,
      input.curPassword,
      {
        code: 'UNAUTHORIZED',
        message: authErrors.notAllowedToChangePassword,
      }
    );

    const updatedUser = await this.prismaUser.update({
      where: { id: checkedUser.id },
      data: {
        passwordHash: await hashPassword(input.newPassword),
      },
    });

    return updatedUser;
  }

  // ****
  // UTILITY FUNCTIONS

  private async checkUserCredentials(
    user: User | null,
    inputPassword: string,
    trpcErrorToThrow: Omit<TRPCError, 'name'>
  ): Promise<User> {
    const userToCheck = { ...user } as User;
    if (
      !userToCheck ||
      !(await verifyCorrectPassword(
        inputPassword,
        userToCheck.passwordHash as string
      ))
    ) {
      throw new TRPCError(trpcErrorToThrow);
    }
    return userToCheck;
  }

  private async generatePasswordResetToken() {}
}

export default PrismaUser;
