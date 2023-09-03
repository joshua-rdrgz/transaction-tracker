import { z } from 'zod';

export default {
  authRouteSchemas: {
    signup: z
      .object({
        name: z.string().nonempty('Name is required.'),
        email: z
          .string()
          .nonempty('Email is required')
          .email('Email must be valid.'),
        password: z
          .string()
          .nonempty('Password is required')
          .min(8, 'Password must be at least 8 characters.'),
        passwordConfirm: z
          .string()
          .nonempty('Password Confirm is required.')
          .min(8, 'Password must be at least 8 characters.'),
        avatar: z.string().optional(),
        netWorth: z
          .literal('')
          .transform(() => undefined)
          .or(z.coerce.number())
          .optional(),
        accounts: z.array(z.string()).nullish(),
      })
      .refine((schema) => schema.password === schema.passwordConfirm, {
        message: 'Password and Confirm Password must match.',
        path: ['passwordConfirm'],
      })
      .superRefine((schema, ctx) => {
        const accountCheck = schema.accounts && schema.accounts.length !== 0;
        const netWorthCheck = typeof schema.netWorth !== 'number';
        if (netWorthCheck || accountCheck) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message:
              'Either net worth or accounts must be provided.  Please provide one of the two.',
            path: ['netWorth'],
          });
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message:
              'Either net worth or accounts must be provided.  Please provide one of the two.',
            path: ['accounts'],
          });
        }
      }),
    login: z.object({
      email: z.string().nonempty('Email is required.'),
      password: z.string().nonempty('Password is required.'),
    }),
  },
  accountRouteSchemas: {
    createAccount: z.object({
      name: z.string().nonempty('Name is required.'),
      bank: z.string().nonempty('Bank is required.'),
      balance: z.coerce.number({ required_error: 'Balance is required.' }),
    }),
    readAccount: z.string().nonempty('Account ID is required.'),
    updateAccount: z.object({
      accountId: z.string().nonempty('Account ID is required.'),
      data: z.object({
        name: z.string().optional(),
        bank: z.string().optional(),
        balance: z.number().optional(),
      }),
    }),
    deleteAccount: z.string().nonempty('Account ID is required.'),
  },
};
