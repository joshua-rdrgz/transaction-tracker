import passport, { AuthenticateCallback } from 'passport';
import { TRPCError } from '@trpc/server';

import { Context, middleware, publicProcedure } from '@/config/trpc';
import { UserDoc } from '@/models/userModel';
import { authErrors } from '@/errorMessages';

const passportAuthCallback = (
  ctx: Context,
  res: (value: unknown) => void,
  rej: (reason?: any) => void
): AuthenticateCallback => (
  _, // err
  user
) => {
  if (!user) {
    rej(
      new TRPCError({
        code: 'BAD_REQUEST',
        message: authErrors.noCredentialsProvided,
      })
    );
    return;
  }
  ctx.user = { id: (user as UserDoc)._id.toString() };
  res(null);
};

const isAuthenticatedMiddleware = middleware(async ({ ctx, next }) => {
  await new Promise((res, rej) =>
    passport.authenticate(
      'jwt',
      { session: false },
      passportAuthCallback(ctx, res, rej)
    )(ctx.req, ctx.res, next)
  );
  return next({ ctx });
});

export const authProcedure = publicProcedure.use(isAuthenticatedMiddleware);
