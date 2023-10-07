import { z } from 'zod';
import sharedZodSchemas from 'shared-zod-schemas';
import { PrismaClient, User } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import { authErrors } from '@/errorMessages';
import prisma from '@/config/prisma';
import { hashPassword, verifyCorrectPassword } from '@/utils/bcrypt';
import createNewUserCategories from '@/utils/createNewUserCategories';

// ****
// TYPES
export type SignupInput = z.infer<
  typeof sharedZodSchemas.authRouteSchemas.signup
>;

type LoginInput = z.infer<typeof sharedZodSchemas.authRouteSchemas.login>;

type UpdatePasswordInput = z.infer<
  typeof sharedZodSchemas.authRouteSchemas.updateCurUserPassword
> & { userId: string };

// ****
// PRISMA MODEL

class PrismaUser {
  constructor(private readonly prismaUser: PrismaClient['user']) {}

  // ****
  // ROUTE FUNCTIONS

  async createUser(input: SignupInput): Promise<User> {
    const user = await prisma.user.create({
      data: {
        name: input.name,
        email: input.email,
        passwordHash: await hashPassword(input.password),
        accounts: {
          create: {
            name: 'My Account',
            bank: "My Account's Bank",
            balance: 0,
          },
        },
        categories: {
          create: [{ name: 'Income' }, { name: 'Expenses' }],
        },
      },
      include: {
        categories: true,
      },
    });

    const incomeCategoryId = user.categories.find(
      (category) => category.name === 'Income'
    )?.id;
    const expenseCategoryId = user.categories.find(
      (category) => category.name === 'Expenses'
    )?.id;

    const newUser = await createNewUserCategories(
      user.id,
      incomeCategoryId!,
      expenseCategoryId!
    );

    return newUser!;
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
