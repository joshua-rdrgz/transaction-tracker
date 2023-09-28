import { z } from 'zod';

const MAX_FILE_SIZE = 200000;
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];

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
      })
      .refine((schema) => schema.password === schema.passwordConfirm, {
        message: 'Password and Confirm Password must match.',
        path: ['passwordConfirm'],
      }),
    login: z.object({
      email: z.string().optional(),
      password: z.string().optional(),
    }),
    updateCurrentUser: z.object({
      name: z.string().optional(),
      avatar: z
        .any()
        .refine(
          (file) => (file?.[0]?.size ? file[0].size >= MAX_FILE_SIZE : true),
          'Max file size is 2MB.'
        )
        .refine(
          (file) =>
            file?.[0]?.size
              ? ACCEPTED_IMAGE_TYPES.includes(file?.[0]?.type)
              : true,
          'Only .jpg, .jpeg, .png, and .webp files are accepted.'
        )
        .optional(),
    }),
    updateCurUserPassword: z.object({
      curPassword: z.string().nonempty('Current password is required.'),
      newPassword: z
        .string()
        .nonempty('New password is required')
        .min(8, 'Password must be at least 8 characters.'),
      newPasswordConfirm: z
        .string()
        .nonempty('New Password Confirm is required.')
        .min(8, 'Password must be at least 8 characters.'),
    }),
  },
  accountRouteSchemas: {
    createAccount: z.object({
      name: z.string().nonempty('Name is required.'),
      bank: z.string().nonempty('Bank is required.'),
      balance: z.coerce.number(),
    }),
    readAccount: z.string().nonempty('Account ID is required.'),
    updateAccount: z.object({
      accountId: z.string().nonempty('Account ID is required.'),
      data: z.object({
        name: z.string().optional(),
        bank: z.string().optional(),
        balance: z.coerce.number().optional(),
      }),
    }),
    deleteAccount: z.string().nonempty('Account ID is required.'),
  },
};
