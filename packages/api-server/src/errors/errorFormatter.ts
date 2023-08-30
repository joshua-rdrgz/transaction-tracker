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

  if (error.cause?.name === 'ValidationError') {
    return handleMongooseValidationErrors(error, shape);
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

function handleMongooseValidationErrors(
  error: TRPCError,
  shape: DefaultErrorShape
) {
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
      message: 'Validation error on server.',
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
    errorObj[property] = message.slice(1);
  }

  return {
    ...shape,
    message: 'Multiple validation errors on server.',
    code: errorCodeNumber,
    data: {
      ...shape.data,
      code: errorCode,
      httpStatus: '400',
      errors: errorObj,
    },
  };
}

export default errorFormatter;
