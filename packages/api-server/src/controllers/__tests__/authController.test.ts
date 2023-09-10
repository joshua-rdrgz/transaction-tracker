import { Request, Response } from 'express';
import { faker } from '@faker-js/faker';
import setUpTestDB, {
  createMockRequest,
  createMockResponse,
  createCaller,
} from '@/setuptestdb';
import User, { UserDoc } from '@/models/userModel';
import { authErrors } from '@/errorMessages';
import { createUser } from '@/utils/testUtils';

describe('auth Routes: /api/v1/trpc/....', () => {
  let req: Request;
  let res: Response;
  let signedInUser: UserDoc;

  setUpTestDB();

  beforeEach(async () => {
    const { token, user: createdUser } = await createUser();
    signedInUser = createdUser;
    req = createMockRequest(token);
    res = createMockResponse();
  });

  describe('Sign Up Route:  MUTATION | trpc.signup()', () => {
    test('it should call the database to create a new user', async () => {
      const caller = createCaller(createMockRequest(), res);

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
      // 1 signedInUser + 1 User Just Created
      expect(await User.countDocuments()).toEqual(2);
    });
  });

  describe('Log In Route: MUTATION | trpc.login()', () => {
    test('it should return a 401 Unauthorized if given invalid credentials', async () => {
      try {
        const caller = createCaller(createMockRequest(), res);

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
  });

  describe('Update Current User Route: MUTATION | trpc.updateCurrentUser()', () => {
    test('should update the user if signed in', async () => {
      const caller = createCaller(req, res);

      const updatedName = faker.person.fullName();
      const {
        data: { user: updatedSignedInUser },
      } = await caller.updateCurrentUser({
        name: updatedName,
      });

      expect(updatedSignedInUser?.name).toEqual(updatedName);
    });
  });
});
