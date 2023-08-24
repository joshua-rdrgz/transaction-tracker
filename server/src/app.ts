import express from 'express';
import passport from 'passport';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import xss from 'xss-clean';
import compression from 'compression';
import cors from 'cors';
import hpp from 'hpp';
import { createExpressMiddleware } from '@trpc/server/adapters/express';

import { setUpJwtStrategy } from '@/config/passport';
import { createContext } from '@/config/trpc';

import { appRouter } from '@/routes/appRouter';

import OutsideTRPCError from '@/errors/outsideTRPCError';
import globalErrorHandler from '@/errors/globalErrorHandler';

const app = express();

app.use(helmet());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(cors({ origin: 'http://localhost:5173' }));

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!',
});
app.use('/api', limiter);

setUpJwtStrategy(passport);
app.use(passport.initialize());

app.use(express.json({ limit: '10kb' }));

app.use(mongoSanitize());

app.use(xss());

app.use(compression());

app.use(hpp());

app.use(express.static(`${__dirname}/public`));

/**
 * ROUTES
 */
app.use(
  '/api/v1/trpc',
  createExpressMiddleware({ router: appRouter, createContext })
);

/**
 * ERROR HANDLING
 */
app.all('*', (req, _, next) => {
  next(
    new OutsideTRPCError({
      name: 'Outside tRPC scope',
      code: 'NOT_FOUND',
      message: `Can't find ${req.originalUrl} on this server!  This server's base starts at /api/v1/trpc -- if you're not there, you won't find anything!`,
    })
  );
});
app.use(globalErrorHandler);

export type AppRouter = typeof appRouter;
export default app;
