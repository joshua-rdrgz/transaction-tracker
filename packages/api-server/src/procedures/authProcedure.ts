import passport, { AuthenticateCallback } from 'passport';
import { TRPCError } from '@trpc/server';

import { InitialContext, middleware, publicProcedure } from '@/config/trpc';
import { authErrors } from '@/errorMessages';

const passportAuthCallback = (
  ctx: InitialContext,
  res: (value: unknown) => void,
  rej: (reason?: any) => void
): AuthenticateCallback => (
  _, // err
  user
) => {
  if (!user) {
    rej(
      new TRPCError({
        code: 'UNAUTHORIZED',
        message: authErrors.notLoggedIn,
      })
    );
    return;
  }
  // BUGFIX: TypeScript support
  // @ts-ignore
  ctx.user = { id: user.id };
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
  if (ctx.user?.id) return next({ ctx: { user: ctx.user } });
  throw new TRPCError({
    code: 'UNAUTHORIZED',
    message: authErrors.notLoggedIn,
  });
});

export const authProcedure = publicProcedure.use(isAuthenticatedMiddleware);
