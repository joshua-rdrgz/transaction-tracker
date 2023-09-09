import path from 'path';
import express from 'express';
import mongoose from 'mongoose';
import passport from 'passport';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import xss from 'xss-clean';
import compression from 'compression';
import cors from 'cors';
import hpp from 'hpp';
import cookieParser from 'cookie-parser';
import { createExpressMiddleware } from '@trpc/server/adapters/express';

import { setUpJwtStrategy } from '@/config/passport';
import { createContext } from '@/config/trpc';
import { upload } from '@/config/multer';

import { appRouter } from '@/routes/appRouter';

import OutsideTRPCError from '@/errors/outsideTRPCError';
import globalErrorHandler from '@/errors/globalErrorHandler';

export default function(db: string) {
  const app = express();

  app.use(helmet());

  mongoose.connect(db).then(() => console.log('DB connection successful!'));

  if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
  }

  app.use(cors({ origin: 'http://localhost:5173', credentials: true }));

  const limiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: 'Too many requests from this IP, please try again in an hour!',
  });
  app.use('/api', limiter);

  app.use(cookieParser());

  setUpJwtStrategy(passport);
  app.use(passport.initialize());

  app.use(express.json({ limit: '10kb' }));

  app.use(mongoSanitize());

  app.use(xss());

  app.use(compression());

  app.use(hpp());

  app.use(express.static(path.join(__dirname, './public')));

  /**
   * ROUTES
   */
  app.post('/api/v1/upload', upload.single('avatar'), (req, res) => {
    if (!req.file) {
      return res.status(400).json({
        status: 'fail',
        message: 'No file provided.',
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'File Uploaded!',
      imageName: req.file.path.split('/').pop(),
    });
  });

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

  return app;
}
