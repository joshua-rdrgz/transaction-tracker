import mongoose from 'mongoose';
import { Express, Request, Response } from 'express';
import { MongoMemoryServer } from 'mongodb-memory-server';

import createApp from '@/app';
import { createContext } from '@/config/trpc';
import { appRouter } from '@/routes/appRouter';
import { decodeToken } from '@/utils/jwt';

let app: Express;
let mongo: MongoMemoryServer | null;

const connectDB = async () => {
  mongo = await MongoMemoryServer.create();
  const uri = mongo.getUri();

  app = createApp(uri);
  await mongoose.connect(uri);
};

const dropDB = async () => {
  if (mongo) {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongo.stop();
  }
};

const dropCollections = async () => {
  if (mongo) {
    const collections = await mongoose.connection.db
      .listCollections()
      .toArray();

    for (const collection of collections) {
      await mongoose.connection.dropCollection(collection.name);
    }
  }
};

export const createMockRequest = (token: string | null = null): Request => {
  const req = {} as Request;
  if (token) {
    req.headers = {
      authorization: `Bearer ${token}`,
    };
  }
  return req;
};

export const createMockResponse = (): Response => {
  return {} as Response;
};

export const createCaller = (
  req: Request,
  res: Response,
  token: string | null = null
) => {
  const ctx = createContext({ req, res });

  if (token) {
    const decodedToken = decodeToken(token);
    ctx.user = { id: decodedToken.sub as string };
  }

  return appRouter.createCaller(ctx);
};

export default function setUpTestDB() {
  beforeAll(async () => await connectDB());
  afterAll(async () => await dropDB());
  afterEach(async () => await dropCollections());
}
