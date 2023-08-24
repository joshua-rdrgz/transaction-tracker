import mongoose from 'mongoose';
import { Request, Response } from 'express';
import { MongoMemoryServer } from 'mongodb-memory-server';

import { createContext } from '@/config/trpc';
import { appRouter } from '@/routes/appRouter';

let mongo: MongoMemoryServer | null = null;

const connectDB = async () => {
  mongo = await MongoMemoryServer.create();
  const uri = mongo.getUri();

  await mongoose.connect(uri);
  console.log('Test DB connected!');
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

export const createMockRequest = (): Request => {
  return {} as Request;
};

export const createMockResponse = (): Response => {
  return {} as Response;
};

export const createCaller = (req: Request, res: Response) => {
  return appRouter.createCaller(createContext({ req, res }));
};

export default function setUpTestDB() {
  beforeAll(async () => await connectDB());
  afterAll(async () => await dropDB());
  afterEach(async () => await dropCollections());
}
