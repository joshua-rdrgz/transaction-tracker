import { TRPCError } from '@trpc/server';
import zodSchemas from 'shared-zod-schemas';

import { IContext, publicProcedure } from '@/config/trpc';
import { authProcedure } from '@/procedures/authProcedure';
import { signToken } from '@/utils/jwt';
import prisma, { prismaUser } from '@/config/prisma';
import { catchCustomError } from '@/utils/catchCustomError';
import { authErrors } from '@/errorMessages';

const TWO_WEEKS_IN_MS = 1000 * 60 * 60 * 24 * 7 * 2;

const userWithNoPassword = <TUser extends {}>(
  user: TUser
): Omit<TUser, 'passwordHash'> => {
  const userNoPassword = {
    ...user,
    passwordHash: undefined,
  };
  return userNoPassword;
};

const sendAuthResponse = <TUser extends { [key: string]: any }>(
  user: TUser,
  ctx: IContext
) => {
  const token = signToken(user.id);

  ctx.res.cookie('jwtToken', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: TWO_WEEKS_IN_MS,
    // Use domain only in production. Server and client MUST be on same domain, or cookies WON'T work.  Period.
    // domain: process.env.CLIENT_DOMAIN as string,
  });

  return {
    status: 'success',
    data: { user: userWithNoPassword(user as Exclude<typeof user, null>) },
  };
};

const signup = publicProcedure
  .input(zodSchemas.authRouteSchemas.signup)
  .mutation(
    async (opts) =>
      await catchCustomError(
        opts,
        async (opts) => {
          const { ctx, input } = opts;
          const newUser = await prismaUser.createUser(input);
          return sendAuthResponse(newUser, ctx);
        },
        // The only server error to handle is a duplicate email field
        {
          meta: { target: 'email' },
          message: authErrors.emailAlreadyInUse,
        }
      )
  );

const login = publicProcedure
  .input(zodSchemas.authRouteSchemas.login)
  .mutation(async (opts) => {
    const { ctx, input } = opts;
    const user = await prismaUser.findUserCheckCredentials(input);
    return sendAuthResponse(user, ctx);
  });

const getCurrentUser = authProcedure.query(async (opts) => {
  const { ctx } = opts;
  const user = await prisma.user.findUnique({
    where: { id: ctx.user.id },
  });
  return {
    status: 'success',
    data: { user: userWithNoPassword(user as Exclude<typeof user, null>) },
  };
});

const updateCurrentUser = authProcedure
  .input(zodSchemas.authRouteSchemas.updateCurrentUser)
  .mutation(async (opts) => {
    const { ctx, input } = opts;
    const user = await prisma.user.update({
      where: { id: ctx.user.id },
      data: { ...input },
    });
    if (!user)
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: "Either the user doesn't exist, or you are not authorized.",
      });
    return sendAuthResponse(user, ctx);
  });

export default {
  signup,
  login,
  getCurrentUser,
  updateCurrentUser,
};
