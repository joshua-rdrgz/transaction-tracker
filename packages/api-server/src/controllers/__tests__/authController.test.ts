import { Request, Response } from 'express';
import { faker } from '@faker-js/faker';
import setUpTestDB, {
  createMockRequest,
  createMockResponse,
  createCaller,
} from '@/setuptestdb';
import User from '@/models/userModel';
import { authErrors } from '@/errorMessages';

describe('auth Routes: /api/v1/trpc/....', () => {
  let req: Request;
  let res: Response;

  setUpTestDB();

  beforeEach(() => {
    req = createMockRequest();
    res = createMockResponse();
  });

  describe('Sign Up Route:  MUTATION ..../signup', () => {
    test('it should call the database to create a new user', async () => {
      const caller = createCaller(req, res);

      const password = faker.internet.password();
      const response = await caller.signup({
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: password,
        passwordConfirm: password,
      });

      const {
        status,
        data: { user },
      } = response;

      const dbUser = await User.findById(user._id);

      expect(status).toEqual('success');
      expect(user._id.toString()).toEqual(dbUser?._id.toString());
      expect(await User.countDocuments()).toEqual(1);
    });
  });

  describe('Log In Route: MUTATION ..../login', () => {
    test('it should return a 401 Unauthorized if given invalid credentials', async () => {
      try {
        const caller = createCaller(req, res);

        const password = faker.internet.password();
        await caller.signup({
          name: faker.person.fullName(),
          email: faker.internet.email(),
          password: password,
          passwordConfirm: password,
        });

        await caller.login({
          email: faker.internet.email(),
          password: 'wrongpassword',
        });
      } catch (error) {
        expect(error.message).toEqual(authErrors.incorrectUserOrPassword);
        expect(error.code).toEqual('UNAUTHORIZED');
      }
    });

    test('it should return a 400 Bad Request if no credentials are provided.', async () => {
      try {
        const caller = createCaller(req, res);

        const password = faker.internet.password();
        await caller.signup({
          name: faker.person.fullName(),
          email: faker.internet.email(),
          password: password,
          passwordConfirm: password,
        });

        // @ts-ignore
        await caller.login({});
      } catch (error) {
        expect(error.message).toEqual(authErrors.incorrectUserOrPassword);
        expect(error.code).toEqual('UNAUTHORIZED');
      }
    });
  });
});
