import { TRPCError } from '@trpc/server';
import { getHTTPStatusCodeFromError } from '@trpc/server/http';

class OutsideTRPCError extends TRPCError {
  status: string;
  statusCode: number;
  message: string;
  isOperational: boolean;

  constructor(trpcError: TRPCError) {
    super(trpcError);

    this.status = trpcError.code;
    this.statusCode = getHTTPStatusCodeFromError(trpcError);
    this.message = trpcError.message;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default OutsideTRPCError;
