"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
exports.default = {
    authRouteSchemas: {
        signup: zod_1.z
            .object({
            name: zod_1.z.string().nonempty('Name is required.'),
            email: zod_1.z
                .string()
                .nonempty('Email is required')
                .email('Email must be valid.'),
            password: zod_1.z
                .string()
                .nonempty('Password is required')
                .min(8, 'Password must be at least 8 characters.'),
            passwordConfirm: zod_1.z
                .string()
                .nonempty('Password Confirm is required.')
                .min(8, 'Password must be at least 8 characters.'),
            avatar: zod_1.z.string().optional(),
        })
            .refine((schema) => schema.password === schema.passwordConfirm, {
            message: 'Password and Confirm Password must match.',
            path: ['passwordConfirm'],
        }),
        login: zod_1.z.object({
            email: zod_1.z.string().optional(),
            password: zod_1.z.string().optional(),
        }),
    },
    accountRouteSchemas: {
        createAccount: zod_1.z.object({
            name: zod_1.z.string().nonempty('Name is required.'),
            bank: zod_1.z.string().nonempty('Bank is required.'),
            balance: zod_1.z.coerce.number({ required_error: 'Balance is required.' }),
        }),
        readAccount: zod_1.z.string().nonempty('Account ID is required.'),
        updateAccount: zod_1.z.object({
            accountId: zod_1.z.string().nonempty('Account ID is required.'),
            data: zod_1.z.object({
                name: zod_1.z.string().optional(),
                bank: zod_1.z.string().optional(),
                balance: zod_1.z.number().optional(),
            }),
        }),
        deleteAccount: zod_1.z.string().nonempty('Account ID is required.'),
    },
};
