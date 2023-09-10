import { TRPCError } from '@trpc/server';
import zodSchemas from 'shared-zod-schemas';

import { IContext, publicProcedure } from '@/config/trpc';
import { authProcedure } from '@/procedures/authProcedure';
import { signToken } from '@/utils/jwt';
import User, { UserDoc } from '@/models/userModel';
import { authErrors } from '@/errorMessages';

const TWO_WEEKS_IN_MS = 1000 * 60 * 60 * 24 * 7 * 2;

const sendAuthResponse = (user: UserDoc, ctx: IContext) => {
  const token = signToken(user._id.toString());

  // Manually set password to undefined so it doesn't get through the output.
  // Won't persist to DB b/c we don't call user.save() or similar
  // @ts-ignore
  user.password = undefined;

  ctx.res.cookie('jwtToken', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: TWO_WEEKS_IN_MS,
    // Use domain only in production. Server and client MUST be on same domain, or cookies WON'T work.  Period.
    // domain: process.env.CLIENT_DOMAIN as string,
  });

  return {
    status: 'success',
    data: { user },
  };
};

const signup = publicProcedure
  .input(zodSchemas.authRouteSchemas.signup)
  .mutation(async (opts) => {
    const { ctx, input } = opts;
    const newUser = await User.create(input);
    return sendAuthResponse(newUser, ctx);
  });

const login = publicProcedure
  .input(zodSchemas.authRouteSchemas.login)
  .mutation(async (opts) => {
    const { ctx, input } = opts;
    const user = await User.findOne({ email: input.email }).select('+password');

    if (
      !user ||
      !(await user.verifyCorrectPassword(
        input.password as string,
        user.password
      ))
    ) {
      throw new TRPCError({
        message: authErrors.incorrectUserOrPassword,
        code: 'UNAUTHORIZED',
      });
    }

    return sendAuthResponse(user, ctx);
  });

const getCurrentUser = authProcedure.query(async (opts) => {
  const { ctx } = opts;
  const user = await User.findById(ctx.user.id);
  return {
    status: 'success',
    data: { user },
  };
});

const updateCurrentUser = authProcedure
  .input(zodSchemas.authRouteSchemas.updateCurrentUser)
  .mutation(async (opts) => {
    const { ctx, input } = opts;
    const user = await User.findByIdAndUpdate(ctx.user.id, input, {
      new: true,
      runValidators: true,
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
