import { z } from 'zod';
import { TRPCError } from '@trpc/server';

import { publicProcedure } from '@/config/trpc';
import { signToken } from '@/utils/jwt';
import User, { UserDoc } from '@/models/userModel';
import { authErrors } from '@/errorMessages';

const sendAuthResponse = (user: UserDoc) => {
  const token = signToken(user._id.toString());

  // Manually set password to undefined so it doesn't get through the output.
  // Won't persist to DB b/c we don't call user.save() or similar
  // @ts-ignore
  user.password = undefined;

  return {
    status: 'success',
    token,
    data: { user },
  };
};

const signup = publicProcedure
  .input(
    z.object({
      name: z.string(),
      email: z.string(),
      password: z.string(),
      passwordConfirm: z.string().optional(),
      avatar: z.string().optional(),
      netWorth: z.number().optional(),
      accounts: z.array(z.string()).optional(),
    })
  )
  .mutation(async (opts) => {
    const { input } = opts;
    const newUser = await User.create(input);
    return sendAuthResponse(newUser);
  });

const login = publicProcedure
  .input(
    z.object({
      email: z.string().optional(),
      password: z.string().optional(),
    })
  )
  .mutation(async (opts) => {
    const { input } = opts;
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

    return sendAuthResponse(user);
  });

export default {
  signup,
  login,
};
