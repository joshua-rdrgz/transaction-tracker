import { TRPCError, DefaultErrorShape } from '@trpc/server';
import { IContext } from '@/config/trpc';
import { TRPC_ERROR_CODES_BY_KEY } from '@trpc/server/rpc';

type ErrorFormatter = (opts: {
  error: TRPCError;
  type: 'query' | 'mutation' | 'subscription' | 'unknown';
  path: string | undefined;
  input: unknown;
  ctx: IContext | undefined;
  shape: DefaultErrorShape;
}) => any;

const errorFormatter: ErrorFormatter = (opts) => {
  const { shape, error } = opts;

  console.log('🔥🔥🔥 ERROR 🔥🔥🔥', error);

  if (error.cause?.name === 'ZodError') {
    const zodErrors = JSON.parse(error.cause.message);
    return handleZodErrors(zodErrors, shape);
  }

  if (error.cause?.name === 'PrismaClientKnownRequestError') {
    return handlePrismaErrors(error, shape);
  }

  return shape;
};

function handleZodErrors(zodErrors: any, shape: DefaultErrorShape) {
  if (zodErrors.length === 1) {
    const zodErrorMessage = zodErrors.at(0).message;
    const zodErrorPath = zodErrors.at(0).path;

    return {
      ...shape,
      message: 'Invalid input data.',
      data: {
        ...shape.data,
        errors: {
          [zodErrorPath]: `${zodErrorMessage}.`,
        },
      },
    };
  }

  const errorsObj: { [key: string]: string } = {};
  for (const zodError of zodErrors) {
    errorsObj[zodError.path.at(0)] = zodError.message;
  }

  return {
    ...shape,
    message: 'Multiple invalid inputs.',
    data: {
      ...shape.data,
      errors: errorsObj,
    },
  };
}

function handlePrismaErrors(error: any, shape: DefaultErrorShape) {
  const errorCode = error.cause.code;

  /** Unique constraint failed on the {constraint} */
  if (errorCode === 'P2002') {
    return {
      ...shape,
      code: TRPC_ERROR_CODES_BY_KEY['BAD_REQUEST'],
      data: {
        ...shape.data,
        code: 'BAD_REQUEST',
        httpStatus: 400,
      },
    };
  }

  return shape;
}

export default errorFormatter;
