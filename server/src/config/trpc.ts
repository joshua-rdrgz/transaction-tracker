import { inferAsyncReturnType, initTRPC } from '@trpc/server';
import { CreateExpressContextOptions } from '@trpc/server/adapters/express';

import errorFormatter from '@/errors/errorFormatter';

export interface IContext extends CreateExpressContextOptions {
  user: {
    id?: string;
  };
}

export function createContext({ req, res }: CreateExpressContextOptions) {
  const ctx: IContext = {
    req,
    res,
    user: {},
  };

  return ctx;
}
export type Context = inferAsyncReturnType<typeof createContext>;

const t = initTRPC.context<Context>().create({ errorFormatter });

export const router = t.router;
export const middleware = t.middleware;
export const publicProcedure = t.procedure;
export const mergeRouters = t.mergeRouters;
