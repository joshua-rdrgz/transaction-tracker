import { Request, Response, NextFunction } from 'express';
import OutsideTRPCError from '@/errors/outsideTRPCError';

export default function(err: any, _: Request, res: Response, __: NextFunction) {
  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else if (
    process.env.NODE_ENV === 'production' ||
    process.env.NODE_ENV === 'test'
  ) {
    sendErrorProd(err, res);
  } else {
    res.status(500).json({
      code: 500,
      message: 'Internal servor error.  Please try again.',
    });
  }
}

function sendErrorDev(err: OutsideTRPCError, res: Response) {
  res.status(404).json({
    ...err,
    message: err.message,
    stack: err.stack,
  });
}

function sendErrorProd(err: OutsideTRPCError, res: Response) {
  if (err.isOperational) {
    // Operational Error (trusted), send to client.
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    // Non-Operational Error (not trusted), don't leak details to client.
    console.error('💥💥💥 ERROR 💥💥💥 : ', err);
    res.status(500).json({
      status: 'error',
      message: 'Uh oh!  Something went wrong!',
    });
  }
}
