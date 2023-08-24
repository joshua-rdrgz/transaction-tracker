import { Request, Response } from 'express';
import { faker } from '@faker-js/faker';
import setUpTestDB, {
  createMockRequest,
  createMockResponse,
  createCaller,
} from '@/setuptestdb';
import { decodeToken } from '@/utils/jwt';
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
        netWorth: Number(faker.finance.amount({ min: 1, dec: 2 })),
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

    test('it should include a valid JWT token along with the user', async () => {
      const caller = createCaller(req, res);

      const password = faker.internet.password();
      const response = await caller.signup({
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: password,
        passwordConfirm: password,
        netWorth: Number(faker.finance.amount({ min: 1, dec: 2 })),
      });

      const {
        token,
        data: { user },
      } = response;

      const decodedToken = decodeToken(token);
      const dbUser = await User.findById(user._id);

      expect(decodedToken.sub).toEqual(dbUser?._id.toString());
    });
  });

  describe('Log In Route: MUTATION ..../login', () => {
    test('it should successfully return a JWT token if given valid credentials', async () => {
      const caller = createCaller(req, res);

      const email = faker.internet.email();
      const password = faker.internet.password();
      console.log(password);
      await caller.signup({
        name: faker.person.fullName(),
        email: email,
        password: password,
        passwordConfirm: password,
        netWorth: Number(faker.finance.amount({ min: 1, dec: 2 })),
      });

      const response = await caller.login({
        email: email,
        password: password,
      });

      const {
        token,
        data: { user },
      } = response;

      const decodedToken = decodeToken(token);
      const dbUser = await User.findById(user._id);

      expect(decodedToken.sub).toEqual(dbUser?._id.toString());
    });

    test('it should return a 401 Unauthorized if given invalid credentials', async () => {
      try {
        const caller = createCaller(req, res);

        const password = faker.internet.password();
        await caller.signup({
          name: faker.person.fullName(),
          email: faker.internet.email(),
          password: password,
          passwordConfirm: password,
          netWorth: Number(faker.finance.amount({ min: 1, dec: 2 })),
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
          netWorth: Number(faker.finance.amount({ min: 1, dec: 2 })),
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
