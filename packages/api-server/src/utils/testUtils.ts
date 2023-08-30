import { faker } from '@faker-js/faker';
import { signToken } from '@/utils/jwt';

import User from '@/models/userModel';

interface CreateUserOptions {
  accountsOrNetWorth: 'accounts' | 'netWorth';
}

const createAccounts = () => {
  const amountOfAccounts = Math.floor(Math.random() * 10) + 1;
  const accounts = [];

  for (let idx = 0; idx < amountOfAccounts; idx++) {
    accounts.push(faker.database.mongodbObjectId());
  }

  return accounts;
};

export const createUser = async (opts: CreateUserOptions) => {
  const { accountsOrNetWorth } = opts;

  const userPassword = faker.internet.password();
  const user = await User.create({
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: userPassword,
    passwordConfirm: userPassword,
    netWorth:
      accountsOrNetWorth === 'netWorth'
        ? Number(faker.finance.amount({ min: 1, dec: 2 }))
        : undefined,
    accounts: accountsOrNetWorth === 'accounts' ? createAccounts() : undefined,
  });

  const token = signToken(user._id.toString());

  return {
    token,
    user,
  };
};
