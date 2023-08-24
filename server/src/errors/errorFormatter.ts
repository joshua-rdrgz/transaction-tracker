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

  const mongooseValidationErrors = handleMongooseValidationErrors(error, shape);
  if (mongooseValidationErrors) return mongooseValidationErrors;

  return shape;
};

function handleMongooseValidationErrors(
  error: TRPCError,
  shape: DefaultErrorShape
) {
  if (error.message.startsWith('User validation failed: ')) {
    const errorCodeNumber = TRPC_ERROR_CODES_BY_KEY['BAD_REQUEST'];
    const errorCode = 'BAD_REQUEST';

    const errorMessages = error.message;
    const errorMessageArr = errorMessages
      .replace('User validation failed: ', '')
      .split(', ');

    if (errorMessageArr.length === 1) {
      const [errorMessage] = errorMessageArr;
      const [property, message] = errorMessage.split(':');
      const errorObj = { [property]: message.slice(1) };
      return {
        ...shape,
        message: 'Validation error.',
        code: errorCodeNumber,
        data: {
          ...shape.data,
          code: errorCode,
          httpStatus: '400',
          errors: errorObj,
        },
      };
    }

    const errorObj: { [key: string]: string } = {};
    for (const errorMessage of errorMessageArr) {
      const [property, message] = errorMessage.split(':');
      errorObj[property] = message;
    }

    return {
      ...shape,
      message: 'Multiple validation errors.',
      code: errorCodeNumber,
      data: {
        ...shape.data,
        code: errorCode,
        httpStatus: '400',
        errors: errorObj,
      },
    };
  }
  return null;
}

export default errorFormatter;
