import { faker } from '@faker-js/faker';
import setUpTestDB from '@/setuptestdb';
import { userErrors } from '@/errorMessages';

import User from '../userModel';

describe('userModel', () => {
  setUpTestDB();
  describe('user email', () => {
    test('should throw an error if the user email is already in the database', async () => {
      try {
        const password = faker.internet.password();
        await User.create({
          name: faker.person.fullName(),
          email: faker.internet.email(),
          password: password,
          passwordConfirm: password,
          netWorth: Number(faker.finance.amount({ min: 1, dec: 2 })),
        });

        await User.create({
          name: faker.person.fullName(),
          email: faker.internet.email(),
          password: password,
          passwordConfirm: password,
          netWorth: Number(faker.finance.amount({ min: 1, dec: 2 })),
        });
      } catch ({ errors }) {
        expect(errors.email.message).toBe(userErrors.notUniqueEmail);
      }
    });
  });

  describe('user password', () => {
    test('should throw an error if password and passwordConfirm do not match', async () => {
      try {
        await User.create({
          name: faker.person.fullName(),
          email: faker.internet.email(),
          password: faker.internet.password(),
          passwordConfirm: faker.internet.password(),
          netWorth: Number(faker.finance.amount({ min: 1, dec: 2 })),
        });
      } catch ({ errors }) {
        expect(errors.passwordConfirm.message).toBe(
          userErrors.passwordsDoNotMatch
        );
      }
    });
  });

  describe('user netWorth & accounts', () => {
    test('should throw an error if both netWorth and accounts are missing.', async () => {
      try {
        const password = faker.internet.password();
        await User.create({
          name: faker.person.fullName(),
          email: faker.internet.email(),
          password: password,
          passwordConfirm: password,
        });
      } catch (error) {
        expect(error.message).toBe(userErrors.noNetWorthInfo);
      }
    });

    test('should NOT throw an error if netWorth is present', async () => {
      const password = faker.internet.password();
      const user = await User.create({
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: password,
        passwordConfirm: password,
        netWorth: faker.finance.amount({
          min: 1,
          dec: 2,
        }),
      });

      expect(user._id).toBeDefined();
    });

    test('should NOT throw an error if accounts is present', async () => {
      const password = faker.internet.password();
      const user = await User.create({
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: password,
        passwordConfirm: password,
        accounts: [faker.database.mongodbObjectId()],
      });

      expect(user._id).toBeDefined();
    });
  });
});
