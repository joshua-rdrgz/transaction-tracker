import { Request, Response } from 'express';
import { faker } from '@faker-js/faker';
import setUpTestDB, {
  createMockRequest,
  createMockResponse,
  createCaller,
} from '@/setuptestdb';

import { createUser, createAccounts } from '@/utils/testUtils';
import { accountErrors } from '@/errorMessages';
import Account, { IAccount } from '@/models/accountModel';
import { UserDoc } from '@/models/userModel';

const mockedAccountFind = jest.fn().mockReturnValue(createAccounts());

const mockedAccountFindById = jest
  .fn()
  .mockImplementation((accountId: string) => {
    const fakeAccount = {
      _id: accountId,
      user: 'incorrect-user',
      name: faker.finance.accountName(),
      bank: faker.company.name(),
      balance: Number(faker.finance.amount({ min: 1, dec: 2 })),
    };
    return fakeAccount;
  });

const mockedAccountFindByIdAndUpdate = jest
  .fn()
  .mockImplementation((accountId: string, updateData: Omit<IAccount, 'id'>) => {
    const fakeAccount = {
      _id: accountId,
      ...updateData,
    };

    return fakeAccount;
  });

const mockedAccountFindByIdAndDelete = jest.fn().mockReturnValue(null);

describe('account Routes: /api/v1/trpc/accounts/....', () => {
  let req: Request;
  let res: Response;
  let userForPrivateRoutes: UserDoc;

  setUpTestDB();

  beforeEach(async () => {
    const { token, user: createdUser } = await createUser();
    userForPrivateRoutes = createdUser;
    req = createMockRequest(token);
    res = createMockResponse();
  });

  describe('MUTATION (POST): .../createAccounts', () => {
    test('should add a new account associated with the user', async () => {
      const caller = createCaller(req, res);

      const {
        status,
        userId,
        data: { account },
      } = await caller.accounts.createAccount({
        name: faker.finance.accountName(),
        bank: faker.company.name(),
        balance: Number(faker.finance.amount({ min: 1, dec: 2 })),
      });

      const dbAccount = await Account.findById(account._id.toString());

      expect(status).toBe('success');
      expect(userId).toEqual(userForPrivateRoutes._id.toString());
      expect(account._id.toString()).toEqual(dbAccount?._id.toString());
    });
  });

  describe('QUERY: .../readAccounts', () => {
    test('should fetch all accounts associated with the user', async () => {
      const caller = createCaller(req, res);

      // *
      // Mock find, which is used in readAccounts()
      // *
      const originalAccountFind = Account.find;
      Account.find = mockedAccountFind;

      const {
        status,
        data: { accounts },
      } = await caller.accounts.readAccounts();

      // *
      // Restore find to its original
      // *
      Account.find = originalAccountFind;

      expect(status).toBe('success');
      expect(accounts).toBeTruthy();
      expect(accounts.length).toBeGreaterThan(0);
    });

    test('should return an empty array if no associated accounts', async () => {
      const { token: userWithNetWorthToken } = await createUser();
      req.headers = {
        authorization: `Bearer ${userWithNetWorthToken}`,
      };
      const caller = createCaller(req, res);

      const {
        status,
        data: { accounts },
      } = await caller.accounts.readAccounts();

      expect(status).toBe('success');
      expect(accounts).toHaveLength(0);
    });
  });

  describe('QUERY: .../readAccount', () => {
    test('should return the account in question should it exist and belong to the user', async () => {
      const caller = createCaller(req, res);

      const {
        userId,
        data: { account: accountCreated },
      } = await caller.accounts.createAccount({
        name: faker.finance.accountName(),
        bank: faker.company.name(),
        balance: Number(faker.finance.amount({ min: 1, dec: 2 })),
      });

      const {
        status,
        data: { account },
      } = await caller.accounts.readAccount(accountCreated._id.toString());

      expect(status).toEqual('success');
      expect(account._id.toString()).toEqual(accountCreated._id.toString());
      expect(account.user.toString()).toEqual(userId);
      expect(account.name).toBeDefined();
      expect(account.bank).toBeDefined();
      expect(account.balance).toBeDefined();
    });

    test('should return a 400 BAD_REQUEST error if the account does not exist', async () => {
      const caller = createCaller(req, res);
      try {
        await caller.accounts.readAccount(faker.database.mongodbObjectId());
      } catch (error) {
        expect(error.code).toEqual('BAD_REQUEST');
        expect(error.message).toEqual(accountErrors.noAccountFound);
      }
    });

    test('should return a 401 UNAUTHORIZED if the account being requested does not belong to the user', async () => {
      const caller = createCaller(req, res);

      // *
      // Mock findById, which is used in readAccount()
      // *
      const originalAccountFindById = Account.findById;
      Account.findById = mockedAccountFindById;

      try {
        await caller.accounts.readAccount(faker.database.mongodbObjectId());
      } catch (error) {
        // *
        // Restore findById to its original
        // *
        Account.findById = originalAccountFindById;

        expect(error.code).toEqual('UNAUTHORIZED');
        expect(error.message).toEqual(accountErrors.notAllowedAccess);
      }
    });
  });

  describe('MUTATION (UPDATE): .../updateAccount', () => {
    test('should throw error BAD_REQUEST should the account provided not exist.', async () => {
      const caller = createCaller(req, res);
      try {
        await caller.accounts.updateAccount({
          accountId: faker.database.mongodbObjectId(),
          data: {
            name: faker.finance.accountName(),
          },
        });
      } catch (error) {
        expect(error.code).toEqual('BAD_REQUEST');
        expect(error.message).toEqual(accountErrors.noAccountFound);
      }
    });

    test('should throw a 401 UNAUTHORIZED if the account the user is trying to update does not belong to them', async () => {
      const caller = createCaller(req, res);

      const originalAccountFindById = Account.findById;
      const originalFindByIdAndUpdate = Account.findByIdAndUpdate;
      Account.findById = mockedAccountFindById;
      Account.findByIdAndUpdate = mockedAccountFindByIdAndUpdate;

      try {
        await caller.accounts.updateAccount({
          accountId: faker.database.mongodbObjectId(),
          data: {
            name: faker.finance.accountName(),
          },
        });
      } catch (error) {
        Account.findById = originalAccountFindById;
        Account.findByIdAndUpdate = originalFindByIdAndUpdate;

        expect(error.code).toEqual('UNAUTHORIZED');
        expect(error.message).toEqual(accountErrors.notAllowedAccess);
      }
    });

    test('should provide the updated account if the account provided exists and belongs to the user', async () => {
      const caller = createCaller(req, res);

      const {
        data: { account },
      } = await caller.accounts.createAccount({
        name: faker.finance.accountName(),
        bank: faker.company.name(),
        balance: Number(faker.finance.amount({ min: 1, dec: 2 })),
      });

      const newBank = faker.company.name();

      const {
        status,
        data: { account: updatedAccount },
      } = await caller.accounts.updateAccount({
        accountId: account._id.toString(),
        data: {
          bank: newBank,
        },
      });

      expect(status).toEqual('success');
      expect(updatedAccount?.bank).toEqual(newBank);
    });
  });

  describe('MUTATION (DELETE): .../deleteAccount', () => {
    test('should throw a 400 BAD_REQUEST should the account provided not exist', async () => {
      const caller = createCaller(req, res);

      try {
        await caller.accounts.deleteAccount(faker.database.mongodbObjectId());
      } catch (error) {
        expect(error.code).toEqual('BAD_REQUEST');
        expect(error.message).toEqual(accountErrors.noAccountFound);
      }
    });

    test('should throw a 401 UNAUTHORIZED if the account the user is trying to delete does not belong to them', async () => {
      const caller = createCaller(req, res);

      const originalAccountFindById = Account.findById;
      const originalAccountFindByIdAndDelete = Account.findByIdAndDelete;
      Account.findById = mockedAccountFindById;
      Account.findByIdAndDelete = mockedAccountFindByIdAndDelete;

      try {
        await caller.accounts.deleteAccount(faker.database.mongodbObjectId());
      } catch (error) {
        Account.findById = originalAccountFindById;
        Account.findByIdAndUpdate = originalAccountFindByIdAndDelete;
        expect(error.code).toEqual('UNAUTHORIZED');
        expect(error.message).toEqual(accountErrors.notAllowedAccess);
      }
    });

    test('should delete the account if the account exists and belongs to the user', async () => {
      const caller = createCaller(req, res);

      const {
        data: { account: accountCreated },
      } = await caller.accounts.createAccount({
        name: faker.finance.accountName(),
        bank: faker.company.name(),
        balance: Number(faker.finance.amount({ min: 1, dec: 2 })),
      });

      const {
        status,
        data: { account },
      } = await caller.accounts.deleteAccount(accountCreated._id.toString());

      expect(status).toEqual('success');
      expect(account).toBeNull();
    });
  });
});
