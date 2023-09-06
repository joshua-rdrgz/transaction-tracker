import { faker } from '@faker-js/faker';
import { signToken } from '@/utils/jwt';

import User from '@/models/userModel';

export const createAccounts = () => {
  const amountOfAccounts = Math.floor(Math.random() * 10) + 1;
  const accounts = [];

  for (let idx = 0; idx < amountOfAccounts; idx++) {
    accounts.push(faker.database.mongodbObjectId());
  }

  return accounts;
};

export const createUser = async () => {
  const userPassword = faker.internet.password();
  const user = await User.create({
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: userPassword,
    passwordConfirm: userPassword,
  });

  const token = signToken(user._id.toString());

  return {
    token,
    user,
  };
};
